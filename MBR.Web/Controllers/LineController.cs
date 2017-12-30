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
    public class LineController : Controller
    {
        private MBREntities db = new MBREntities();

        //
        // GET: /Line/

        public ActionResult Index()
        {
            return View(db.Line.ToList());
        }

        //
        // GET: /Line/Details/5

        public ActionResult Details(int id = 0)
        {
            Line line = db.Line.Find(id);
            if (line == null)
            {
                return HttpNotFound();
            }
            return View(line);
        }

        //
        // GET: /Line/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Line/Create

        [HttpPost]
        public ActionResult Create(Line line)
        {
            if (ModelState.IsValid)
            {
                db.Line.Add(line);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(line);
        }

        //
        // GET: /Line/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Line line = db.Line.Find(id);
            if (line == null)
            {
                return HttpNotFound();
            }
            return View(line);
        }

        //
        // POST: /Line/Edit/5

        [HttpPost]
        public ActionResult Edit(Line line)
        {
            if (ModelState.IsValid)
            {
                db.Entry(line).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(line);
        }

        //
        // GET: /Line/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Line line = db.Line.Find(id);
            if (line == null)
            {
                return HttpNotFound();
            }
            return View(line);
        }

        //
        // POST: /Line/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Line line = db.Line.Find(id);
            db.Line.Remove(line);
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