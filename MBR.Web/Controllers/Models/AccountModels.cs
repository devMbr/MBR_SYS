using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
using System.Web.Mvc;
using System.Web.Security;

namespace MBR.Web.Models
{

    public class LogonModel
    {
        [Required]
        [Display(Name = "用户名")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "密码")]
        public string Password { get; set; }
         
        [Display(Name = "验证码")]
        [MaxLength(4)]
        public string ValidateCode { get; set; }

        [Display(Name = "记住我?")]
        public bool RememberMe { get; set; }
        
    } 

}
