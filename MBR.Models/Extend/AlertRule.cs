using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace MBR.Models
{

    [MetadataType(typeof(AlertRuleMetadata))]
    public partial class AlertRule
    {
        public string itmeId;
        
    }

    public class AlertRuleMetadata
    {
        
        [Required]
        [Display(Name = "规则名称")]
        public string RuleName { get; set; }
        [Required]
        [Display(Name = "提示信息")]
        public string AltertInfo { get; set; }
        [Required]
        [Display(Name = "持续时间")]
        public Nullable<double> Duration { get; set; }
        [Required]
        [Display(Name = "提前提醒时间")]
        public Nullable<double> AheadOfTime { get; set; }
        [Required]
        [Display(Name = "规则内容")]
        public string Rules { get; set; }

    }
}
