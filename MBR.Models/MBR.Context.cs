﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace MBR.Models
{
    public partial class MBREntities : DbContext
    {
        public MBREntities()
            : base("name=MBREntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<Module> Module { get; set; }
        public DbSet<ModulePermission> ModulePermission { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<SysException> SysException { get; set; }
        public DbSet<SysLog> SysLog { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Test> Test { get; set; }
        public DbSet<Line> Line { get; set; }
        public DbSet<MBRMembrane> MBRMembrane { get; set; }
    }
}
