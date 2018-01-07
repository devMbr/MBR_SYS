using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MBR.Models;
using System.Linq.Expressions;
using System.Data;

namespace MBR.Web.Services
{
    public class AlertRuleService : BaseService<MBR.Models.AlertRule>
    {
        public AlertRuleService() { }
        public AlertRuleService(MBREntities db) { this.db = db; }
    }
               
}