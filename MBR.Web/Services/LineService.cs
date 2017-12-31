using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MBR.Models;

namespace MBR.Web.Services
{
    public class LineService : BaseService<MBR.Models.Line>
    {
        public LineService() { }
        public LineService(MBREntities db) { this.db = db; }

    }
}