using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MBR.Models;

namespace MBR.Web.Services
{
    public class RecordCleanService : BaseService<MBR.Models.CleanRecord>
    {
        public RecordCleanService() { }
        public RecordCleanService(MBREntities db) { this.db = db; }

    }
}