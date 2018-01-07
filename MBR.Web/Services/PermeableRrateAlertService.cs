using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MBR.Models;
using System.Linq.Expressions;
using System.Data;

namespace MBR.Web.Services
{
    public class PermeableRrateAlertService : BaseService<MBR.Models.PermeableRrateAlert>
    {
        public PermeableRrateAlertService() { }
        public PermeableRrateAlertService(MBREntities db) { this.db = db; }
    }
               
}