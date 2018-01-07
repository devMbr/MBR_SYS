//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;

namespace MBR.Models
{
    public partial class CleanRecord
    {
        public int CleanRecordID { get; set; }
        public Nullable<int> MBRID { get; set; }
        public string CleanType { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public string Kinds { get; set; }
        public Nullable<double> Concentration { get; set; }
        public Nullable<double> SoakPeriod { get; set; }
        public Nullable<double> BeforeClean { get; set; }
        public Nullable<double> AfterClean { get; set; }
        public Nullable<double> SingleChlorine { get; set; }
        public Nullable<double> RecoveryRate { get; set; }
        public Nullable<double> AccumulativeChlorine { get; set; }
        public string Remark { get; set; }
        public Nullable<int> CreateBy { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<int> UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual MBRMembrane MBRMembrane { get; set; }
    }
    
}