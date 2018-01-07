using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MBR.Models;
using MBR.Web.Models;
using MBR.Web.Services;

namespace MBR.Web.Controllers
{
    public class MembraneAlertController : BaseController
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

        public ActionResult Details()
        {
            MembraneAlert membranealert = db.MembraneAlert.FirstOrDefault();
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

        public ActionResult Edit()
        {
            MembraneAlert membranealert = db.MembraneAlert.FirstOrDefault();
            if (membranealert == null)
            {
                return HttpNotFound();
            }
            return View(membranealert);
        }

        public ActionResult WarnRuleEdit()
        {
            WarnRuleModels warnRuleModels = new WarnRuleModels();
            MembraneAlert membranealert = db.MembraneAlert.FirstOrDefault();
            warnRuleModels.membraneAlert = membranealert;
            
            PermeableRrateAlert permeablerratealert = db.PermeableRrateAlert.FirstOrDefault();
            warnRuleModels.permeableRrateAlert = permeablerratealert;

            List<AlertRule> arList = db.AlertRule.ToList();
            warnRuleModels.alertRuleList = arList;

            return View(warnRuleModels);
        }

        [HttpPost]
        public ActionResult WarnRuleEdit(WarnRuleModels warnRuleModels)
        {
            ModelState.Remove("permeableRrateAlert.PermeableRrateAlertID");
            ModelState.Remove("membraneAlert.MembraneAlertID");
            ModelState.Remove("membraneAlert.MembraneAlertID");
            if (ModelState.IsValid)
            {
                //using (MBREntities db = new MBREntities())
                //{
                //    WarnRuleModelsService wms = new WarnRuleModelsService(db);
                //    if (wms.Edit(ref errors, warnRuleModels))
                //    {
                //        View(warnRuleModels);
                //    }
                //    else
                //    {
                //        string ErrorCol = errors.Error;
                //        View(warnRuleModels);
                //    }
                //}
                /**/
                using (MBREntities db = new MBREntities())
                {

                    MembraneAlert membraneAlert = warnRuleModels.membraneAlert;
                    PermeableRrateAlert permeableRrateAlert = warnRuleModels.permeableRrateAlert;
                
                    if (membraneAlert.MembraneAlertID != 0)
                    {
                        db.Entry(membraneAlert).State = EntityState.Modified;
                    }
                    else
                    {
                        db.MembraneAlert.Add(membraneAlert);
                    }

                    if (permeableRrateAlert.PermeableRrateAlertID != 0)
                    {
                        db.Entry(permeableRrateAlert).State = EntityState.Modified;
                    }
                    else
                    {
                        db.PermeableRrateAlert.Add(permeableRrateAlert);
                    }

                    if (warnRuleModels.alertRuleList != null)
                    {
                        foreach(AlertRule ar in warnRuleModels.alertRuleList)
                        {
                            if (ar.AlertRuleID != 0)
                            {
                                db.Entry(ar).State = EntityState.Modified;
                            }
                            else
                            {
                                db.AlertRule.Add(ar);
                            }
                        }
                    }
                    try
                    {
                        db.SaveChanges();
                    }
                    catch(Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                    
                }
                

                /*
               string itemIds = Request["itemId"];
               if (!string.IsNullOrEmpty(itemIds))
               {
                   string[] idArr = itemIds.Split(',');
                   foreach (string str in idArr)
                   {
                       //WarnRule[1].RuleName
                       String ruleName = Request["WarnRule[" + str + "].RuleName"];
                       String altertInfo = Request["WarnRule[" + str + "].AltertInfo"];
                       String duration = Request["WarnRule[" + str + "].Duration"];
                       String aheadOfTime = Request["WarnRule[" + str + "].AheadOfTime"];
                       String rules = Request["WarnRule[" + str + "].Rules"];

                   }
               }
               */

                //return RedirectToAction("Index");
            }



            return View(warnRuleModels);
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