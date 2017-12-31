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
    public class ForecastAccumulativeChlorineController : BaseController
    {
        private MBREntities db = new MBREntities();

        //
        // GET: /ForecastAccumulativeChlorine/

        public ActionResult Index()
        {
            var forecastaccumulativechlorine = db.ForecastAccumulativeChlorine.Include(f => f.MBRMembrane);
            return View(forecastaccumulativechlorine.ToList());
        }

        //
        // GET: /ForecastAccumulativeChlorine/Details/5

        public ActionResult Details(int id = 0)
        {
            ForecastAccumulativeChlorine forecastaccumulativechlorine = db.ForecastAccumulativeChlorine.Find(id);
            if (forecastaccumulativechlorine == null)
            {
                return HttpNotFound();
            }
            return View(forecastaccumulativechlorine);
        }

        //
        // GET: /ForecastAccumulativeChlorine/Create

        public ActionResult Create()
        {
            ViewBag.MBRID = new SelectList(db.MBRMembrane, "MBRID", "Manufacturer");
            return View();
        }

        //
        // POST: /ForecastAccumulativeChlorine/Create

        [HttpPost]
        public ActionResult Create(ForecastAccumulativeChlorine forecastaccumulativechlorine)
        {
            if (ModelState.IsValid)
            {
                db.ForecastAccumulativeChlorine.Add(forecastaccumulativechlorine);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.MBRID = new SelectList(db.MBRMembrane, "MBRID", "Manufacturer", forecastaccumulativechlorine.MBRID);
            return View(forecastaccumulativechlorine);
        }

        //
        // GET: /ForecastAccumulativeChlorine/Edit/5

        public ActionResult Edit(int id = 0)
        {
            ForecastAccumulativeChlorine forecastaccumulativechlorine = db.ForecastAccumulativeChlorine.Find(id);
            if (forecastaccumulativechlorine == null)
            {
                return HttpNotFound();
            }
            ViewBag.MBRID = new SelectList(db.MBRMembrane, "MBRID", "Manufacturer", forecastaccumulativechlorine.MBRID);
            return View(forecastaccumulativechlorine);
        }

        //
        // POST: /ForecastAccumulativeChlorine/Edit/5

        [HttpPost]
        public ActionResult Edit(ForecastAccumulativeChlorine forecastaccumulativechlorine)
        {
            if (ModelState.IsValid)
            {
                db.Entry(forecastaccumulativechlorine).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.MBRID = new SelectList(db.MBRMembrane, "MBRID", "Manufacturer", forecastaccumulativechlorine.MBRID);
            return View(forecastaccumulativechlorine);
        }

        //
        // GET: /ForecastAccumulativeChlorine/Delete/5

        public ActionResult Delete(int id = 0)
        {
            ForecastAccumulativeChlorine forecastaccumulativechlorine = db.ForecastAccumulativeChlorine.Find(id);
            if (forecastaccumulativechlorine == null)
            {
                return HttpNotFound();
            }
            return View(forecastaccumulativechlorine);
        }

        //
        // POST: /ForecastAccumulativeChlorine/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            ForecastAccumulativeChlorine forecastaccumulativechlorine = db.ForecastAccumulativeChlorine.Find(id);
            db.ForecastAccumulativeChlorine.Remove(forecastaccumulativechlorine);
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