"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6902],{6902:(P,c,s)=>{s.r(c),s.d(c,{WarbandEditorPage:()=>U});var p=s(5861),u=s(6895),o=s(433),a=s(7151),g=s(2408),n=s(1571),b=s(9430),h=s(2218);function f(r,_){if(1&r){const t=n.EpF();n.TgZ(0,"ion-input",10),n.NdJ("ngModelChange",function(e){n.CHM(t);const d=n.oxw().$implicit,l=n.oxw();return n.KtG(l.unitCounts[d.id]=e)}),n.qZA()}if(2&r){const t=n.oxw().$implicit,i=n.oxw();n.Q6J("ngModel",i.unitCounts[t.id])}}function C(r,_){if(1&r){const t=n.EpF();n.TgZ(0,"ion-item")(1,"ion-avatar",6),n.NdJ("click",function(){const d=n.CHM(t).$implicit,l=n.oxw();return n.KtG(l.viewUnit(d))}),n._UZ(2,"img",7),n.qZA(),n.TgZ(3,"ion-checkbox",8),n.NdJ("ionChange",function(){const d=n.CHM(t).$implicit,l=n.oxw();return n.KtG(l.toggleUnitSelection(d))}),n._uU(4),n._UZ(5,"br"),n._uU(6),n._UZ(7,"br"),n._uU(8),n.qZA(),n.YNc(9,f,1,1,"ion-input",9),n.qZA()}if(2&r){const t=_.$implicit,i=n.oxw();n.xp6(2),n.Q6J("src",t.image||"assets/default-unit-image.png",n.LSH),n.xp6(1),n.Q6J("checked",i.isUnitInWarband(t)),n.xp6(1),n.hij(" ",t.name,""),n.xp6(2),n.hij(" Quality: ",t.quality,""),n.xp6(2),n.hij(" Cost: ",i.unitService.calcUnitCost(t),"pts "),n.xp6(1),n.Q6J("ngIf",i.isUnitInWarband(t))}}let U=(()=>{class r{constructor(t,i,e,d,l){this.navCtrl=t,this.route=i,this.fb=e,this.unitService=d,this.modalController=l,this.allUnits=[],this.unitCounts={},this.allUnits=this.unitService.getUnits();const m=this.route.snapshot.queryParamMap.get("warband");this.warband=m?JSON.parse(m):null,this.warbandForm=this.fb.group({name:[this.warband?this.warband.name:"",o.kI.required],description:[this.warband?this.warband.description:"",o.kI.required]}),this.units=this.warband?this.warband.units:[],this.allUnits.forEach(E=>{this.unitCounts[E.id]=1})}toggleUnitSelection(t){const i=this.units.findIndex(e=>e.unit.id===t.id);-1===i?this.units.push({unit:t,count:1}):this.units.splice(i,1)}saveWarband(){var t=this;return(0,p.Z)(function*(){const i=t.units.map(d=>({unit:d.unit,count:t.unitCounts[d.unit.id]||1})),e={...t.warbandForm.value,units:i};t.warband?t.unitService.updateWarband({...t.warband,...e}):t.unitService.createWarband(e),t.navCtrl.navigateBack("/warbands-list")})()}viewUnit(t){var i=this;return(0,p.Z)(function*(){yield(yield i.modalController.create({component:g.ViewUnitPage,componentProps:{unit:t}})).present()})()}isUnitInWarband(t){return this.units.some(i=>i.unit.id===t.id)}}return r.\u0275fac=function(t){return new(t||r)(n.Y36(a.SH),n.Y36(b.gz),n.Y36(o.qu),n.Y36(h._),n.Y36(a.IN))},r.\u0275cmp=n.Xpm({type:r,selectors:[["app-warband-editor"]],standalone:!0,features:[n.jDz],decls:21,vars:4,consts:[["slot","start"],[3,"formGroup"],["formControlName","name","label","Warband Name"],["formControlName","description","label","Warband Description"],[4,"ngFor","ngForOf"],["expand","full",3,"disabled","click"],["slot","start",3,"click"],[3,"src"],["labelPlacement","start",3,"checked","ionChange"],["type","number","min","1","placeholder","1","label","","labelPlacement","stacked","class","count-input",3,"ngModel","ngModelChange",4,"ngIf"],["type","number","min","1","placeholder","1","label","","labelPlacement","stacked",1,"count-input",3,"ngModel","ngModelChange"]],template:function(t,i){1&t&&(n.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),n._UZ(3,"ion-back-button"),n.qZA(),n.TgZ(4,"ion-title"),n._uU(5),n.qZA()()(),n.TgZ(6,"ion-content")(7,"form",1)(8,"ion-item"),n._UZ(9,"ion-input",2),n.qZA(),n.TgZ(10,"ion-item"),n._UZ(11,"ion-textarea",3),n.qZA()(),n.TgZ(12,"ion-list-header")(13,"ion-label"),n._uU(14,"Available Units"),n.qZA()(),n.TgZ(15,"ion-list")(16,"ion-item"),n._uU(17,"Click on a unit's avatar to view it's full description."),n.qZA(),n.YNc(18,C,10,6,"ion-item",4),n.qZA(),n.TgZ(19,"ion-button",5),n.NdJ("click",function(){return i.saveWarband()}),n._uU(20,"Save Warband"),n.qZA()()),2&t&&(n.xp6(5),n.Oqu(i.warband?"Edit Warband":"Create Warband"),n.xp6(2),n.Q6J("formGroup",i.warbandForm),n.xp6(11),n.Q6J("ngForOf",i.allUnits),n.xp6(1),n.Q6J("disabled",!i.warbandForm.valid))},dependencies:[a.Pc,a.BJ,a.oU,a.YG,a.Sm,a.nz,a.W2,a.Gu,a.pK,a.Ie,a.Q$,a.q_,a.yh,a.g2,a.wd,a.sr,a.w,a.as,a.j9,a.cs,u.ez,u.sg,u.O5,o.UX,o._Y,o.JJ,o.JL,o.sg,o.u,o.u5,o.On],styles:[".count-input[_ngcontent-%COMP%]{--padding-start: 0;--padding-end: 0;width:50px;max-height:50px;font-size:1.1em;font-weight:700;text-align:center;border:2px solid white;border-radius:8px;margin-left:12px}"]}),r})()}}]);