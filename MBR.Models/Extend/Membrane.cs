using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace MBR.Models
{

    [MetadataType(typeof(MembraneMetadata))]
    public partial class MBRMembrane
    {

    }

    public class MembraneMetadata
    {
        [Required]
        [Display(Name = "厂商")]
        public string Manufacturer { get; set; }

        [Required]
        [Display(Name = "更换时间")]
        public string ChangeDate { get; set; }

        [Required]
        [Display(Name = "规格型号")]
        public string SpecificationModel { get; set; }

        [Required]
        [Display(Name = "标题简称")]
        public string Title { get; set; }

    }
}
