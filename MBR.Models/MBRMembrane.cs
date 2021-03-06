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
    public partial class MBRMembrane
    {
        public MBRMembrane()
        {
            this.ForecastAccumulativeChlorine = new HashSet<ForecastAccumulativeChlorine>();
            this.ForecastPermeableRate = new HashSet<ForecastPermeableRate>();
            this.CleanRecord = new HashSet<CleanRecord>();
        }
    
        public int MBRID { get; set; }
        public Nullable<int> LineID { get; set; }
        public string Manufacturer { get; set; }
        public string SpecificationModel { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> ChangeDate { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public string Remark { get; set; }
        public Nullable<int> CreateBy { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<int> UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual ICollection<ForecastAccumulativeChlorine> ForecastAccumulativeChlorine { get; set; }
        public virtual ICollection<ForecastPermeableRate> ForecastPermeableRate { get; set; }
        public virtual Line Line { get; set; }
        public virtual ICollection<CleanRecord> CleanRecord { get; set; }
    }
    
}
