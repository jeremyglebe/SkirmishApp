"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1296],{1296:(D,h,s)=>{s.r(h),s.d(h,{SettingsPage:()=>U});var r=s(5861),C=s(6895),l=s(433),i=s(7151),e=s(1571),Z=s(2218);let U=(()=>{class c{constructor(t){this.unitService=t,this.enhancedUnitCostRule=!1,this.appDeployment="4/4/2023, 2:04:38 PM (CST)"}ngOnInit(){var t=this;return(0,r.Z)(function*(){t.enhancedUnitCostRule=yield t.unitService.getEnhancedUnitCostRule(),t.unitService.changes.subscribe((0,r.Z)(function*(){t.enhancedUnitCostRule=yield t.unitService.getEnhancedUnitCostRule()}))})()}ngOnDestroy(){var t=this;return(0,r.Z)(function*(){t.unitService.changes.unsubscribe()})()}onEnhancedUnitCostRuleToggleChange(t){var n=this;return(0,r.Z)(function*(){const a=t.detail.checked;yield n.unitService.setEnhancedUnitCostRule(a)})()}exportData(){var t=this;return(0,r.Z)(function*(){const n=t.unitService.exportData(),a=new Blob([n],{type:"text/plain;charset=utf-8"}),o=document.createElement("a");o.href=URL.createObjectURL(a),o.download="warstuff-backup.json",o.click()})()}importData(){var t=this;return(0,r.Z)(function*(){const n=document.createElement("input");n.type="file",n.addEventListener("change",function(){var a=(0,r.Z)(function*(o){var u;const f=null===(u=o.target.files)||void 0===u?void 0:u[0];if(f){const v=new FileReader;v.onload=function(){var T=(0,r.Z)(function*(m){var g,d;const y=null!==(g=null===(d=m.target)||void 0===d?void 0:d.result)&&void 0!==g?g:"";(yield t.unitService.importData(y))?console.log("Data imported successfully"):console.error("Error importing data")});return function(m){return T.apply(this,arguments)}}(),v.readAsText(f)}});return function(o){return a.apply(this,arguments)}}()),n.click()})()}}return c.\u0275fac=function(t){return new(t||c)(e.Y36(Z._))},c.\u0275cmp=e.Xpm({type:c,selectors:[["app-settings"]],standalone:!0,features:[e.jDz],decls:15,vars:2,consts:[["slot","end",3,"ngModel","ngModelChange","ionChange"],["expand","block",3,"click"]],template:function(t,n){1&t&&(e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e._uU(3,"Settings"),e.qZA()()(),e.TgZ(4,"ion-content")(5,"ion-item"),e._uU(6),e.qZA(),e.TgZ(7,"ion-item")(8,"ion-label"),e._uU(9,"Enhanced Unit Cost Rule"),e.qZA(),e.TgZ(10,"ion-toggle",0),e.NdJ("ngModelChange",function(o){return n.enhancedUnitCostRule=o})("ionChange",function(o){return n.onEnhancedUnitCostRuleToggleChange(o)}),e.qZA()(),e.TgZ(11,"ion-button",1),e.NdJ("click",function(){return n.exportData()}),e._uU(12,"Export Data"),e.qZA(),e.TgZ(13,"ion-button",1),e.NdJ("click",function(){return n.importData()}),e._uU(14,"Import Data"),e.qZA()()),2&t&&(e.xp6(6),e.hij("App Deployment: ",n.appDeployment,""),e.xp6(4),e.Q6J("ngModel",n.enhancedUnitCostRule))},dependencies:[i.Pc,i.YG,i.W2,i.Gu,i.Ie,i.Q$,i.wd,i.ho,i.sr,i.w,C.ez,l.u5,l.JJ,l.On]}),c})()}}]);