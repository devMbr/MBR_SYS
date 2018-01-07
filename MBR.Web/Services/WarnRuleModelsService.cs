using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MBR.Models;
using System.Linq.Expressions;
using System.Data;
using MBR.Web.Models;
using System.Transactions;

namespace MBR.Web.Services
{
    public class WarnRuleModelsService : BaseService<MBR.Web.Models.WarnRuleModels>
    {
        public WarnRuleModelsService() { }
        public WarnRuleModelsService(MBREntities db) { this.db = db; }

        public override bool Edit(ref ValidationErrors errors, WarnRuleModels warnRuleModels)
        {
            try
            {

                using (MBREntities db = new MBREntities())
                {
                    using (TransactionScope transaction = new TransactionScope())
                    {
                        MembraneAlertService mas = new MembraneAlertService(db);
                        PermeableRrateAlertService pras = new PermeableRrateAlertService(db);
                        AlertRuleService ars = new AlertRuleService(db);

                        MembraneAlert membraneAlert = warnRuleModels.membraneAlert;
                        PermeableRrateAlert permeableRrateAlert = warnRuleModels.permeableRrateAlert;
                        bool flag = true;
                        if (membraneAlert.MembraneAlertID != 0)
                        {
                            flag = mas.Edit(membraneAlert);
                        }
                        else
                        {
                            flag = mas.Create(membraneAlert);
                        }

                        bool praFlag = true;
                        if (permeableRrateAlert.PermeableRrateAlertID != 0)
                        {
                            praFlag = pras.Edit(permeableRrateAlert);
                        }
                        else
                        {
                            praFlag = pras.Create(permeableRrateAlert);
                        }

                        bool arFlag = true;
                        int num = 0;
                        if (warnRuleModels.alertRuleList != null)
                        {
                            foreach (AlertRule ar in warnRuleModels.alertRuleList)
                            {
                                bool nf = true;
                                if (ar.AlertRuleID != 0)
                                {
                                    nf = ars.Edit(ar);
                                }
                                else
                                {
                                    nf = ars.Create(ar);
                                }
                                if (nf)
                                {
                                    num++;
                                }
                            }
                            if (num == warnRuleModels.alertRuleList.Count)
                            {
                                arFlag = false;
                            }
                        }


                        if (flag && praFlag && arFlag)
                        {
                            transaction.Complete();
                            return true;
                        }
                        else
                        {
                            errors.Add("编辑失败");
                            return false;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                errors.Add(ex.Message);
                ExceptionHander.WriteException(ex);
                return false;
            }
        }

    }

}