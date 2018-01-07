using System;
using System.Linq;
using System.Data.Entity;
using System.Web.Mvc;
using System.Linq.Expressions;
using MBR.Models;
using MBR.Web.Services;
using System.Data;

namespace MBR.Web.Controllers
{
    public class RecordCleanController : Controller
    {
        private MBREntities db = new MBREntities();

        //
        // GET: /RecordClean/

        public ActionResult Index()
        {
            var cleanrecord = db.CleanRecord.Include(c => c.MBRMembrane);
            return View(cleanrecord.ToList());
        }

        [ActionName("OffLine_Index")]
        public ActionResult OffLine_Index()
        {
            return View();
        }

        public JsonResult GetList(GridPager pager, int MBRID = 0)
        {
            Expression<Func<CleanRecord, bool>> predicate = null;
            if (string.IsNullOrEmpty(pager.sort))
            {
                pager.sort = "CreateDate";
            }
            if (MBRID != 0)
            {
                predicate = m => m.MBRID == MBRID;
            }
            using (MBREntities db = new MBREntities())
            {
                RecordCleanService me = new RecordCleanService(db);
                var query = me.GetList(ref pager, predicate);
                var json = new
                {
                    draw = pager.draw,
                    recordsTotal = pager.recordsFiltered,
                    recordsFiltered = pager.recordsTotal,
                    data = query.Select(m => new { m.CleanRecordID,m.CreateDate, m.CleanType, m.Kinds, m.Concentration, m.SoakPeriod,m.BeforeClean,m.AfterClean,m.AccumulativeChlorine,m.RecoveryRate,m.SingleChlorine })
                };
                return Json(json, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMembraneList(GridPager pager, string queryStr)
        {
            queryStr = Request["search[value]"];
            if (string.IsNullOrEmpty(pager.sort))
            {
                pager.sort = "ChangeDate";
            }
            Expression<Func<MBRMembrane, bool>> predicate = null;
            using (MBREntities db = new MBREntities())
            {
                MembraneService me = new MembraneService(db);
                var query = me.GetList(ref pager, predicate);
                var json = new
                {
                    draw = pager.draw,
                    recordsTotal = pager.recordsFiltered,
                    recordsFiltered = pager.recordsTotal,
                    data = query.Select(m => new { m.MBRID, m.Title })
                };
                return Json(json, JsonRequestBehavior.AllowGet);
            }
        }

        //
        // GET: /RecordClean/Details/5

        public ActionResult Details(int id = 0)
        {
            CleanRecord cleanrecord = db.CleanRecord.Find(id);
            if (cleanrecord == null)
            {
                return HttpNotFound();
            }
            return View(cleanrecord);
        }

        //
        // GET: /RecordClean/Create

        public ActionResult Create()
        {
            ViewBag.MBRID = new SelectList(db.MBRMembrane, "MBRID", "Manufacturer");
            return View();
        }

        //
        // POST: /RecordClean/Create

        [HttpPost]
        public ActionResult Create(CleanRecord cleanrecord)
        {
            if (ModelState.IsValid)
            {
                db.CleanRecord.Add(cleanrecord);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.MBRID = new SelectList(db.MBRMembrane, "MBRID", "Manufacturer", cleanrecord.MBRID);
            return View(cleanrecord);
        }

        //
        // GET: /RecordClean/Edit/5

        public ActionResult Edit(int id = 0)
        {
            CleanRecord cleanrecord = db.CleanRecord.Find(id);
            if (cleanrecord == null)
            {
                return HttpNotFound();
            }
            ViewBag.MBRID = new SelectList(db.MBRMembrane, "MBRID", "Manufacturer", cleanrecord.MBRID);
            return View(cleanrecord);
        }

        //
        // POST: /RecordClean/Edit/5

        [HttpPost]
        public ActionResult Edit(CleanRecord cleanrecord)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cleanrecord).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.MBRID = new SelectList(db.MBRMembrane, "MBRID", "Manufacturer", cleanrecord.MBRID);
            return View(cleanrecord);
        }

        //
        // GET: /RecordClean/Delete/5

        public ActionResult Delete(int id = 0)
        {
            CleanRecord cleanrecord = db.CleanRecord.Find(id);
            if (cleanrecord == null)
            {
                return HttpNotFound();
            }
            return View(cleanrecord);
        }

        //
        // POST: /RecordClean/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            CleanRecord cleanrecord = db.CleanRecord.Find(id);
            db.CleanRecord.Remove(cleanrecord);
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