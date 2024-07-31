"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[678],{678:(g,c,n)=>{n.r(c),n.d(c,{HomePage:()=>u});var s=n(6895),_=n(433),o=n(7151),e=n(1571),d=n(2468);let u=(()=>{class r{constructor(a,i){this._=a,this.navCtrl=i}ngOnInit(){}onClickManageMyArmies(){this.navCtrl.navigateForward("tabs")}onClickSettings(){this.navCtrl.navigateForward("settings")}}return r.\u0275fac=function(a){return new(a||r)(e.Y36(d.D),e.Y36(o.SH))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-home"]],standalone:!0,features:[e.jDz],decls:12,vars:2,consts:[[3,"translucent"],[3,"fullscreen"],["button","",3,"click"]],template:function(a,i){1&a&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e._uU(3,"Skirmish App"),e.qZA()()(),e.TgZ(4,"ion-content",1)(5,"ion-list")(6,"ion-item",2),e.NdJ("click",function(){return i.onClickManageMyArmies()}),e.TgZ(7,"h4"),e._uU(8,"Manage My Armies"),e.qZA()(),e.TgZ(9,"ion-item",2),e.NdJ("click",function(){return i.onClickSettings()}),e.TgZ(10,"h4"),e._uU(11,"Settings"),e.qZA()()()()),2&a&&(e.Q6J("translucent",!0),e.xp6(4),e.Q6J("fullscreen",!0))},dependencies:[o.Pc,o.W2,o.Gu,o.Ie,o.q_,o.wd,o.sr,s.ez,_.u5],styles:["ion-content[_ngcontent-%COMP%]::part(background){background:url(knight.693c4d48b88546d5.png) no-repeat center center/cover;opacity:.35}ion-list[_ngcontent-%COMP%]{position:absolute;bottom:0;width:100vw}"]}),r})()},2468:(g,c,n)=>{n.d(c,{D:()=>d});var s=n(5861),_=n(1571),o=n(9547),e=n(849);let d=(()=>{class u{constructor(t,a){this.gui=t,this.storage=a,this.gui.showPromiseLoader(this.initialize(),"Initializing Data Service...")}initialize(){var t=this;return(0,s.Z)(function*(){yield t.storage.create(),yield t.loadDataFromStorage()})()}get units(){var t;return(null===(t=this.data)||void 0===t?void 0:t.units)||[]}get warbands(){var t;return(null===(t=this.data)||void 0===t?void 0:t.warbands)||[]}get enhancedUnitCostRule(){var t;return(null===(t=this.data)||void 0===t?void 0:t.enhancedUnitCostRule)||!1}getUnitById(t){return this.units.find(i=>i.id===t)||null}setUnits(t){var a=this;return(0,s.Z)(function*(){a.data.units=t,a.gui.showPromiseLoader(a.saveDataToStorage(),"Saving Units...")})()}setWarbands(t){var a=this;return(0,s.Z)(function*(){a.data.warbands=t,a.gui.showPromiseLoader(a.saveDataToStorage(),"Saving Warbands...")})()}setEnhancedUnitCostRule(t){var a=this;return(0,s.Z)(function*(){a.data.enhancedUnitCostRule=t,a.gui.showPromiseLoader(a.saveDataToStorage(),"Saving Enhanced Unit Cost Rule...")})()}updateUnit(t){var a=this;return(0,s.Z)(function*(){const i=a.data.units.findIndex(l=>l.id===t.id);-1!==i&&(a.data.units[i]=t,a.gui.showPromiseLoader(a.saveDataToStorage(),"Updating Unit..."))})()}clearUnits(){var t=this;return(0,s.Z)(function*(){t.data.units=[],t.gui.showPromiseLoader(t.saveDataToStorage(),"Clearing Units...")})()}clearWarbands(){var t=this;return(0,s.Z)(function*(){t.data.warbands=[],t.gui.showPromiseLoader(t.saveDataToStorage(),"Clearing Warbands...")})()}saveDataToStorage(){var t=this;return(0,s.Z)(function*(){var a,i,l;yield t.storage.set("units",null===(a=t.data)||void 0===a?void 0:a.units),yield t.storage.set("warbands",null===(i=t.data)||void 0===i?void 0:i.warbands),yield t.storage.set("enhancedUnitCostRule",null===(l=t.data)||void 0===l?void 0:l.enhancedUnitCostRule)})()}loadDataFromStorage(){var t=this;return(0,s.Z)(function*(){const a=(yield t.storage.get("units"))||[],i=(yield t.storage.get("warbands"))||[],l=(yield t.storage.get("enhancedUnitCostRule"))||!1;t.data={units:a,warbands:i,enhancedUnitCostRule:l}})()}}return u.\u0275fac=function(t){return new(t||u)(_.LFG(o.m),_.LFG(e.K))},u.\u0275prov=_.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u})()},9547:(g,c,n)=>{n.d(c,{m:()=>e});var s=n(5861),_=n(1571),o=n(7151);let e=(()=>{class d{constructor(r){this.loading=r}showPromiseLoader(r,t){var a=this;return(0,s.Z)(function*(){const i=yield a.loading.create({message:t||"Please wait..."});yield i.present();try{return yield r}finally{yield i.dismiss()}})()}}return d.\u0275fac=function(r){return new(r||d)(_.LFG(o.HT))},d.\u0275prov=_.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"}),d})()}}]);