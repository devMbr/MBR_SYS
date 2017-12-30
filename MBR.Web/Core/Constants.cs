using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Reflection;
using System.Configuration;

namespace MBR.Web
{
    public class Constants
    {

        #region session相关

        public static string SESSION_USERID = "GV_UserID";
        public static string SESSION_USERNAME = "GV_UserName";
        public static string SESSION_USERROLE = "GV_UserRole";
        public static string SESSION_USERMODULE = "GV_UserModule";
        public static string SESSION_USERMODULE_HTML = "GV_UserModuleHTML";

        #endregion

        #region 配置相关

        public static string PRODUCT_NAME = "product";
        public static string PRODUCT_SHORT_NAME = "product";
        public static string COMPANY_NAME = "company";

        #endregion


    }

}