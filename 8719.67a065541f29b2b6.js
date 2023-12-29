"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8719],{3442:(b,g,d)=>{d.d(g,{k:()=>r});const r={6:5,5:10,4:20,3:35,2:55}},8719:(b,g,d)=>{d.r(g),d.d(g,{CreateUnitDetailsPage:()=>f});var r=d(6895),u=d(433),s=d(7151),a=d(1571),_=d(3623);const v=["fileInput"],c=["unitImage"];let f=(()=>{class t{constructor(e,i){this.navCtrl=e,this.units=i}ngOnInit(){this.units.unitDraft={id:this.units.generateID(),name:"",rank:0,edges:[]}}onFileChange(e){const i=e.target.files[0];if(!i)return;const o=new FileReader;o.onload=()=>{const l=o.result;this.units.unitDraft.image=l,this.unitImage.nativeElement.src=l},o.readAsDataURL(i)}onNameChange(e){this.units.unitDraft.name=e.target.value}onProceed(){this.units.addUnit(this.units.unitDraft),this.units.unitDraft=null,this.navCtrl.navigateRoot("/",{animated:!0,animationDirection:"back"})}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(s.SH),a.Y36(_._))},t.\u0275cmp=a.Xpm({type:t,selectors:[["app-create-unit-details"]],viewQuery:function(e,i){if(1&e&&(a.Gf(v,5),a.Gf(c,5)),2&e){let o;a.iGM(o=a.CRH())&&(i.fileInput=o.first),a.iGM(o=a.CRH())&&(i.unitImage=o.first)}},standalone:!0,features:[a.jDz],decls:24,vars:0,consts:[["slot","start"],[1,"ion-justify-content-center"],["size","8"],["id","unit-image","src","assets/default-unit-image.png",3,"click"],["unitImage",""],["type","file","hidden","","accept","image/*",3,"change"],["fileInput",""],[1,"center-text"],["label","Unit Name","placeholder","please enter a name...",3,"change"],["size","6"],["expand","full",3,"click"]],template:function(e,i){if(1&e){const o=a.EpF();a.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),a._UZ(3,"ion-back-button"),a.qZA(),a.TgZ(4,"ion-title"),a._uU(5,"Create Unit"),a.qZA()()(),a.TgZ(6,"ion-content")(7,"ion-grid")(8,"ion-row",1)(9,"ion-col",2)(10,"img",3,4),a.NdJ("click",function(){a.CHM(o);const h=a.MAs(13);return a.KtG(h.click())}),a.qZA(),a.TgZ(12,"input",5,6),a.NdJ("change",function(h){return i.onFileChange(h)}),a.qZA(),a.TgZ(14,"p",7)(15,"i"),a._uU(16,"Tap image to change"),a.qZA()()()(),a.TgZ(17,"ion-row",1)(18,"ion-col",2)(19,"ion-input",8),a.NdJ("change",function(h){return i.onNameChange(h)}),a.qZA()()(),a.TgZ(20,"ion-row",1)(21,"ion-col",9)(22,"ion-button",10),a.NdJ("click",function(){return i.onProceed()}),a._uU(23,"Proceed"),a.qZA()()()()()}},dependencies:[s.Pc,s.oU,s.YG,s.Sm,s.wI,s.W2,s.jY,s.Gu,s.pK,s.Nd,s.wd,s.sr,s.j9,s.cs,r.ez,u.u5],styles:["#unit-image[_ngcontent-%COMP%]{max-height:30vh;display:block;margin-left:auto;margin-right:auto}.center-text[_ngcontent-%COMP%]{text-align:center}"]}),t})()},3623:(b,g,d)=>{d.d(g,{_:()=>v});var r=d(5861),u=d(1571),s=d(3442),a=d(849);let _=(()=>{class c{constructor(t){this.storage=t,this.whenLocked=new u.vpe,this.whenUnlocked=new u.vpe,this._startedInitialization=!1,this._locked=!0}initialize(){var t=this;return(0,r.Z)(function*(){t._startedInitialization||(t._startedInitialization=!0,yield t.storage.create(),yield t.loadDataFromStorage(),t.unlock())})()}get locked(){return this._locked}get units(){var t;if(this.locked)throw new Error("DataService is locked!");return(null===(t=this.data)||void 0===t?void 0:t.units)||[]}get warbands(){var t;if(this.locked)throw new Error("DataService is locked!");return(null===(t=this.data)||void 0===t?void 0:t.warbands)||[]}get enhancedUnitCostRule(){var t;if(this.locked)throw new Error("DataService is locked!");return(null===(t=this.data)||void 0===t?void 0:t.enhancedUnitCostRule)||!1}getUnitById(t){return this.units.find(e=>e.id===t)||null}setUnits(t){var n=this;return(0,r.Z)(function*(){n.lock()||n.whenLocked.subscribe(()=>{n.setUnits(t)}),n.data.units=t,yield n.saveDataToStorage(),n.unlock()})()}setWarbands(t){var n=this;return(0,r.Z)(function*(){n.lock()||n.whenLocked.subscribe(()=>{n.setWarbands(t)}),n.data.warbands=t,yield n.saveDataToStorage(),n.unlock()})()}setEnhancedUnitCostRule(t){var n=this;return(0,r.Z)(function*(){n.lock()||n.whenLocked.subscribe(()=>{n.setEnhancedUnitCostRule(t)}),n.data.enhancedUnitCostRule=t,yield n.saveDataToStorage(),n.unlock()})()}updateUnit(t){var n=this;return(0,r.Z)(function*(){n.lock()||n.whenLocked.subscribe(()=>{n.updateUnit(t)});const e=n.data.units.findIndex(i=>i.id===t.id);-1!==e&&(n.data.units[e]=t,yield n.saveDataToStorage()),n.unlock()})()}clearUnits(){var t=this;return(0,r.Z)(function*(){t.lock()||t.whenLocked.subscribe(()=>{t.clearUnits()}),t.data.units=[],yield t.saveDataToStorage(),t.unlock()})()}clearWarbands(){var t=this;return(0,r.Z)(function*(){t.lock()||t.whenLocked.subscribe(()=>{t.clearWarbands()}),t.data.warbands=[],yield t.saveDataToStorage(),t.unlock()})()}saveDataToStorage(){var t=this;return(0,r.Z)(function*(){var n,e,i;yield t.storage.set("units",null===(n=t.data)||void 0===n?void 0:n.units),yield t.storage.set("warbands",null===(e=t.data)||void 0===e?void 0:e.warbands),yield t.storage.set("enhancedUnitCostRule",null===(i=t.data)||void 0===i?void 0:i.enhancedUnitCostRule)})()}loadDataFromStorage(){var t=this;return(0,r.Z)(function*(){const n=(yield t.storage.get("units"))||[],e=(yield t.storage.get("warbands"))||[],i=(yield t.storage.get("enhancedUnitCostRule"))||!1;t.data={units:n,warbands:e,enhancedUnitCostRule:i}})()}lock(){return!this._locked&&(this._locked=!0,this.whenLocked.emit(),!0)}unlock(){return!!this._locked&&(this._locked=!1,this.whenUnlocked.emit(),!0)}}return c.\u0275fac=function(t){return new(t||c)(u.LFG(a.K))},c.\u0275prov=u.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})(),v=(()=>{class c{constructor(t){this.data=t,this.changes=new u.vpe,this.warbands=[],this._startedInitialization=!1,this.enhancedUnitCostRule=!1,this.unitDraft=null}initialize(){var t=this;return(0,r.Z)(function*(){t._startedInitialization||(t._startedInitialization=!0,yield t.data.initialize(),t.warbands=t.data.warbands||[],t.enhancedUnitCostRule=t.data.enhancedUnitCostRule||!1)})()}checkInitialization(){if(!this._startedInitialization)throw new Error("You must call UnitService.initialize() before using this service!")}get units(){return this.data.units}calcUnitCost(t){this.checkInitialization();let n=s.k[t.rank];const e=t.edges.length;let o=0;for(let l=0;l<e;l++){const h=t.edges[l];h.cost>0&&(o++,this.enhancedUnitCostRule&&o>3&&(n+=10*(o-3))),n+=h.cost}return n}calcWarbandCost(t){this.checkInitialization();let n=0;for(let e of t.units)n+=this.calcUnitCost(e.unit)*e.count;return n}getRankCost(t){return this.checkInitialization(),s.k[t.rank]}setEnhancedUnitCostRule(t){var n=this;return(0,r.Z)(function*(){n.checkInitialization(),n.enhancedUnitCostRule=t,yield n.data.setEnhancedUnitCostRule(t),n.changes.emit()})()}getEnhancedUnitCostRule(){var t=this;return(0,r.Z)(function*(){return t.checkInitialization(),t.enhancedUnitCostRule=t.data.enhancedUnitCostRule||!1,t.enhancedUnitCostRule})()}exportData(){return JSON.stringify({units:this.data.units,warbands:this.warbands,enhancedUnitCostRule:this.enhancedUnitCostRule},null,2)}importAndMergeData(t){var n=this;return(0,r.Z)(function*(){n.checkInitialization();try{const e=JSON.parse(t),i=n.data.units.concat(e.units);return n.warbands=n.warbands.concat(e.warbands),yield n.data.setUnits(i),yield n.data.setWarbands(n.warbands),n.changes.emit(),!0}catch(e){return console.error("Error importing data:",e),!1}})()}importAndMergeUnitsOnly(t){var n=this;return(0,r.Z)(function*(){n.checkInitialization();try{const e=JSON.parse(t),i=n.data.units.concat(e.units);return yield n.data.setUnits(i),n.changes.emit(),!0}catch(e){return console.error("Error importing data:",e),!1}})()}importAndMergeWarbandsOnly(t){var n=this;return(0,r.Z)(function*(){n.checkInitialization();try{const e=JSON.parse(t);return n.warbands=n.warbands.concat(e.warbands),yield n.data.setWarbands(n.warbands),n.changes.emit(),!0}catch(e){return console.error("Error importing data:",e),!1}})()}importAndOverwriteData(t){var n=this;return(0,r.Z)(function*(){n.checkInitialization();try{const e=JSON.parse(t),i=e.units;return n.warbands=e.warbands,n.enhancedUnitCostRule=e.enhancedUnitCostRule,yield n.data.setUnits(i),yield n.data.setWarbands(n.warbands),yield n.data.setEnhancedUnitCostRule(n.enhancedUnitCostRule),n.changes.emit(),!0}catch(e){return console.error("Error importing data:",e),!1}})()}generateID(){return Math.random().toString(36).substring(2,9)}addUnit(t){var n=this;return(0,r.Z)(function*(){n.checkInitialization();const e=n.data.units.concat(t);yield n.data.setUnits(e),n.changes.emit()})()}purgeUnit(t){var n=this;return(0,r.Z)(function*(){n.checkInitialization();const e=n.data.units.filter(i=>i.id!==t.id);n.warbands=n.warbands.map(i=>(i.units=i.units.filter(o=>o.unit.id!==t.id),i)),yield n.data.setUnits(e),yield n.data.setWarbands(n.warbands)})()}deleteUnit(t){var n=this;return(0,r.Z)(function*(){const e=n.data.units.filter(i=>i.id!==t.id);yield n.data.setUnits(e)})()}clearUnits(){var t=this;return(0,r.Z)(function*(){yield t.data.clearUnits(),t.changes.emit()})()}updateUnit(t){var n=this;return(0,r.Z)(function*(){n.data.updateUnit(t)})()}getUnitById(t){return this.data.getUnitById(t)}addWarband(t){var n=this;return(0,r.Z)(function*(){n.checkInitialization(),n.warbands.push(t),yield n.data.setWarbands(n.warbands)})()}getWarbands(){return this.checkInitialization(),this.warbands}createWarband(t){var n=this;return(0,r.Z)(function*(){n.checkInitialization();const e={id:Date.now().toString(),...t};n.warbands.push(e),yield n.data.setWarbands(n.warbands)})()}updateWarband(t){var n=this;return(0,r.Z)(function*(){n.checkInitialization();const e=n.warbands.findIndex(i=>i.id===t.id);e>-1&&(n.warbands[e]=t,yield n.data.setWarbands(n.warbands))})()}getWarbandById(t){this.checkInitialization();const n=this.warbands.find(e=>e.id===t);return n?{...n}:null}removeWarband(t){var n=this;return(0,r.Z)(function*(){n.checkInitialization(),n.warbands=n.warbands.filter(e=>e!==t),yield n.data.setWarbands(n.warbands)})()}clearWarbands(){var t=this;return(0,r.Z)(function*(){t.checkInitialization(),yield t.data.clearWarbands(),t.warbands=[],t.changes.emit()})()}}return c.\u0275fac=function(t){return new(t||c)(u.LFG(_))},c.\u0275prov=u.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})()}}]);