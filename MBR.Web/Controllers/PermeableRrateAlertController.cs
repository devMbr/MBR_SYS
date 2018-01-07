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
    public class PermeableRrateAlertController : Controller
    {
        private MBREntities db = new MBREntities();

        //
        // GET: /PermeableRrateAlert/

        public ActionResult Index()
        {
            return View(db.PermeableRrateAlert.ToList());
        }

        //
        // GET: /PermeableRrateAlert/Details/5

        public ActionResult Details(int id = 0)
        {
            PermeableRrateAlert permeablerratealert = db.PermeableRrateAlert.Find(id);
            if (permeablerratealert == null)
            {
                return HttpNotFound();
            }
            return View(permeablerratealert);
        }

        //
        // GET: /PermeableRrateAlert/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /PermeableRrateAlert/Create

        [HttpPost]
        public ActionResult Create(PermeableRrateAlert permeablerratealert)
        {
            if (ModelState.IsValid)
            {
                db.PermeableRrateAlert.Add(permeablerratealert);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(permeablerratealert);
        }

        //
        // GET: /PermeableRrateAlert/Edit/5

        public ActionResult Edit(int id = 0)
        {
            PermeableRrateAlert permeablerratealert = db.PermeableRrateAlert.Find(id);
            if (permeablerratealert == null)
            {
                return HttpNotFound();
            }
            return View(permeablerratealert);
        }

        //
        // POST: /PermeableRrateAlert/Edit/5

        [HttpPost]
        public ActionResult Edit(PermeableRrateAlert permeablerratealert)
        {
            if (ModelState.IsValid)
            {
                db.Entry(permeablerratealert).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(permeablerratealert);
        }

        //
        // GET: /PermeableRrateAlert/Delete/5

        public ActionResult Delete(int id = 0)
        {
            PermeableRrateAlert permeablerratealert = db.PermeableRrateAlert.Find(id);
            if (permeablerratealert == null)
            {
                return HttpNotFound();
            }
            return View(permeablerratealert);
        }

        //
        // POST: /PermeableRrateAlert/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            PermeableRrateAlert permeablerratealert = db.PermeableRrateAlert.Find(id);
            db.PermeableRrateAlert.Remove(permeablerratealert);
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