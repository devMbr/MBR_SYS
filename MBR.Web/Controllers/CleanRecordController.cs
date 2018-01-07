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
    public class CleanRecordController : BaseController
    {
        private MBREntities db = new MBREntities();

        //
        // GET: /CleanRecord/

        public ActionResult Index()
        {
            var cleanrecord = db.CleanRecord.Include(c => c.MBRMembrane);
            return View(cleanrecord.ToList());
        }

        //
        // GET: /CleanRecord/Details/5

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
        // GET: /CleanRecord/Create

        public ActionResult Create()
        {
            ViewBag.MBRID = new SelectList(db.MBRMembrane, "MBRID", "Manufacturer");
            return View();
        }

        //
        // POST: /CleanRecord/Create

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
        // GET: /CleanRecord/Edit/5

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
        // POST: /CleanRecord/Edit/5

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
        // GET: /CleanRecord/Delete/5

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
        // POST: /CleanRecord/Delete/5

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