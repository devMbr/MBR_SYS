using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MBR.Models;
using System.Linq.Expressions;
using System.Data;

namespace MBR.Web.Services
{
    public class MembraneAlertService : BaseService<MBR.Models.MembraneAlert>
    {
        public MembraneAlertService() { }
        public MembraneAlertService(MBREntities db) { this.db = db; }


       
    }

}