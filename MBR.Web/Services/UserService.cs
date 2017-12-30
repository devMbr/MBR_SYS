using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MBR.Models;

namespace MBR.Web.Services
{
    public class UserService : BaseService
    {
        /// <summary>
        /// 登陆
        /// </summary>
        /// <param name="UserName"></param>
        /// <param name="Password"></param>
        /// <returns></returns>
        internal MBR.Models.User Login(string UserName, string Password)
        {
            using (MBREntities db = new MBREntities())
            {
                //1.调用业务层方法 根据登陆名查询
                var UserList = db.User.Where(u => u.UserName == UserName && u.Enabled.Value).ToList();
                if (UserList.Count() != 1) return null;
                User User = UserList.First();
                //2.判断是否登陆成功
                string MD5pwd = Encrypt.MD5(Password);
                if (string.Equals(User.Password, MD5pwd, StringComparison.OrdinalIgnoreCase))
                    return User;
                return null;
            }
        }

        /// <summary>
        /// 获取所有菜单
        /// </summary>
        /// <returns></returns>
        internal List<MBR.Models.Module> GetAllMenuList()
        {
            using (MBREntities db = new MBREntities())
            {
                var query = db.Module.AsQueryable();
                return query.OrderBy(m => m.OrderBy).ThenBy(m => m.Code).ToList();
            }
        }

        /// <summary>
        /// 通过用户id获取菜单
        /// </summary>
        /// <param name="UserID"></param>
        /// <returns></returns>
        internal List<MBR.Models.Module> GetUserMenuList(int UserID)
        {
            using (MBREntities db = new MBREntities())
            {
                var queryRole = db.Role.AsQueryable();
                var queryModule = db.Module.AsQueryable();
                var queryModulePermission = db.ModulePermission.AsQueryable();

                var query1 = from t1 in queryRole
                             from t2 in t1.User
                             join t3 in queryModulePermission on new { id = t1.RoleID, type = 1 } equals new { id = t3.ObjectID.Value, type = t3.Category.Value }
                             join t4 in queryModule on t3.ModuleID equals t4.ModuleID
                             where t2.UserID == UserID
                             select t4;
                var query2 = from t1 in queryRole
                             from t2 in t1.User
                             join t3 in queryModulePermission on new { id = t2.UserID, type = 2 } equals new { id = t3.ObjectID.Value, type = t3.Category.Value }
                             join t4 in queryModule on t3.ModuleID equals t4.ModuleID
                             where t2.UserID == UserID
                             select t4;

                return query1.Union(query2).OrderBy(m => m.OrderBy).ThenBy(m => m.Code).Distinct().ToList();
            }
        }

        /// <summary>
        /// 获取用户角色列表
        /// </summary>
        /// <param name="UserID"></param>
        /// <returns></returns>
        internal List<MBR.Models.Role> GetUserRoleList(int UserID)
        {
            using (MBREntities db = new MBREntities())
            {
                var queryRole = db.Role.AsQueryable();
                var query = from t1 in queryRole
                            from t2 in t1.User
                            where t2.UserID == UserID
                            select t1;

                return query.ToList();
            }
        }
    }
}