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
    public class TestController : BaseController
    {
        private MBREntities db = new MBREntities();

        //
        // GET: /Test/

        public ActionResult Index()
        {
            return View(db.Test.ToList());
        }

        public JsonResult GetPermeable()
        {
            List<Test> list = db.Test.ToList();
            list.Clear();
            Dictionary<string,List<Test>> dic = new Dictionary<string, List<Test>>();
            if (list == null ||list.Count==0)
            {
                Random rnd = new Random();
                for (int i = 0; i < 15; i++)
                {
                    Test t = new Test();
                    t.Age = i+1;
                    
                    int number = rnd.Next(i, 80);
                    t.ID = number;
                    list.Add(t);
                }
                dic.Add("after",list);

                //之前
                List<Test> blist = new List<Test>();
                for (int i = 0; i < 15; i++)
                {
                    Test t = new Test();
                    t.Age = i + 1;

                    int number = rnd.Next(i, 80);
                    t.ID = number;
                    blist.Add(t);
                }
                dic.Add("befer", blist);

            }
            return Json(dic, JsonRequestBehavior.AllowGet); 
        }

        public JsonResult GetChlorinValue()
        {
            List<Test> list = db.Test.ToList();

            list.Clear();
            if (list == null || list.Count == 0)
            {
                Random rnd = new Random();
                for (int i = 0; i < 15; i++)
                {
                    Test t = new Test();
                    t.Age = i;
                    
                    int number = rnd.Next(i, 100);
                    t.ID = number;
                    list.Add(t);
                }

            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /Test/Details/5

        public ActionResult Details(int id = 0)
        {
            Test test = db.Test.Find(id);
            if (test == null)
            {
                return HttpNotFound();
            }
            return View(test);
        }

        //
        // GET: /Test/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Test/Create

        [HttpPost]
        public ActionResult Create(Test test)
        {
            if (ModelState.IsValid)
            {
                db.Test.Add(test);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(test);
        }

        //
        // GET: /Test/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Test test = db.Test.Find(id);
            if (test == null)
            {
                return HttpNotFound();
            }
            return View(test);
        }

        //
        // POST: /Test/Edit/5

        [HttpPost]
        public ActionResult Edit(Test test)
        {
            if (ModelState.IsValid)
            {
                db.Entry(test).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(test);
        }

        //
        // GET: /Test/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Test test = db.Test.Find(id);
            if (test == null)
            {
                return HttpNotFound();
            }
            return View(test);
        }

        //
        // POST: /Test/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Test test = db.Test.Find(id);
            db.Test.Remove(test);
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