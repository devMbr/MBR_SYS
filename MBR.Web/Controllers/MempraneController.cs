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
    public class MempraneController : Controller
    {
        private MBREntities db = new MBREntities();

        //
        // GET: /Memprane/

        public ActionResult Index()
        {
            var mbrmembrane = db.MBRMembrane.Include(m => m.Line);
            return View(mbrmembrane.ToList());
        }

        //
        // GET: /Memprane/Details/5

        public ActionResult Details(int id = 0)
        {
            MBRMembrane mbrmembrane = db.MBRMembrane.Find(id);
            if (mbrmembrane == null)
            {
                return HttpNotFound();
            }
            return View(mbrmembrane);
        }

        //
        // GET: /Memprane/Create

        public ActionResult Create()
        {
            ViewBag.LineID = new SelectList(db.Line, "LineID", "LineName");
            return View();
        }

        //
        // POST: /Memprane/Create

        [HttpPost]
        public ActionResult Create(MBRMembrane mbrmembrane)
        {
            if (ModelState.IsValid)
            {
                db.MBRMembrane.Add(mbrmembrane);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.LineID = new SelectList(db.Line, "LineID", "LineName", mbrmembrane.LineID);
            return View(mbrmembrane);
        }

        //
        // GET: /Memprane/Edit/5

        public ActionResult Edit(int id = 0)
        {
            MBRMembrane mbrmembrane = db.MBRMembrane.Find(id);
            if (mbrmembrane == null)
            {
                return HttpNotFound();
            }
            ViewBag.LineID = new SelectList(db.Line, "LineID", "LineName", mbrmembrane.LineID);
            return View(mbrmembrane);
        }

        //
        // POST: /Memprane/Edit/5

        [HttpPost]
        public ActionResult Edit(MBRMembrane mbrmembrane)
        {
            if (ModelState.IsValid)
            {
                db.Entry(mbrmembrane).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.LineID = new SelectList(db.Line, "LineID", "LineName", mbrmembrane.LineID);
            return View(mbrmembrane);
        }

        //
        // GET: /Memprane/Delete/5

        public ActionResult Delete(int id = 0)
        {
            MBRMembrane mbrmembrane = db.MBRMembrane.Find(id);
            if (mbrmembrane == null)
            {
                return HttpNotFound();
            }
            return View(mbrmembrane);
        }

        //
        // POST: /Memprane/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            MBRMembrane mbrmembrane = db.MBRMembrane.Find(id);
            db.MBRMembrane.Remove(mbrmembrane);
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