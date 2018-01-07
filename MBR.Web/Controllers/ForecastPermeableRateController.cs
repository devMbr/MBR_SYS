using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MBR.Models;

namespace MBR.Web.Controllers
{
    public class ForecastPermeableRateController : BaseController
    {
        private MBREntities db = new MBREntities();

        //
        // GET: /ForecastPermeableRate/

        public ActionResult Index()
        {
            var forecastpermeablerate = db.ForecastPermeableRate.Include(f => f.MBRMembrane);
            return View(forecastpermeablerate.ToList());
        }


        public ActionResult AutoForecast()
        {
            MembraneAlert ma =  db.MembraneAlert.First();
            double maxChlorine =(double) ma.AccumulativeChlorine;
            ForecastPermeableRate t = new ForecastPermeableRate();
            t.YValue = maxChlorine;
            return View(t);
        }
        public JsonResult GetMBRInfo()
        {
            var list = db.MBRMembrane.Select(m => new
            {
                MBRID=m.MBRID,
                Title=m.Title
            }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPermeable(int mbrId = 0)
        {

            ForecastPermeableRate entity = db.ForecastPermeableRate.Where(m => m.MBRID == mbrId).FirstOrDefault();
            Dictionary<string, List<ForecastPermeableRate>> dic = new Dictionary<string, List<ForecastPermeableRate>>();
            if (entity != null)
            {
                List<ForecastPermeableRate> list = new List<ForecastPermeableRate>();
                //之后
                string after = entity.FormulaAfter;
                //常数 | 一次方 | 二次方 | 三次方
                double constant = 0;
                double primarySide = 0;
                double twoSquare = 0;
                double threeSquare = 0;
                if (after.IndexOf("|") > -1)
                {
                    string[] arr = after.Split('|');
                    constant = double.Parse(arr[0]);
                    primarySide = double.Parse(arr[1]);
                    twoSquare = double.Parse(arr[2]);
                    threeSquare = double.Parse(arr[3]);
                }
                //之前
                string before = entity.FormulaBefore;

                double b_constant = 0;
                double b_primarySide = 0;
                double b_twoSquare = 0;
                double b_threeSquare = 0;
                if (before.IndexOf("|") > -1)
                {
                    string[] arr = before.Split('|');
                    b_constant = double.Parse(arr[0]);
                    b_primarySide = double.Parse(arr[1]);
                    b_twoSquare = double.Parse(arr[2]);
                    b_threeSquare = double.Parse(arr[3]);
                }

                //fx =ax3+bx2+cx+d;
                //查询清洗记录
                List<CleanRecord> crList = db.CleanRecord.Where(m => m.MBRID == mbrId).OrderBy(m => m.CreateDate).ToList();

                List<ForecastPermeableRate> blist = new List<ForecastPermeableRate>();
                for (int i = 1; i < crList.Count+100; i++)
                {
                    ForecastPermeableRate t = new ForecastPermeableRate();
                    //清洗之后的透水率预测 TODO 算法
                    double number = i * i;//(double)(100 - i)/1.5;//threeSquare + Math.Pow(i, 3) / twoSquare+ Math.Pow(i, 2) + primarySide*i + constant;
                    t.XValue = i;
                    t.YValue = number;
                    list.Add(t);
                    

                    //清洗之前的透水率预测
                    ForecastPermeableRate tb = new ForecastPermeableRate();
                    double number_tb = (double)i*1.5;//b_threeSquare + Math.Pow(i, 3) / (b_twoSquare + Math.Pow(i, 2)) + b_primarySide * i + b_constant;
                    tb.XValue = i;
                    tb.YValue = number_tb;
                    blist.Add(tb);
                    if (number_tb> number)
                    {
                        //清洗之后的值如果小于清洗之前的，吧清洗之前的值赋给之后的，并是最后次
                        t.YValue = number_tb;
                        //break;
                    }
                    
                }
                dic.Add("after", list);
                dic.Add("befer", blist);

                
                //之后的透水率点
                List<ForecastPermeableRate> sac_alist = new List<ForecastPermeableRate>();

                //之前的透水率点
                List<ForecastPermeableRate> sac_bList = new List<ForecastPermeableRate>();
                for (int i = 0; i < crList.Count; i++)
                {
                    CleanRecord rc = crList[i];
                    ForecastPermeableRate befer_t = new ForecastPermeableRate();
                    //清洗前透水率
                    double number = (double)rc.BeforeClean;
                    befer_t.XValue = i;
                    befer_t.YValue = number;

                    sac_bList.Add(befer_t);

                    ForecastPermeableRate after_t = new ForecastPermeableRate();

                    double a_number = (double)rc.AfterClean;
                    after_t.XValue = i;
                    after_t.YValue = a_number;
                    sac_alist.Add(after_t);
                }
                //之前
                dic.Add("beferSca", sac_bList);
                //之后
                dic.Add("afterSca", sac_alist);
                

            }
            return Json(dic, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetChlorinValue(int mbrId = 0)
        {
            ForecastAccumulativeChlorine entity = db.ForecastAccumulativeChlorine.Where(m => m.MBRID == mbrId).FirstOrDefault();
            Dictionary<string, Object> dic = new Dictionary<string, Object>();
            List<ForecastAccumulativeChlorine> list = new List<ForecastAccumulativeChlorine>();
            if (entity != null)
            {
                //累积氯的设置最大值
                MembraneAlert ma = db.MembraneAlert.First();
                double maxChlorine = (double)ma.AccumulativeChlorine;

                string formula = entity.Formula;

                double constant = 0;
                double primarySide = 0;
                double twoSquare = 0;
                double threeSquare = 0;
                if (formula.IndexOf("|") > -1)
                {
                    string[] arr = formula.Split('|');
                    constant = double.Parse(arr[0]);
                    primarySide = double.Parse(arr[1]);
                    twoSquare = double.Parse(arr[2]);
                    threeSquare = double.Parse(arr[3]);
                }
                //预测 积累氯
                for (int i = 1; i < 15; i++)
                {
                    ForecastAccumulativeChlorine t = new ForecastAccumulativeChlorine();
                    double number = i * 1.5;// primarySide * i + constant;// threeSquare + Math.Pow(i, 3) / (twoSquare + Math.Pow(i, 2)) + primarySide * i + constant;
                    
                    t.XValue = i;
                    
                    t.YValue = number;
                    list.Add(t);
                    if (number >= maxChlorine)
                    {
                        t.YValue = maxChlorine;
                        break;
                    }

                }
                dic.Add("lineList",list);
                //之前的累积氯值
                List<ForecastAccumulativeChlorine> sacList = new List<ForecastAccumulativeChlorine>();

                //查询清洗记录
                List<CleanRecord> crList = db.CleanRecord.Where(m => m.MBRID == mbrId).OrderBy(m => m.CreateDate).ToList();
                
                for (int i = 0; i < crList.Count; i++)
                {
                    CleanRecord rc = crList[i];
                    ForecastAccumulativeChlorine t = new ForecastAccumulativeChlorine();

                    double number =(double) rc.AccumulativeChlorine;
                    t.XValue = i+1;
                    t.YValue = number;
                    sacList.Add(t);
                }
                dic.Add("scaList", sacList);

                dic.Add("plotLineValue", 40);

            }
            return Json(dic, JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /ForecastPermeableRate/Details/5

        public ActionResult Details(int id = 0)
        {
            ForecastPermeableRate forecastpermeablerate = db.ForecastPermeableRate.Find(id);
            if (forecastpermeablerate == null)
            {
                return HttpNotFound();
            }
            return View(forecastpermeablerate);
        }

        //
        // GET: /ForecastPermeableRate/Create

        public ActionResult Create()
        {
            ViewBag.MBRID = new SelectList(db.MBRMembrane, "MBRID", "Manufacturer");
            return View();
        }

        //
        // POST: /ForecastPermeableRate/Create

        [HttpPost]
        public ActionResult Create(ForecastPermeableRate forecastpermeablerate)
        {
            if (ModelState.IsValid)
            {
                db.ForecastPermeableRate.Add(forecastpermeablerate);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.MBRID = new SelectList(db.MBRMembrane, "MBRID", "Manufacturer", forecastpermeablerate.MBRID);
            return View(forecastpermeablerate);
        }

        //
        // GET: /ForecastPermeableRate/Edit/5

        public ActionResult Edit(int id = 0)
        {
            ForecastPermeableRate forecastpermeablerate = db.ForecastPermeableRate.Find(id);
            if (forecastpermeablerate == null)
            {
                return HttpNotFound();
            }
            ViewBag.MBRID = new SelectList(db.MBRMembrane, "MBRID", "Manufacturer", forecastpermeablerate.MBRID);
            return View(forecastpermeablerate);
        }

        //
        // POST: /ForecastPermeableRate/Edit/5

        [HttpPost]
        public ActionResult Edit(ForecastPermeableRate forecastpermeablerate)
        {
            if (ModelState.IsValid)
            {
                db.Entry(forecastpermeablerate).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.MBRID = new SelectList(db.MBRMembrane, "MBRID", "Manufacturer", forecastpermeablerate.MBRID);
            return View(forecastpermeablerate);
        }

        //
        // GET: /ForecastPermeableRate/Delete/5

        public ActionResult Delete(int id = 0)
        {
            ForecastPermeableRate forecastpermeablerate = db.ForecastPermeableRate.Find(id);
            if (forecastpermeablerate == null)
            {
                return HttpNotFound();
            }
            return View(forecastpermeablerate);
        }

        //
        // POST: /ForecastPermeableRate/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            ForecastPermeableRate forecastpermeablerate = db.ForecastPermeableRate.Find(id);
            db.ForecastPermeableRate.Remove(forecastpermeablerate);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}