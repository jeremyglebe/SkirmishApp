"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7696],{7696:(g,d,r)=>{r.r(d),r.d(d,{WarbandsListPage:()=>W});var l=r(5861),a=r(7151),b=r(6895),n=r(1571),u=r(2218);function m(e,_){if(1&e){const t=n.EpF();n.TgZ(0,"ion-item")(1,"ion-label")(2,"h2"),n._uU(3),n.qZA(),n.TgZ(4,"p"),n._uU(5),n.qZA()(),n.TgZ(6,"ion-buttons",5)(7,"ion-button",3),n.NdJ("click",function(){const o=n.CHM(t).$implicit,s=n.oxw();return n.KtG(s.viewWarbandDetails(o))}),n._UZ(8,"ion-icon",6),n.qZA(),n.TgZ(9,"ion-button",3),n.NdJ("click",function(){const o=n.CHM(t).$implicit,s=n.oxw();return n.KtG(s.editWarband(o))}),n._UZ(10,"ion-icon",7),n.qZA(),n.TgZ(11,"ion-button",3),n.NdJ("click",function(){const o=n.CHM(t).$implicit,s=n.oxw();return n.KtG(s.removeWarband(o))}),n._UZ(12,"ion-icon",8),n.qZA()()()}if(2&e){const t=_.$implicit,i=n.oxw();n.xp6(3),n.AsE("",t.name," [",i.unitService.calcWarbandCost(t),"pts]"),n.xp6(2),n.Oqu(t.description)}}let W=(()=>{class e{constructor(t,i){this.navCtrl=t,this.unitService=i,this.warbands=[]}ngOnInit(){var t=this;return(0,l.Z)(function*(){yield t.unitService.initialize(),t.loadWarbands()})()}ionViewWillEnter(){var t=this;return(0,l.Z)(function*(){t.loadWarbands()})()}loadWarbands(){this.warbands=this.unitService.getWarbands()}viewWarbandDetails(t){this.navCtrl.navigateForward("/warband-view",{queryParams:{id:t.id}})}createNewWarband(){this.navCtrl.navigateForward("/warband-editor")}editWarband(t){this.navCtrl.navigateForward("/warband-editor",{queryParams:{warband:JSON.stringify(t)}})}removeWarband(t){this.unitService.removeWarband(t),this.loadWarbands()}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(a.SH),n.Y36(u._))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-warbands-list"]],standalone:!0,features:[n.jDz],decls:12,vars:1,consts:[["slot","start"],[4,"ngFor","ngForOf"],["vertical","bottom","horizontal","end","slot","fixed"],[3,"click"],["name","add"],["slot","end"],["slot","icon-only","name","eye"],["slot","icon-only","name","pencil"],["slot","icon-only","name","trash"]],template:function(t,i){1&t&&(n.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),n._UZ(3,"ion-back-button"),n.qZA(),n.TgZ(4,"ion-title"),n._uU(5,"Warbands List"),n.qZA()()(),n.TgZ(6,"ion-content")(7,"ion-list"),n.YNc(8,m,13,3,"ion-item",1),n.qZA(),n.TgZ(9,"ion-fab",2)(10,"ion-fab-button",3),n.NdJ("click",function(){return i.createNewWarband()}),n._UZ(11,"ion-icon",4),n.qZA()()()),2&t&&(n.xp6(8),n.Q6J("ngForOf",i.warbands))},dependencies:[a.Pc,a.oU,a.YG,a.Sm,a.W2,a.IJ,a.W4,a.Gu,a.gu,a.Ie,a.Q$,a.q_,a.wd,a.sr,a.cs,b.ez,b.sg]}),e})()}}]);