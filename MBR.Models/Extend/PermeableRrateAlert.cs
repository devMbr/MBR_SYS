using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace MBR.Models
{

    [MetadataType(typeof(PermeableRrateAlertMetadata))]
    public partial class PermeableRrateAlert
    {

        
    }

    public class PermeableRrateAlertMetadata
    {
        [Required]
        [Display(Name = "在线清洗最小透水率")]
        public string OnlineMin { get; set; }

        [Required]
        [Display(Name = "在线清洗最大透水率")]
        public string OnlineMax { get; set; }

        [Required]
        [Display(Name = "离线清洗最小透水率")]
        [DataType(DataType.Password)]
        public string OfflineMin { get; set; }

        [Required]
        [Display(Name = "离线清洗最大透水率")]
        public string OfflineMax { get; set; }

        [Required]
        [Display(Name = "更换膜最小透水率")]
        public string ChangeMin { get; set; }

        [Required]
        [Display(Name = "更换膜最大透水率")]
        public string ChangeMax { get; set; }

        [Required]
        [Display(Name = "最长预警时间")]
        public string DurationMax { get; set; }

    }
}
