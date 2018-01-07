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
    public class MembraneAlertController : Controller
    {
        private MBREntities db = new MBREntities();

        //
        // GET: /MembraneAlert/

        public ActionResult Index()
        {
            return View(db.MembraneAlert.ToList());
        }

        //
        // GET: /MembraneAlert/Details/5

        public ActionResult Details(int id = 0)
        {
            MembraneAlert membranealert = db.MembraneAlert.Find(id);
            if (membranealert == null)
            {
                return HttpNotFound();
            }
            return View(membranealert);
        }

        //
        // GET: /MembraneAlert/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /MembraneAlert/Create

        [HttpPost]
        public ActionResult Create(MembraneAlert membranealert)
        {
            if (ModelState.IsValid)
            {
                db.MembraneAlert.Add(membranealert);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(membranealert);
        }

        //
        // GET: /MembraneAlert/Edit/5

        public ActionResult Edit(int id = 0)
        {
            MembraneAlert membranealert = db.MembraneAlert.Find(id);
            if (membranealert == null)
            {
                return HttpNotFound();
            }
            return View(membranealert);
        }

        //
        // POST: /MembraneAlert/Edit/5

        [HttpPost]
        public ActionResult Edit(MembraneAlert membranealert)
        {
            if (ModelState.IsValid)
            {
                db.Entry(membranealert).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(membranealert);
        }

        //
        // GET: /MembraneAlert/Delete/5

        public ActionResult Delete(int id = 0)
        {
            MembraneAlert membranealert = db.MembraneAlert.Find(id);
            if (membranealert == null)
            {
                return HttpNotFound();
            }
            return View(membranealert);
        }

        //
        // POST: /MembraneAlert/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            MembraneAlert membranealert = db.MembraneAlert.Find(id);
            db.MembraneAlert.Remove(membranealert);
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