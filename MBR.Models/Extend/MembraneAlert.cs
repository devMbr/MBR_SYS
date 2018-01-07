using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace MBR.Models
{

    [MetadataType(typeof(MembraneAlertMetadata))]
    public partial class MembraneAlert
    {

        
    }

    public class MembraneAlertMetadata
    {
        [Required]
        [Display(Name = "最小透水率恢复率")]
        public string PermeableRateMin { get; set; }

        [Required]
        [Display(Name = "最长预警时间")]
        public string DurationMax { get; set; }

        [Required]
        [Display(Name = "累计氯限值")]
        public string AccumulativeChlorine { get; set; }

       
    }
}
