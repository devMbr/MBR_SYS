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
            return View();
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
                Random rnd = new Random();
                for (int i = 0; i < 15; i++)
                {
                    ForecastPermeableRate t = new ForecastPermeableRate();

                    int number = rnd.Next(i, 80);
                    t.XValue = i + 1;
                    t.YValue = number;
                    list.Add(t);
                }
                dic.Add("after", list);

                //之前
                string before = entity.FormulaBefore;
                List<ForecastPermeableRate> blist = new List<ForecastPermeableRate>();
                for (int i = 0; i < 15; i++)
                {
                    ForecastPermeableRate t = new ForecastPermeableRate();
                    int number = rnd.Next(i, 80);
                    t.XValue = i + 1;
                    t.YValue = number;

                    blist.Add(t);
                }
                dic.Add("befer", blist);

            }
            return Json(dic, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetChlorinValue(int mbrId = 0)
        {
            ForecastAccumulativeChlorine entity = db.ForecastAccumulativeChlorine.Where(m => m.MBRID == mbrId).FirstOrDefault();
            Dictionary<string, List<ForecastAccumulativeChlorine>> dic = new Dictionary<string, List<ForecastAccumulativeChlorine>>();
            List<ForecastAccumulativeChlorine> list = new List<ForecastAccumulativeChlorine>();
            if (entity != null)
            {
                Random rnd = new Random();
                for (int i = 0; i < 15; i++)
                {
                    ForecastAccumulativeChlorine t = new ForecastAccumulativeChlorine();
                    t.XValue = i;
                    int number = rnd.Next(i, 100);
                    t.YValue = number;
                    list.Add(t);
                }

            }
            return Json(list, JsonRequestBehavior.AllowGet);
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