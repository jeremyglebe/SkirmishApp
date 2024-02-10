"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5891],{3442:(T,v,l)=>{l.d(v,{k:()=>r});const r={6:5,5:10,4:20,3:35,2:55}},2468:(T,v,l)=>{l.d(v,{D:()=>g});var r=l(5861),d=l(1571),u=l(9547),y=l(849);let g=(()=>{class f{constructor(a,n){this.gui=a,this.storage=n,this.gui.showPromiseLoader(this.initialize(),"Initializing Data Service...")}initialize(){var a=this;return(0,r.Z)(function*(){yield a.storage.create(),yield a.loadDataFromStorage()})()}get units(){var a;return(null===(a=this.data)||void 0===a?void 0:a.units)||[]}get warbands(){var a;return(null===(a=this.data)||void 0===a?void 0:a.warbands)||[]}get enhancedUnitCostRule(){var a;return(null===(a=this.data)||void 0===a?void 0:a.enhancedUnitCostRule)||!1}getUnitById(a){return this.units.find(e=>e.id===a)||null}setUnits(a){var n=this;return(0,r.Z)(function*(){n.data.units=a,n.gui.showPromiseLoader(n.saveDataToStorage(),"Saving Units...")})()}setWarbands(a){var n=this;return(0,r.Z)(function*(){n.data.warbands=a,n.gui.showPromiseLoader(n.saveDataToStorage(),"Saving Warbands...")})()}setEnhancedUnitCostRule(a){var n=this;return(0,r.Z)(function*(){n.data.enhancedUnitCostRule=a,n.gui.showPromiseLoader(n.saveDataToStorage(),"Saving Enhanced Unit Cost Rule...")})()}updateUnit(a){var n=this;return(0,r.Z)(function*(){const e=n.data.units.findIndex(s=>s.id===a.id);-1!==e&&(n.data.units[e]=a,n.gui.showPromiseLoader(n.saveDataToStorage(),"Updating Unit..."))})()}clearUnits(){var a=this;return(0,r.Z)(function*(){a.data.units=[],a.gui.showPromiseLoader(a.saveDataToStorage(),"Clearing Units...")})()}clearWarbands(){var a=this;return(0,r.Z)(function*(){a.data.warbands=[],a.gui.showPromiseLoader(a.saveDataToStorage(),"Clearing Warbands...")})()}saveDataToStorage(){var a=this;return(0,r.Z)(function*(){var n,e,s;yield a.storage.set("units",null===(n=a.data)||void 0===n?void 0:n.units),yield a.storage.set("warbands",null===(e=a.data)||void 0===e?void 0:e.warbands),yield a.storage.set("enhancedUnitCostRule",null===(s=a.data)||void 0===s?void 0:s.enhancedUnitCostRule)})()}loadDataFromStorage(){var a=this;return(0,r.Z)(function*(){const n=(yield a.storage.get("units"))||[],e=(yield a.storage.get("warbands"))||[],s=(yield a.storage.get("enhancedUnitCostRule"))||!1;a.data={units:n,warbands:e,enhancedUnitCostRule:s}})()}}return f.\u0275fac=function(a){return new(a||f)(d.LFG(u.m),d.LFG(y.K))},f.\u0275prov=d.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"}),f})()},9547:(T,v,l)=>{l.d(v,{m:()=>y});var r=l(5861),d=l(1571),u=l(7151);let y=(()=>{class g{constructor(t){this.loading=t}showPromiseLoader(t,a){var n=this;return(0,r.Z)(function*(){const e=yield n.loading.create({message:a||"Please wait..."});yield e.present();try{return yield t}finally{yield e.dismiss()}})()}}return g.\u0275fac=function(t){return new(t||g)(d.LFG(u.HT))},g.\u0275prov=d.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"}),g})()},2218:(T,v,l)=>{l.d(v,{_:()=>f});var r=l(5861),d=l(1571),u=l(3442),y=l(2468),g=l(9547);let f=(()=>{class t{constructor(n,e){this.data=n,this.gui=e,this.changes=new d.vpe,this.warbands=[],this.enhancedUnitCostRule=!1,this.unitDraft=null,this.gui.showPromiseLoader(this.initialize(),"Initializing Unit Service...")}initialize(){var n=this;return(0,r.Z)(function*(){n.warbands=n.data.warbands||[],n.enhancedUnitCostRule=n.data.enhancedUnitCostRule||!1})()}get units(){return this.data.units}calcUnitCost(n){let e=u.k[n.rank];const s=n.edges.length;let w=0;for(let b=0;b<s;b++){const E=n.edges[b];E.cost>0&&(w++,this.enhancedUnitCostRule&&w>3&&(e+=10*(w-3))),e+=E.cost}return e}calcWarbandCost(n){let e=0;for(let s of n.units)e+=this.calcUnitCost(s.unit)*s.count;return e}getRankCost(n){return u.k[n.rank]}setEnhancedUnitCostRule(n){var e=this;return(0,r.Z)(function*(){e.enhancedUnitCostRule=n,yield e.data.setEnhancedUnitCostRule(n),e.changes.emit()})()}getEnhancedUnitCostRule(){var n=this;return(0,r.Z)(function*(){return n.enhancedUnitCostRule=n.data.enhancedUnitCostRule||!1,n.enhancedUnitCostRule})()}exportData(){return JSON.stringify({units:this.data.units,warbands:this.warbands,enhancedUnitCostRule:this.enhancedUnitCostRule},null,2)}importAndMergeData(n){var e=this;return(0,r.Z)(function*(){try{const s=JSON.parse(n),h=e.data.units.concat(s.units);return e.warbands=e.warbands.concat(s.warbands),yield e.data.setUnits(h),yield e.data.setWarbands(e.warbands),e.changes.emit(),!0}catch(s){return console.error("Error importing data:",s),!1}})()}importAndMergeUnitsOnly(n){var e=this;return(0,r.Z)(function*(){try{const s=JSON.parse(n),h=e.data.units.concat(s.units);return yield e.data.setUnits(h),e.changes.emit(),!0}catch(s){return console.error("Error importing data:",s),!1}})()}importAndMergeWarbandsOnly(n){var e=this;return(0,r.Z)(function*(){try{const s=JSON.parse(n);return e.warbands=e.warbands.concat(s.warbands),yield e.data.setWarbands(e.warbands),e.changes.emit(),!0}catch(s){return console.error("Error importing data:",s),!1}})()}importAndOverwriteData(n){var e=this;return(0,r.Z)(function*(){try{const s=JSON.parse(n),h=s.units;return e.warbands=s.warbands,e.enhancedUnitCostRule=s.enhancedUnitCostRule,yield e.data.setUnits(h),yield e.data.setWarbands(e.warbands),yield e.data.setEnhancedUnitCostRule(e.enhancedUnitCostRule),e.changes.emit(),!0}catch(s){return console.error("Error importing data:",s),!1}})()}generateID(){return Math.random().toString(36).substring(2,9)}addUnit(n){var e=this;return(0,r.Z)(function*(){const s=e.data.units.concat(n);yield e.data.setUnits(s),e.changes.emit()})()}purgeUnit(n){var e=this;return(0,r.Z)(function*(){const s=e.data.units.filter(h=>h.id!==n.id);e.warbands=e.warbands.map(h=>(h.units=h.units.filter(w=>w.unit.id!==n.id),h)),yield e.data.setUnits(s),yield e.data.setWarbands(e.warbands)})()}deleteUnit(n){var e=this;return(0,r.Z)(function*(){const s=e.data.units.filter(h=>h.id!==n.id);yield e.data.setUnits(s)})()}clearUnits(){var n=this;return(0,r.Z)(function*(){yield n.data.clearUnits(),n.changes.emit()})()}updateUnit(n){var e=this;return(0,r.Z)(function*(){e.data.updateUnit(n)})()}getUnitById(n){return this.data.getUnitById(n)}addWarband(n){var e=this;return(0,r.Z)(function*(){e.warbands.push(n),yield e.data.setWarbands(e.warbands)})()}getWarbands(){return this.warbands}createWarband(n){var e=this;return(0,r.Z)(function*(){const s={id:Date.now().toString(),...n};e.warbands.push(s),yield e.data.setWarbands(e.warbands)})()}updateWarband(n){var e=this;return(0,r.Z)(function*(){const s=e.warbands.findIndex(h=>h.id===n.id);s>-1&&(e.warbands[s]=n,yield e.data.setWarbands(e.warbands))})()}getWarbandById(n){const e=this.warbands.find(s=>s.id===n);return e?{...e}:null}removeWarband(n){var e=this;return(0,r.Z)(function*(){e.warbands=e.warbands.filter(s=>s!==n),yield e.data.setWarbands(e.warbands)})()}clearWarbands(){var n=this;return(0,r.Z)(function*(){yield n.data.clearWarbands(),n.warbands=[],n.changes.emit()})()}}return t.\u0275fac=function(n){return new(n||t)(d.LFG(y.D),d.LFG(g.m))},t.\u0275prov=d.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},5891:(T,v,l)=>{l.r(v),l.d(v,{UnitEditorPage:()=>Z});var r=l(5861),d=l(7151),u=l(433);const y=[{name:"Armored",description:"Whenever this unit takes a hit roll one die, on a 4+ it is ignored (doesn\u2019t stack with cover terrain).",cost:15},{name:"Camouflaged",description:"This unit always counts as being in cover terrain.",cost:5},{name:"Tough I",description:"This model only rolls on the wounds table after accumulating 2 wounds and is only killed on a 7+.",cost:15},{name:"Tough II",description:"This model only rolls on the wounds table after accumulating 3 wounds and is only killed on an 8+.",cost:30},{name:"Fearless",description:"This unit may re-roll failed morale tests unless it is Stunned.",cost:10},{name:"Regeneration",description:"Whenever this unit would be killed roll one die, on a 4+ it is Stunned instead.",cost:20},{name:"Unwavering",description:"This unit is not routed by failed morale tests for losing half their army.",cost:5},{name:"Hit & Run",description:"When charging this unit may move back by 3\u201d after attacking, and enemies can\u2019t strike back.",cost:10},{name:"Intimidating",description:"Enemy units without this rule must take a morale test when in melee with it. If failed they must re-roll successful hits.",cost:10},{name:"Frenzy",description:"This unit may re-roll failed hit rolls in melee.",cost:5},{name:"Impact",description:"This unit gains one additional attack roll in melee when charging.",cost:5},{name:"Counter-Attack",description:"Enemies attacking this unit in melee that roll a 1 immediately take one hit themselves.",cost:5},{name:"Shooter I",description:'This unit may shoot with a range of 9".',cost:5},{name:"Shooter II",description:'This unit may shoot with a range of 18".',cost:10},{name:"Shooter III",description:'This unit may shoot with a range of 27".',cost:15},{name:"Deadly",description:"Whenever this unit rolls a 6 to hit it deals one automatic wound (can\u2019t be ignored by the armored rule).",cost:10},{name:"Fire/Poison",description:"When dealing wounds to an enemy add +1 to the wound roll.",cost:10},{name:"Freeze",description:"When dealing hits to an enemy roll one die, on a 4+ it may not move during its next activation.",cost:5},{name:"Powerful I",description:"This unit rolls 2 dice instead of 1 when attacking.",cost:10},{name:"Powerful II",description:"This unit rolls 3 dice instead of 1 when attacking.",cost:20},{name:"Indirect",description:"This unit may shoot through obstructions when any friendly unit has direct line of sight to the target (requires Shooter).",cost:5},{name:"Sniper",description:"When shooting, this unit ignores cover terrain effects (requires Shooter).",cost:5},{name:"Pinning",description:"Select a target and roll one die, on a 4+ the target and any units within 3\u201d each take a morale test. If failed, they must remain idle the next activation (requires Shooter).",cost:10},{name:"Leader",description:"When this unit is activated roll 3 dice, for each 4+ one friendly unit within 6\u201d may take one action.",cost:30},{name:"Death Blow",description:"If this unit is killed all units within 3\u201d take one automatic hit.",cost:5},{name:"Healer",description:"Whenever a friendly unit within 3\u201d would be killed roll one die, on a 4+ it is Stunned instead.",cost:10},{name:"Hero",description:'Friendly units within 12" of this unit may use its rank for morale tests unless it is Stunned.',cost:5},{name:"Large",description:"This unit may re-roll failed hits in melee against non-large units. Enemies may re-roll hits when shooting at it.",cost:0},{name:"Small",description:"This unit must re-roll hits in melee against non-small units. Enemies must re-roll hits when shooting at it.",cost:0},{name:"Fast",description:"This unit moves +2\u201d on advance and +4\u201d on rush/charge actions.",cost:5},{name:"Slow",description:"This unit moves -2\u201d on advance and -4\u201d on rush/charge actions.",cost:-5},{name:"Stealthy",description:"This unit is deployed after all non-stealthy units. Place it anywhere over 9\u201d away from enemy units, and if both players have stealthy units they must roll-off to see who deploys first.",cost:5},{name:"Strider",description:"This unit may move through difficult terrain as if it was open terrain.",cost:5},{name:"Flying",description:"This unit may move through units and obstacles, ignoring terrain effects.",cost:10},{name:"Aquatic",description:"This unit may move through water features as if it was open terrain.",cost:5},{name:"Wizard/Psychic",description:"This unit may cast one power at any time during its activation before attacking. Roll one die, on a 4+ apply one of these effects: \u2022 Fireball: Target enemy unit within 12\u201d takes one hit with Fire. \u2022 Ice Ray: Target enemy unit within 18\u201d takes one hit with Freeze.",cost:15}];var g=l(6895),f=l(3442),t=l(1571),a=l(2218),n=l(9430);const e=["fileInput"];function s(c,_){if(1&c&&(t.TgZ(0,"ion-select-option",15),t._uU(1),t.qZA()),2&c){const i=_.$implicit;t.Q6J("value",i),t.xp6(1),t.AsE(" ",i.value,"+ (",i.cost,"pts) ")}}function h(c,_){if(1&c&&(t.TgZ(0,"div",22)(1,"p"),t._uU(2),t.qZA()()),2&c){const i=t.oxw().$implicit;t.xp6(2),t.Oqu(i.description)}}function w(c,_){1&c&&t._UZ(0,"ion-icon",23)}const b=function(c){return{selected:c}};function E(c,_){if(1&c){const i=t.EpF();t.TgZ(0,"ion-item")(1,"div",18),t.NdJ("click",function(){const p=t.CHM(i).$implicit,U=t.oxw(2);return t.KtG(U.toggleEdgeExpansion(p))}),t.TgZ(2,"div"),t._uU(3),t.qZA(),t.YNc(4,h,3,1,"div",19),t.qZA(),t.TgZ(5,"div",20),t.NdJ("click",function(m){const U=t.CHM(i).$implicit;return t.oxw(2).toggleEdge(U),t.KtG(m.stopPropagation())}),t.YNc(6,w,1,0,"ion-icon",21),t.qZA()()}if(2&c){const i=_.$implicit,o=t.oxw(2);t.xp6(3),t.AsE("",i.name," (",i.cost,"pts)"),t.xp6(1),t.Q6J("ngIf",o.expandedRules.includes(i.name)),t.xp6(1),t.Q6J("ngClass",t.VKq(5,b,o.ruleIsSelected(i))),t.xp6(1),t.Q6J("ngIf",o.ruleIsSelected(i))}}function S(c,_){if(1&c&&(t.TgZ(0,"div",16),t.YNc(1,E,7,7,"ion-item",17),t.qZA()),2&c){const i=t.oxw();t.xp6(1),t.Q6J("ngForOf",i.edges)}}function C(c,_){if(1&c&&(t.TgZ(0,"ion-item")(1,"p"),t._uU(2),t.qZA()()),2&c){const i=t.oxw();t.xp6(2),t.AsE("",i.unitForm.value.name," will cost ",i.totalCost,"pts")}}function I(c,_){if(1&c&&(t.TgZ(0,"ion-item")(1,"p"),t._uU(2),t.qZA()()),2&c){const i=t.oxw();t.xp6(2),t.AsE("",i.unitForm.value.name,"'s number of edges is ",i.unitForm.value.edges.length,"! The maximum is typically 3 by the standard rules. You can still create it, but it may not be allowed at some games.")}}let Z=(()=>{class c{constructor(i,o,m){this.navCtrl=i,this.unitService=o,this.route=m,this.paramID=null,this.rankOptions=[],this.edges=y,this.edgesSelected=[],this.expandedRules=[],this.showRules=!1,this.editing=!1;for(let p in f.k)this.rankOptions.push({value:parseInt(p),cost:f.k[p]});this.unitForm=new u.cw({name:new u.NI("",u.kI.required),rank:new u.NI("",u.kI.required),edges:new u.NI([]),image:new u.NI("")})}ngOnInit(){var i=this;return(0,r.Z)(function*(){if(i.paramID=i.route.snapshot.queryParamMap.get("unitId"),i.paramID){i.editing=!0;const o=i.unitService.getUnitById(i.paramID);o&&(i.unitForm.patchValue({name:o.name,rank:i.rankOptions.find(m=>m.value===o.rank),edges:o.edges,image:o.image}),i.edgesSelected=o.edges)}})()}get unit(){const i=this.unitForm.value;return{id:this.editing?this.paramID:Math.random().toString(36).substring(2,9),name:i.name,rank:i.rank.value,edges:i.edges,image:i.image}}get totalCost(){return this.unitService.calcUnitCost(this.unit)}onSubmit(){var i=this;return(0,r.Z)(function*(){i.editing?yield i.unitService.updateUnit(i.unit):yield i.unitService.addUnit(i.unit),i.navCtrl.navigateBack("/units")})()}toggleEdgeExpansion(i){this.expandedRules.includes(i.name)?this.expandedRules=this.expandedRules.filter(o=>o!==i.name):this.expandedRules.push(i.name)}toggleShowRules(){this.showRules=!this.showRules}toggleEdge(i){this.ruleIsSelected(i)?this.removeEdge(i):this.addEdge(i)}addEdge(i){const o=this.edgesSelected.find(m=>m.name===i.name);o?(this.removeEdge(o),this.addEdge(i)):(this.edgesSelected.push(i),this.unitForm.controls.edges.setValue(this.edgesSelected))}removeEdge(i){this.edgesSelected=this.edgesSelected.filter(o=>o.name!==i.name),this.unitForm.controls.edges.setValue(this.edgesSelected)}ruleIsSelected(i){return this.edgesSelected.some(o=>o.name===i.name)}onFileChange(i){const o=i.target.files[0];if(!o)return;const m=new FileReader;m.onload=()=>{this.unitForm.controls.image.setValue(m.result)},m.readAsDataURL(o)}}return c.\u0275fac=function(i){return new(i||c)(t.Y36(d.SH),t.Y36(a._),t.Y36(n.gz))},c.\u0275cmp=t.Xpm({type:c,selectors:[["app-unit-editor"]],viewQuery:function(i,o){if(1&i&&t.Gf(e,5),2&i){let m;t.iGM(m=t.CRH())&&(o.fileInput=m.first)}},standalone:!0,features:[t.jDz],decls:30,vars:10,consts:[["slot","start"],[3,"formGroup","ngSubmit"],["formControlName","name","label","Unit Name"],["formControlName","rank","label","Rank"],[3,"value",4,"ngFor","ngForOf"],[3,"click"],["id","rules-list",4,"ngIf"],["formControlName","image","type","url","label","Image URL (optional)",2,"overflow","hidden"],["slot","end",3,"click"],["type","file","hidden","","accept","image/*",3,"change"],["fileInput",""],[2,"display","flex","justify-content","center"],[2,"max-width","100%","max-height","100px",3,"src"],[4,"ngIf"],["expand","block","type","submit",3,"disabled"],[3,"value"],["id","rules-list"],[4,"ngFor","ngForOf"],[2,"flex","1",3,"click"],["style","margin-left:20px",4,"ngIf"],["slot","end",1,"custom-checkbox",3,"ngClass","click"],["name","checkmark","style","color: white;",4,"ngIf"],[2,"margin-left","20px"],["name","checkmark",2,"color","white"]],template:function(i,o){if(1&i){const m=t.EpF();t.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),t._UZ(3,"ion-back-button"),t.qZA(),t.TgZ(4,"ion-title"),t._uU(5),t.qZA()()(),t.TgZ(6,"ion-content")(7,"form",1),t.NdJ("ngSubmit",function(){return o.onSubmit()}),t.TgZ(8,"ion-list")(9,"ion-item"),t._UZ(10,"ion-input",2),t.qZA(),t.TgZ(11,"ion-item")(12,"ion-select",3),t.YNc(13,s,2,3,"ion-select-option",4),t.qZA()(),t.TgZ(14,"ion-item",5),t.NdJ("click",function(){return o.toggleShowRules()}),t.TgZ(15,"ion-label"),t._uU(16),t.qZA()(),t.YNc(17,S,2,1,"div",6),t.TgZ(18,"ion-item"),t._UZ(19,"ion-input",7),t.TgZ(20,"ion-button",8),t.NdJ("click",function(){t.CHM(m);const U=t.MAs(23);return t.KtG(U.click())}),t._uU(21,"Upload"),t.qZA(),t.TgZ(22,"input",9,10),t.NdJ("change",function(U){return o.onFileChange(U)}),t.qZA()(),t.TgZ(24,"div",11),t._UZ(25,"img",12),t.qZA(),t.YNc(26,C,3,2,"ion-item",13),t.YNc(27,I,3,2,"ion-item",13),t.qZA(),t.TgZ(28,"ion-button",14),t._uU(29),t.qZA()()()}2&i&&(t.xp6(5),t.hij("",o.editing?"Edit":"Create"," Unit"),t.xp6(2),t.Q6J("formGroup",o.unitForm),t.xp6(6),t.Q6J("ngForOf",o.rankOptions),t.xp6(3),t.hij("Edges (click to ",o.showRules?"hide":"show",")"),t.xp6(1),t.Q6J("ngIf",o.showRules),t.xp6(8),t.Q6J("src",o.unitForm.value.image||"assets/default-unit-image.png",t.LSH),t.xp6(1),t.Q6J("ngIf",o.unitForm.value.name&&o.unitForm.value.rank),t.xp6(1),t.Q6J("ngIf",o.unitForm.value.edges.length>3),t.xp6(1),t.Q6J("disabled",o.unitForm.invalid),t.xp6(1),t.hij("",o.editing?"Save":"Create"," Unit"))},dependencies:[d.Pc,d.oU,d.YG,d.Sm,d.W2,d.Gu,d.gu,d.pK,d.Ie,d.Q$,d.q_,d.t9,d.n0,d.wd,d.sr,d.QI,d.j9,d.cs,g.ez,g.mk,g.sg,g.O5,u.UX,u._Y,u.JJ,u.JL,u.sg,u.u],styles:["#rules-list[_ngcontent-%COMP%]{height:50vh;overflow-y:scroll;margin-left:40px}.custom-checkbox[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background-color:#fff;border:2px solid var(--ion-color-primary);transition:background-color .3s}.custom-checkbox.selected[_ngcontent-%COMP%]{background-color:var(--ion-color-primary)}ion-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:center}"]}),c})()}}]);