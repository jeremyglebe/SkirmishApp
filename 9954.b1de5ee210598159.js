"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9954],{9954:(U,u,a)=>{a.r(u),a.d(u,{WarbandViewPage:()=>P});var l=a(5861),c=a(6895),e=a(7151),d=a(8242),n=a(1571),g=a(9430),p=a(2218);function m(o,s){if(1&o){const t=n.EpF();n.ynx(0),n.TgZ(1,"ion-item",3),n.NdJ("click",function(){const _=n.CHM(t).$implicit,b=n.oxw();return n.KtG(b.viewUnit(_.unit))}),n.TgZ(2,"ion-avatar",0),n._UZ(3,"img",4),n.qZA(),n.TgZ(4,"ion-label",1),n._uU(5),n._UZ(6,"br"),n._uU(7),n._UZ(8,"br"),n._uU(9),n.qZA(),n.TgZ(10,"ion-label",1),n._uU(11),n.qZA()(),n.BQk()}if(2&o){const t=s.$implicit,i=n.oxw();n.xp6(3),n.Q6J("src",t.unit.image||"assets/default-unit-image.png",n.LSH),n.xp6(2),n.AsE(" [",t.count,"] ",t.unit.name,""),n.xp6(2),n.hij(" Quality: ",t.unit.quality,""),n.xp6(2),n.hij(" Cost: ",i.unitService.calcUnitCost(t.unit),"pts "),n.xp6(2),n.hij(" ",i.unitRulesString(t.unit)," ")}}let P=(()=>{class o{constructor(t,i,r,_){this.navCtrl=t,this.route=i,this.unitService=r,this.modalController=_,this.warband={id:"",name:"",description:"",units:[]}}ngOnInit(){var t=this;return(0,l.Z)(function*(){const i=t.route.snapshot.queryParamMap.get("id");if(i){const r=yield t.unitService.getWarbandById(i);r&&(t.warband=r)}})()}unitRulesString(t){const i=[];for(let r of t.edges)i.push(r.name);return i.join(", ")}viewUnit(t){var i=this;return(0,l.Z)(function*(){yield(yield i.modalController.create({component:d.UnitViewPage,componentProps:{unit:t}})).present()})()}}return o.\u0275fac=function(t){return new(t||o)(n.Y36(e.SH),n.Y36(g.gz),n.Y36(p._),n.Y36(e.IN))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-warband-view"]],standalone:!0,features:[n.jDz],decls:15,vars:3,consts:[["slot","start"],[1,"ion-text-wrap"],[4,"ngFor","ngForOf"],[3,"click"],[3,"src"]],template:function(t,i){1&t&&(n.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),n._UZ(3,"ion-back-button"),n.qZA(),n.TgZ(4,"ion-title"),n._uU(5),n.qZA()()(),n.TgZ(6,"ion-content")(7,"ion-item")(8,"ion-label",1),n._uU(9),n.qZA()(),n.TgZ(10,"ion-list-header")(11,"ion-label"),n._uU(12,"Units"),n.qZA()(),n.TgZ(13,"ion-list"),n.YNc(14,m,12,6,"ng-container",2),n.qZA()()),2&t&&(n.xp6(5),n.Oqu(i.warband.name),n.xp6(4),n.hij(" ",i.warband.description," "),n.xp6(5),n.Q6J("ngForOf",i.warband.units))},dependencies:[e.Pc,e.BJ,e.oU,e.Sm,e.W2,e.Gu,e.Ie,e.Q$,e.q_,e.yh,e.wd,e.sr,e.cs,c.ez,c.sg]}),o})()}}]);