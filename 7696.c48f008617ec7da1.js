"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7696],{3442:(v,h,o)=>{o.d(h,{k:()=>i});const i={6:5,5:10,4:20,3:35,2:55}},2468:(v,h,o)=>{o.d(h,{D:()=>c});var i=o(5861),s=o(1571),b=o(9547),e=o(849);let c=(()=>{class l{constructor(n,a){this.gui=n,this.storage=a,this.gui.showPromiseLoader(this.initialize(),"Initializing Data Service...")}initialize(){var n=this;return(0,i.Z)(function*(){yield n.storage.create(),yield n.loadDataFromStorage()})()}get units(){var n;return(null===(n=this.data)||void 0===n?void 0:n.units)||[]}get warbands(){var n;return(null===(n=this.data)||void 0===n?void 0:n.warbands)||[]}get enhancedUnitCostRule(){var n;return(null===(n=this.data)||void 0===n?void 0:n.enhancedUnitCostRule)||!1}getUnitById(n){return this.units.find(t=>t.id===n)||null}setUnits(n){var a=this;return(0,i.Z)(function*(){a.data.units=n,a.gui.showPromiseLoader(a.saveDataToStorage(),"Saving Units...")})()}setWarbands(n){var a=this;return(0,i.Z)(function*(){a.data.warbands=n,a.gui.showPromiseLoader(a.saveDataToStorage(),"Saving Warbands...")})()}setEnhancedUnitCostRule(n){var a=this;return(0,i.Z)(function*(){a.data.enhancedUnitCostRule=n,a.gui.showPromiseLoader(a.saveDataToStorage(),"Saving Enhanced Unit Cost Rule...")})()}updateUnit(n){var a=this;return(0,i.Z)(function*(){const t=a.data.units.findIndex(r=>r.id===n.id);-1!==t&&(a.data.units[t]=n,a.gui.showPromiseLoader(a.saveDataToStorage(),"Updating Unit..."))})()}clearUnits(){var n=this;return(0,i.Z)(function*(){n.data.units=[],n.gui.showPromiseLoader(n.saveDataToStorage(),"Clearing Units...")})()}clearWarbands(){var n=this;return(0,i.Z)(function*(){n.data.warbands=[],n.gui.showPromiseLoader(n.saveDataToStorage(),"Clearing Warbands...")})()}saveDataToStorage(){var n=this;return(0,i.Z)(function*(){var a,t,r;yield n.storage.set("units",null===(a=n.data)||void 0===a?void 0:a.units),yield n.storage.set("warbands",null===(t=n.data)||void 0===t?void 0:t.warbands),yield n.storage.set("enhancedUnitCostRule",null===(r=n.data)||void 0===r?void 0:r.enhancedUnitCostRule)})()}loadDataFromStorage(){var n=this;return(0,i.Z)(function*(){const a=(yield n.storage.get("units"))||[],t=(yield n.storage.get("warbands"))||[],r=(yield n.storage.get("enhancedUnitCostRule"))||!1;n.data={units:a,warbands:t,enhancedUnitCostRule:r}})()}}return l.\u0275fac=function(n){return new(n||l)(s.LFG(b.m),s.LFG(e.K))},l.\u0275prov=s.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()},9547:(v,h,o)=>{o.d(h,{m:()=>e});var i=o(5861),s=o(1571),b=o(7151);let e=(()=>{class c{constructor(u){this.loading=u}showPromiseLoader(u,n){var a=this;return(0,i.Z)(function*(){const t=yield a.loading.create({message:n||"Please wait..."});yield t.present();try{return yield u}finally{yield t.dismiss()}})()}}return c.\u0275fac=function(u){return new(u||c)(s.LFG(b.HT))},c.\u0275prov=s.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})()},2218:(v,h,o)=>{o.d(h,{_:()=>l});var i=o(5861),s=o(1571),b=o(3442),e=o(2468),c=o(9547);let l=(()=>{class u{constructor(a,t){this.data=a,this.gui=t,this.changes=new s.vpe,this.warbands=[],this.enhancedUnitCostRule=!1,this.unitDraft=null,this.gui.showPromiseLoader(this.initialize(),"Initializing Unit Service...")}initialize(){var a=this;return(0,i.Z)(function*(){a.warbands=a.data.warbands||[],a.enhancedUnitCostRule=a.data.enhancedUnitCostRule||!1})()}get units(){return this.data.units}calcUnitCost(a){let t=b.k[a.rank];const r=a.edges.length;let _=0;for(let g=0;g<r;g++){const f=a.edges[g];f.cost>0&&(_++,this.enhancedUnitCostRule&&_>3&&(t+=10*(_-3))),t+=f.cost}return t}calcWarbandCost(a){let t=0;for(let r of a.units)t+=this.calcUnitCost(r.unit)*r.count;return t}getRankCost(a){return b.k[a.rank]}setEnhancedUnitCostRule(a){var t=this;return(0,i.Z)(function*(){t.enhancedUnitCostRule=a,yield t.data.setEnhancedUnitCostRule(a),t.changes.emit()})()}getEnhancedUnitCostRule(){var a=this;return(0,i.Z)(function*(){return a.enhancedUnitCostRule=a.data.enhancedUnitCostRule||!1,a.enhancedUnitCostRule})()}exportData(){return JSON.stringify({units:this.data.units,warbands:this.warbands,enhancedUnitCostRule:this.enhancedUnitCostRule},null,2)}importAndMergeData(a){var t=this;return(0,i.Z)(function*(){try{const r=JSON.parse(a),d=t.data.units.concat(r.units);return t.warbands=t.warbands.concat(r.warbands),yield t.data.setUnits(d),yield t.data.setWarbands(t.warbands),t.changes.emit(),!0}catch(r){return console.error("Error importing data:",r),!1}})()}importAndMergeUnitsOnly(a){var t=this;return(0,i.Z)(function*(){try{const r=JSON.parse(a),d=t.data.units.concat(r.units);return yield t.data.setUnits(d),t.changes.emit(),!0}catch(r){return console.error("Error importing data:",r),!1}})()}importAndMergeWarbandsOnly(a){var t=this;return(0,i.Z)(function*(){try{const r=JSON.parse(a);return t.warbands=t.warbands.concat(r.warbands),yield t.data.setWarbands(t.warbands),t.changes.emit(),!0}catch(r){return console.error("Error importing data:",r),!1}})()}importAndOverwriteData(a){var t=this;return(0,i.Z)(function*(){try{const r=JSON.parse(a),d=r.units;return t.warbands=r.warbands,t.enhancedUnitCostRule=r.enhancedUnitCostRule,yield t.data.setUnits(d),yield t.data.setWarbands(t.warbands),yield t.data.setEnhancedUnitCostRule(t.enhancedUnitCostRule),t.changes.emit(),!0}catch(r){return console.error("Error importing data:",r),!1}})()}generateID(){return Math.random().toString(36).substring(2,9)}addUnit(a){var t=this;return(0,i.Z)(function*(){const r=t.data.units.concat(a);yield t.data.setUnits(r),t.changes.emit()})()}purgeUnit(a){var t=this;return(0,i.Z)(function*(){const r=t.data.units.filter(d=>d.id!==a.id);t.warbands=t.warbands.map(d=>(d.units=d.units.filter(_=>_.unit.id!==a.id),d)),yield t.data.setUnits(r),yield t.data.setWarbands(t.warbands)})()}deleteUnit(a){var t=this;return(0,i.Z)(function*(){const r=t.data.units.filter(d=>d.id!==a.id);yield t.data.setUnits(r)})()}clearUnits(){var a=this;return(0,i.Z)(function*(){yield a.data.clearUnits(),a.changes.emit()})()}updateUnit(a){var t=this;return(0,i.Z)(function*(){t.data.updateUnit(a)})()}getUnitById(a){return this.data.getUnitById(a)}addWarband(a){var t=this;return(0,i.Z)(function*(){t.warbands.push(a),yield t.data.setWarbands(t.warbands)})()}getWarbands(){return this.warbands}createWarband(a){var t=this;return(0,i.Z)(function*(){const r={id:Date.now().toString(),...a};t.warbands.push(r),yield t.data.setWarbands(t.warbands)})()}updateWarband(a){var t=this;return(0,i.Z)(function*(){const r=t.warbands.findIndex(d=>d.id===a.id);r>-1&&(t.warbands[r]=a,yield t.data.setWarbands(t.warbands))})()}getWarbandById(a){const t=this.warbands.find(r=>r.id===a);return t?{...t}:null}removeWarband(a){var t=this;return(0,i.Z)(function*(){t.warbands=t.warbands.filter(r=>r!==a),yield t.data.setWarbands(t.warbands)})()}clearWarbands(){var a=this;return(0,i.Z)(function*(){yield a.data.clearWarbands(),a.warbands=[],a.changes.emit()})()}}return u.\u0275fac=function(a){return new(a||u)(s.LFG(e.D),s.LFG(c.m))},u.\u0275prov=s.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u})()},7696:(v,h,o)=>{o.r(h),o.d(h,{WarbandsListPage:()=>u});var i=o(5861),s=o(7151),b=o(6895),e=o(1571),c=o(2218);function l(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"ion-item")(1,"ion-label")(2,"h2"),e._uU(3),e.qZA(),e.TgZ(4,"p"),e._uU(5),e.qZA()(),e.TgZ(6,"ion-buttons",5)(7,"ion-button",3),e.NdJ("click",function(){const _=e.CHM(t).$implicit,g=e.oxw();return e.KtG(g.viewWarbandDetails(_))}),e._UZ(8,"ion-icon",6),e.qZA(),e.TgZ(9,"ion-button",3),e.NdJ("click",function(){const _=e.CHM(t).$implicit,g=e.oxw();return e.KtG(g.editWarband(_))}),e._UZ(10,"ion-icon",7),e.qZA(),e.TgZ(11,"ion-button",3),e.NdJ("click",function(){const _=e.CHM(t).$implicit,g=e.oxw();return e.KtG(g.presentRemoveWarbandAlert(_))}),e._UZ(12,"ion-icon",8),e.qZA()()()}if(2&n){const t=a.$implicit,r=e.oxw();e.xp6(3),e.AsE("",t.name," [",r.unitService.calcWarbandCost(t),"pts]"),e.xp6(2),e.Oqu(t.description)}}let u=(()=>{class n{constructor(t,r,d){this.navCtrl=t,this.unitService=r,this.alertController=d,this.warbands=[]}ngOnInit(){var t=this;return(0,i.Z)(function*(){t.loadWarbands()})()}ionViewWillEnter(){var t=this;return(0,i.Z)(function*(){t.loadWarbands()})()}loadWarbands(){this.warbands=this.unitService.getWarbands()}viewWarbandDetails(t){this.navCtrl.navigateForward("/warband-view",{queryParams:{id:t.id}})}createNewWarband(){this.navCtrl.navigateForward("/warband-editor")}editWarband(t){this.navCtrl.navigateForward("/warband-editor",{queryParams:{warbandId:t.id}})}removeWarband(t){this.unitService.removeWarband(t),this.loadWarbands()}presentRemoveWarbandAlert(t){var r=this;return(0,i.Z)(function*(){yield(yield r.alertController.create({header:"Delete Warband",message:"Are you sure you want to delete this warband?",buttons:[{text:"Cancel",role:"cancel"},{text:"Delete",handler:()=>{r.removeWarband(t)}}]})).present()})()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(s.SH),e.Y36(c._),e.Y36(s.Br))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-warbands-list"]],standalone:!0,features:[e.jDz],decls:12,vars:1,consts:[["slot","start"],[4,"ngFor","ngForOf"],["vertical","bottom","horizontal","end","slot","fixed"],[3,"click"],["name","add"],["slot","end"],["slot","icon-only","name","eye"],["slot","icon-only","name","pencil"],["slot","icon-only","name","trash"]],template:function(t,r){1&t&&(e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),e._UZ(3,"ion-back-button"),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"Warbands List"),e.qZA()()(),e.TgZ(6,"ion-content")(7,"ion-list"),e.YNc(8,l,13,3,"ion-item",1),e.qZA(),e.TgZ(9,"ion-fab",2)(10,"ion-fab-button",3),e.NdJ("click",function(){return r.createNewWarband()}),e._UZ(11,"ion-icon",4),e.qZA()()()),2&t&&(e.xp6(8),e.Q6J("ngForOf",r.warbands))},dependencies:[s.Pc,s.oU,s.YG,s.Sm,s.W2,s.IJ,s.W4,s.Gu,s.gu,s.Ie,s.Q$,s.q_,s.wd,s.sr,s.cs,b.ez,b.sg]}),n})()}}]);