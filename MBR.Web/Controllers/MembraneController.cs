using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Web;
using System.Web.Mvc;
using System.Linq.Expressions;
using MBR.Models;
using MBR.Web.Services;
using MBR.Web.Models;
using System.Data;

namespace MBR.Web.Controllers
{
    public class MembraneController : BaseController
    {
        private MBREntities db = new MBREntities();

        public JsonResult GetList(GridPager pager, string queryStr)
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
                    data = query.Select(m => new { m.MBRID, m.ChangeDate, m.Manufacturer, m.SpecificationModel, m.Title })
                };
                return Json(json, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetLineList(GridPager pager, string queryStr)
        {
            queryStr = Request["search[value]"];
            if (string.IsNullOrEmpty(pager.sort))
            {
                pager.sort = "OrderBy";
            }
            Expression<Func<Line, bool>> predicate = null;
            using (MBREntities db = new MBREntities())
            {
                LineService me = new LineService(db);
                var query = me.GetList(ref pager, predicate);
                var json = new
                {
                    draw = pager.draw,
                    recordsTotal = pager.recordsFiltered,
                    recordsFiltered = pager.recordsTotal,
                    data = query.Select(m => new { m.LineID, m.LineName })
                };
                return Json(json, JsonRequestBehavior.AllowGet);
            }
        }

        //
        // GET: /Membrane/

        public ActionResult Index()
        {
            var mbrmembrane = db.MBRMembrane.Include(m => m.Line);
            return View(mbrmembrane.ToList());
        }

        //
        // GET: /Membrane/Details/5

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
        // GET: /Membrane/Create

        public ActionResult Create()
        {
            ViewBag.LineID = new SelectList(db.Line, "LineID", "LineName");
            return View();
        }

        //
        // POST: /Membrane/Create

        [HttpPost]
        public JsonResult Create(MBRMembrane model)
        {
            using (MBREntities db = new MBREntities())
            {
                MembraneService me = new MembraneService(db);

                if (me.Create(ref errors, model))
                {
                    return Json(JsonHandler.CreateMessage(1, Resource.InsertSucceed), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    string ErrorCol = errors.Error;
                    return Json(JsonHandler.CreateMessage(0, Resource.InsertFail + ErrorCol), JsonRequestBehavior.AllowGet);
                }
            }
        }

        //
        // GET: /Membrane/Edit/5

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
        // POST: /Membrane/Edit/5

        [HttpPost]
        public JsonResult Edit(MBRMembrane model)
        {
            if (model != null && ModelState.IsValid)
            {
                using (MBREntities db = new MBREntities())
                {
                    MembraneService me = new MembraneService();

                    if (me.Edit(ref errors, model))
                    {
                        return Json(JsonHandler.CreateMessage(1, Resource.EditSucceed));
                    }
                    else
                    {
                        string ErrorCol = errors.Error;
                        return Json(JsonHandler.CreateMessage(0, Resource.EditFail + ErrorCol));
                    }
                }
            }
            else
            {
                string ErrorCol = errors.Error;
                return Json(JsonHandler.CreateMessage(0, Resource.EditFail + ErrorCol));
            }

        }

        //
        // GET: /Membrane/Delete/5

        public ActionResult Delete(int id = 0)
        {
            MBRMembrane test = db.MBRMembrane.Find(id);
            if (test == null)
            {
                return HttpNotFound();
            }
            return View(test);
        }

        //
        // POST: /Membrane/Delete/5

        [HttpPost, ActionName("Delete")]
        public JsonResult DeleteConfirmed(int id)
        {
            using (MBREntities db = new MBREntities())
            {
                MembraneService me = new MembraneService(db);
                if (me.Delete(ref errors, id))
                {
                    return Json(JsonHandler.CreateMessage(1, Resource.DeleteSucceed));
                }
                else
                {
                    string ErrorCol = errors.Error;
                    return Json(JsonHandler.CreateMessage(0, Resource.DeleteFail + ErrorCol));
                }
            }
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}