"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7696],{7696:(g,_,r)=>{r.r(_),r.d(_,{WarbandsListPage:()=>W});var c=r(5861),a=r(7151),b=r(6895),t=r(1571),u=r(2218);function m(i,l){if(1&i){const n=t.EpF();t.TgZ(0,"ion-item")(1,"ion-label")(2,"h2"),t._uU(3),t.qZA(),t.TgZ(4,"p"),t._uU(5),t.qZA()(),t.TgZ(6,"ion-buttons",5)(7,"ion-button",3),t.NdJ("click",function(){const s=t.CHM(n).$implicit,d=t.oxw();return t.KtG(d.viewWarbandDetails(s))}),t._UZ(8,"ion-icon",6),t.qZA(),t.TgZ(9,"ion-button",3),t.NdJ("click",function(){const s=t.CHM(n).$implicit,d=t.oxw();return t.KtG(d.editWarband(s))}),t._UZ(10,"ion-icon",7),t.qZA(),t.TgZ(11,"ion-button",3),t.NdJ("click",function(){const s=t.CHM(n).$implicit,d=t.oxw();return t.KtG(d.presentRemoveWarbandAlert(s))}),t._UZ(12,"ion-icon",8),t.qZA()()()}if(2&i){const n=l.$implicit,e=t.oxw();t.xp6(3),t.AsE("",n.name," [",e.unitService.calcWarbandCost(n),"pts]"),t.xp6(2),t.Oqu(n.description)}}let W=(()=>{class i{constructor(n,e,o){this.navCtrl=n,this.unitService=e,this.alertController=o,this.warbands=[]}ngOnInit(){var n=this;return(0,c.Z)(function*(){yield n.unitService.initialize(),n.loadWarbands()})()}ionViewWillEnter(){var n=this;return(0,c.Z)(function*(){n.loadWarbands()})()}loadWarbands(){this.warbands=this.unitService.getWarbands()}viewWarbandDetails(n){this.navCtrl.navigateForward("/warband-view",{queryParams:{id:n.id}})}createNewWarband(){this.navCtrl.navigateForward("/warband-editor")}editWarband(n){this.navCtrl.navigateForward("/warband-editor",{queryParams:{warbandId:n.id}})}removeWarband(n){this.unitService.removeWarband(n),this.loadWarbands()}presentRemoveWarbandAlert(n){var e=this;return(0,c.Z)(function*(){yield(yield e.alertController.create({header:"Delete Warband",message:"Are you sure you want to delete this warband?",buttons:[{text:"Cancel",role:"cancel"},{text:"Delete",handler:()=>{e.removeWarband(n)}}]})).present()})()}}return i.\u0275fac=function(n){return new(n||i)(t.Y36(a.SH),t.Y36(u._),t.Y36(a.Br))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-warbands-list"]],standalone:!0,features:[t.jDz],decls:12,vars:1,consts:[["slot","start"],[4,"ngFor","ngForOf"],["vertical","bottom","horizontal","end","slot","fixed"],[3,"click"],["name","add"],["slot","end"],["slot","icon-only","name","eye"],["slot","icon-only","name","pencil"],["slot","icon-only","name","trash"]],template:function(n,e){1&n&&(t.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),t._UZ(3,"ion-back-button"),t.qZA(),t.TgZ(4,"ion-title"),t._uU(5,"Warbands List"),t.qZA()()(),t.TgZ(6,"ion-content")(7,"ion-list"),t.YNc(8,m,13,3,"ion-item",1),t.qZA(),t.TgZ(9,"ion-fab",2)(10,"ion-fab-button",3),t.NdJ("click",function(){return e.createNewWarband()}),t._UZ(11,"ion-icon",4),t.qZA()()()),2&n&&(t.xp6(8),t.Q6J("ngForOf",e.warbands))},dependencies:[a.Pc,a.oU,a.YG,a.Sm,a.W2,a.IJ,a.W4,a.Gu,a.gu,a.Ie,a.Q$,a.q_,a.wd,a.sr,a.cs,b.ez,b.sg]}),i})()}}]);