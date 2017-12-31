using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MBR.Models;
using System.Linq.Expressions;
using System.Data;

namespace MBR.Web.Services
{
    public class RunRecordService : BaseService<MBR.Models.RunRecord>
    {
        public RunRecordService() {  }
        public RunRecordService(MBREntities db) { this.db = db; }
        
    }
}