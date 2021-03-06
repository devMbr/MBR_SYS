﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MBR.Models;
using System.Linq.Expressions;
using MBR.Web.Services;

namespace MBR.Web.Controllers
{
    public class RunRecordController : BaseController
    {
        //
        // GET: /RunRecord/

        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 曲线
        /// </summary>
        /// <returns></returns>
        public ActionResult Chart()
        {
            return View();
        }

        public JsonResult GetList(GridPager pager, string beginDate = null, string endDate = null)
        {
            Expression<Func<RunRecord, bool>> predicate = null;
            if (!string.IsNullOrEmpty(beginDate) && !string.IsNullOrEmpty(endDate))
            {
                DateTime dBeginDate = Convert.ToDateTime(beginDate);
                DateTime dEndDate = Convert.ToDateTime(endDate);

                predicate = m => m.RunDate >= dBeginDate && m.RunDate <= dEndDate;
            }
            using (MBREntities db = new MBREntities())
            {
                RunRecordService us = new RunRecordService(db);
                var query = us.GetList(ref pager, predicate);
                var json = new
                {
                    draw = pager.draw,
                    recordsTotal = pager.recordsFiltered,
                    recordsFiltered = pager.recordsTotal,
                    data = query.Select(m => new { m.RunDate, m.Column_4, m.Column_5, m.Column_6, m.Column_7, m.Column_8, m.Column_9, m.Column_10, m.Column_11, m.Column_12, m.Column_13, m.Column_14, m.Column_15, m.Column_16, m.Column_17, m.Column_18, m.Column_19, m.Column_20 })
                };
                return Json(json, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllParam()
        {
            using (MBREntities db = new MBREntities())
            {
                var query = db.Param.Where(m => m.IsCurve.HasValue && m.IsCurve.Value).OrderBy(m=>m.OrderBy);
                var json = query.ToList();
                return Json(json, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllDataByParam(DateTime? start)
        {
            DateTime dNow = DateTime.Now;
            
            if (!start.HasValue) 
            {
                //start = dNow.Subtract(new TimeSpan(2,40,0));
                DateTime dStart = dNow;
                DateTime.TryParseExact("2017-12-30", new string[] { "" }, null, System.Globalization.DateTimeStyles.None, out dStart);
                start = dStart;
            }
            using (MBREntities db = new MBREntities())
            {
                var query = db.RunRecord.Where(m => m.RunDate > start.Value).OrderBy(m => m.RunDate);
                var json = query.Select(m => 
                new 
                { 
                    m.LineID,
                    m.RunDate,
                    m.Column_4,
                    m.Column_5,
                    m.Column_6,
                    m.Column_7,
                    m.Column_8,
                    m.Column_9,
                    m.Column_10,
                    m.Column_11,
                    m.Column_12,
                    m.Column_13
    
                }).ToList();
                return Json(json, JsonRequestBehavior.AllowGet);
            }
        }
    }
}