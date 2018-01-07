using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
using System.Web.Mvc;
using System.Web.Security;
using MBR.Models;

namespace MBR.Web.Models
{
    public class WarnRuleModels {


        
        //透水率
        public PermeableRrateAlert permeableRrateAlert { get; set; }

        //累积氯
        public MembraneAlert membraneAlert { get; set; }

        //规则
        public List<AlertRule> alertRuleList { get; set; }

        public AlertRule alertRule { get; set; }

    }
}
