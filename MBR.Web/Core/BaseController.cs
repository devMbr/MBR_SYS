using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Web.Mvc;
using System.Collections.Specialized;
using System.Web.Routing;

using System.Text.RegularExpressions;
using MBR.Models;

namespace MBR.Web
{
    [LogonActionAttributeFilter]
    public class BaseController : Controller
    {

        /// <summary>
        /// 错误信息
        /// </summary>
        protected ValidationErrors errors = new ValidationErrors();

        /// <summary>
        /// 登陆信息
        /// </summary>
        protected virtual User LogonUser
        {
            get
            {
                //return new User
                //{
                //    UserID = 1,
                //    USERNAME = "admin",
                //    REALNAME = "管理员",
                //    CompanyID = 1,
                //};
                return System.Web.HttpContext.Current.Session[Constants.SESSION_USERID] as User;
            }
            set
            {
                System.Web.HttpContext.Current.Session[Constants.SESSION_USERID] = value;
            }
        }

        protected bool IsLogon()
        {
            return this.LogonUser != null;
        }

        /// <summary>
        /// 分页大小
        /// </summary>
        protected virtual int PageSize
        {
            get
            {
                return 15;
            }
        }
        protected virtual int PageIndex
        {
            get
            {
                int page = 0;
                string fpage = this.Request.Form["page"];
                if (!string.IsNullOrEmpty(fpage))
                {
                    page = Convert.ToInt32(fpage);
                    page = page - 1;
                }
                return page;
            }
        }

        protected ContentResult JsonP(string callback, object data)
        {
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(data);
            return this.Content(string.Format("{0}({1})", callback, json));
        }

        /// <summary>
        /// AOP拦截，在Action执行后
        /// </summary>
        /// <param name="filterContext">filter context</param>
        protected override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
        }

        /// <summary>
        /// 产生一些视图数据
        /// </summary>
        protected virtual void RenderViewData()
        {
        }

        /// <summary>
        /// 发生异常写Log
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnException(ExceptionContext filterContext)
        {
            base.OnException(filterContext);
        }

        protected virtual void LogException(Exception exception, WebExceptionContext exceptionContext = null)
        {

        }


    }

    public class WebExceptionContext
    {
        public string IP { get; set; }
        public string CurrentUrl { get; set; }
        public string RefUrl { get; set; }
        public bool IsAjaxRequest { get; set; }
        public NameValueCollection FormData { get; set; }
        public NameValueCollection QueryData { get; set; }
        public RouteValueDictionary RouteData { get; set; }
    }
}
