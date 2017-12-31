using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MBR.Models;

namespace MBR.Web.Services
{
    public class MembraneService : BaseService<MBR.Models.MBRMembrane>
    {
        public MembraneService() { }
        public MembraneService(MBREntities db) { this.db = db; }

    }
}