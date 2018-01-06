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
            ForecastPermeableRate t = new ForecastPermeableRate();
            t.YValue =40;
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
                //fx =ax3+bx2+cx+d;

                for (int i = 1; i < 15; i++)
                {
                    ForecastPermeableRate t = new ForecastPermeableRate();

                    double number = threeSquare + Math.Pow(i, 3) / twoSquare+ Math.Pow(i, 2) + primarySide*i + constant;
                    t.XValue = i;
                    t.YValue = number;
                    list.Add(t);
                }
                dic.Add("after", list);

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

                List<ForecastPermeableRate> blist = new List<ForecastPermeableRate>();
                for (int i = 1; i <15; i++)
                {
                    ForecastPermeableRate t = new ForecastPermeableRate();
                    double number = b_threeSquare + Math.Pow(i,3) / (b_twoSquare + Math.Pow(i, 2)) + b_primarySide * i + b_constant;
                    t.XValue =  i;
                    t.YValue = number;

                    blist.Add(t);
                }
                dic.Add("befer", blist);

                //之后的透水率点
                List<ForecastPermeableRate> saclist = new List<ForecastPermeableRate>();
                Random r = new Random();
                for (int i = 1; i < 15; i++)
                {
                    ForecastPermeableRate t = new ForecastPermeableRate();

                    double number = r.Next(i, 80);
                    t.XValue = i;
                    t.YValue = number;
                    saclist.Add(t);
                }
                dic.Add("afterSca", saclist);

                //之前的透水率点
                List<ForecastPermeableRate> sacbList = new List<ForecastPermeableRate>();
                for (int i = 1; i < 15; i++)
                {
                    ForecastPermeableRate t = new ForecastPermeableRate();

                    double number = r.Next(i, 80);
                    t.XValue = i;
                    t.YValue = number;
                    sacbList.Add(t);
                }
                dic.Add("beferSca", sacbList);

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

                for (int i = 1; i < 15; i++)
                {
                    ForecastAccumulativeChlorine t = new ForecastAccumulativeChlorine();
                    double number = primarySide * i + constant;// threeSquare + Math.Pow(i, 3) / (twoSquare + Math.Pow(i, 2)) + primarySide * i + constant;
                    t.XValue = i;
                    t.YValue = number;
                    list.Add(t);
                }
                dic.Add("lineList",list);
                //之前的透水率点
                List<ForecastAccumulativeChlorine> sacList = new List<ForecastAccumulativeChlorine>();
                Random r = new Random();
                for (int i = 1; i < 15; i++)
                {
                    ForecastAccumulativeChlorine t = new ForecastAccumulativeChlorine();

                    double number = r.Next(i, 80);
                    t.XValue = i;
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