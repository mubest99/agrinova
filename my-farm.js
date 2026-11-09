(() => {
"use strict";
const URL=window.AGRINOVA_SUPABASE_URL||"https://iqxfusbouchrapfxonxe.supabase.co";
const KEY=window.AGRINOVA_SUPABASE_ANON_KEY||"sb_publishable_rdYNi7mVezWsX-8xAX5kfg_zZv8Ftnv";
const T="farm_records", $=id=>document.getElementById(id);
let db,user,profile={},rows=[],cropAreaTotal=0;
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const toast=(m,err=false)=>{let e=$("farmToast");if(!e){e=document.createElement("div");e.id="farmToast";e.className="toast";document.body.append(e)}e.textContent=m;e.className="toast show"+(err?" error":"");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),3200)};
window.openModal=id=>$(id)?.classList.add("show");window.closeModal=id=>$(id)?.classList.remove("show");
const all=t=>rows.filter(r=>r.record_type===t).map(r=>({...r.payload,id:r.id}));
const first=t=>all(t)[0]||{};
async function load(){
 if(!window.supabase?.createClient)throw Error("Supabase library failed to load.");
 if(KEY.includes("PASTE_YOUR"))throw Error("Add your Supabase anon/publishable key in my-farm.js.");
 db=window.supabase.createClient(URL,KEY);
 const {data:{session},error}=await db.auth.getSession();if(error)throw error;
 if(!session?.user)throw Error("Please sign in to AgriNova before opening My Farm.");
 user=session.user;
 const p=await db.from("farmer_profiles").select("*").eq("id",user.id).single();if(p.error)throw p.error;profile=p.data;
 const r=await db.from(T).select("id,record_type,payload,updated_at").eq("farmer_id",user.id).order("updated_at",{ascending:false});if(r.error)throw r.error;rows=r.data||[];
 // My Crops integration: cultivated hectares come from saved crop records,
 // never from land-section sizes. Ignore removed/harvested crops and cycles
 // whose estimated harvest date has passed.
 const cropResult=await db.from("my_crops").select("area_ha,planting_date,total_days,status").eq("farmer_id",user.id);
 if(cropResult.error)throw cropResult.error;
 const localToday=(()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`})();
 cropAreaTotal=(cropResult.data||[]).filter(c=>{
   if(c.status==="removed"||c.status==="harvested")return false;
   const harvest=new Date(`${c.planting_date}T12:00:00`);
   harvest.setDate(harvest.getDate()+Number(c.total_days||120));
   const harvestISO=`${harvest.getFullYear()}-${String(harvest.getMonth()+1).padStart(2,"0")}-${String(harvest.getDate()).padStart(2,"0")}`;
   return harvestISO>=localToday;
 }).reduce((sum,c)=>sum+(Number(c.area_ha)||0),0);
}
async function save(t,p,id){const row={farmer_id:user.id,record_type:t,payload:p};const r=id?await db.from(T).update(row).eq("id",id).eq("farmer_id",user.id).select().single():await db.from(T).insert(row).select().single();if(r.error)throw r.error;await load();render();return r.data}
async function del(id){if(!confirm("Delete this record?"))return;const r=await db.from(T).delete().eq("id",id).eq("farmer_id",user.id);if(r.error)return toast(r.error.message,true);await load();render();toast("Record deleted.");}
function render(){
 const f=first("farm_profile"),total=Number(profile.farm_hectares||0);
 $("farmNameDisplay").textContent=f.name||`${profile.full_name||"My"} Farm`;
 $("farmLocationDisplay").textContent=[f.city||profile.city,f.region||profile.region].filter(Boolean).join(", ")||"Location not set";
 $("farmAreaDisplay").textContent=total.toFixed(2);$("farmTypeDisplay").textContent=f.type||"Not set";
 $("statTotalArea").textContent=total.toFixed(2)+" ha";
 // Cultivated area is summed from My Crops records.
 $("statCultivated").textContent=cropAreaTotal.toFixed(2)+" ha";
 $("statAvailable").textContent=Math.max(0,total-cropAreaTotal).toFixed(2)+" ha";
 $("statSections").textContent=all("land_section").length;
 renderSections();renderUtilization();renderWater();renderLocation();
 renderList("asset","assetsContainer","No farm assets recorded yet.",["category","quantity","condition"]);
 renderList("infrastructure","infrastructureContainer","No infrastructure recorded yet.",["type","capacity","condition"]);
 renderList("seasonal_plan","seasonalPlanContainer","No seasonal plan created yet.",["crops","allocation","notes"]);
}
function shape(s){if(s==="triangle")return '<div class="plot-shape shape-triangle"></div>';if(s==="trapezoid")return '<div class="plot-shape shape-trapezoid"></div>';if(s==="irregular")return '<div class="plot-shape shape-irregular"></div>';return `<div class="plot-shape ${s==="square"?"shape-square":"shape-rectangle"}"></div>`}
function renderSections(){
 const a=all("land_section"),box=$("landSectionsContainer");
 if(!a.length){box.innerHTML='<div class="empty-state"><i class="fas fa-map"></i><p>No land sections added yet.</p><button class="btn-primary btn-sm" id="firstSectionBtn">+ Add First Land Section</button></div>';$("firstSectionBtn").onclick=()=>openSection();return}
 const maxArea=Math.max(...a.map(s=>Number(s.area)||0),0.01);box.innerHTML='<div class="land-plot-grid">'+a.map(s=>{const scale=Math.max(.55,Math.min(1.12,Math.sqrt((Number(s.area)||0.01)/maxArea)));return `<button class="land-plot-card" data-id="${esc(s.id)}"><div class="plot-stage">${shape(s.shape).replace('<div class="plot-shape','<div style="transform:scale('+scale.toFixed(2)+')" class="plot-shape')}<span class="plot-area">${Number(s.area||0).toFixed(2)} ha</span></div><strong>${esc(s.name)}</strong><small>${esc(s.use||"Unspecified use")}</small></button>`}).join("")+'</div><div class="section-detail" id="sectionDetail">Select a land section to see its details.</div>';
 box.querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>detail(b.dataset.id));
}
function detail(id){const s=all("land_section").find(x=>x.id===id);if(!s)return;$("sectionDetail").innerHTML=`<div class="detail-head"><div><h4>${esc(s.name)}</h4><p>${esc(s.use)} · ${Number(s.area).toFixed(2)} ha</p></div><div class="detail-actions"><button class="btn-secondary btn-sm" id="editSec">Edit</button><button class="btn-danger btn-sm" id="delSec">Delete</button></div></div><div class="detail-grid"><span><b>Shape</b>${esc(s.shape)}</span><span><b>Dimensions</b>${esc([s.length_m&&s.length_m+" m",s.width_m&&s.width_m+" m"].filter(Boolean).join(" × ")||"Not supplied")}</span><span><b>Crop</b>${esc(s.crop||"—")}</span><span><b>Soil / land details</b>${esc(s.soil||"—")}</span><span><b>Notes</b>${esc(s.notes||"—")}</span></div>`;$("editSec").onclick=()=>openSection(s);$("delSec").onclick=()=>del(s.id)}
function renderUtilization(){const a=all("land_section"),tot={};a.forEach(s=>tot[s.use||"Other"]=(tot[s.use||"Other"]||0)+Number(s.area||0));const sum=Object.values(tot).reduce((x,y)=>x+y,0);$("landUtilizationContainer").innerHTML=sum?Object.entries(tot).map(([k,v])=>`<div class="util-row"><div><b>${esc(k)}</b><span>${v.toFixed(2)} ha · ${Math.round(v/sum*100)}%</span></div><div class="util-track"><i style="width:${v/sum*100}%"></i></div></div>`).join(""):'<div class="empty-state"><p>Add land sections to view land utilization.</p></div>'}
function renderWater(){const w=first("water");$("waterContainer").innerHTML=w.source||w.availability?`<div class="info-lines"><p><b>Water source:</b> ${esc(w.source)}</p><p><b>Irrigation:</b> ${esc(w.availability)}</p><p><b>Method:</b> ${esc(w.method)}</p><p><b>Irrigated area:</b> ${esc(w.area||"—")} ha</p><p><b>Notes:</b> ${esc(w.notes||"—")}</p></div>`:'<div class="empty-state"><p>Water and irrigation information not added.</p></div>'}
function renderLocation(){const l=first("farm_location"),city=l.city||profile.city,region=l.region||profile.region;$("locationContainer").innerHTML=city||region||l.lat||l.lng?`<div class="info-lines"><p><b>City:</b> ${esc(city||"—")}</p><p><b>Region:</b> ${esc(region||"—")}</p><p><b>Coordinates:</b> ${esc(l.lat||"—")}, ${esc(l.lng||"—")}</p><p><b>Notes:</b> ${esc(l.notes||"—")}</p></div>`:'<div class="empty-state"><p>Farm location not set.</p></div>'}
function renderList(t,id,empty,fields){const a=all(t);$(id).innerHTML=a.length?a.map(x=>`<div class="land-section-item"><div class="land-section-info"><div class="land-section-name">${esc(x.name||x.season)}</div><div class="land-section-details">${fields.map(f=>x[f]||"").filter(Boolean).map(esc).join(" · ")}</div></div><button class="btn-danger btn-sm" data-delete="${esc(x.id)}"><i class="fas fa-trash"></i></button></div>`).join(""):`<div class="empty-state"><p>${empty}</p></div>`;$(id).querySelectorAll("[data-delete]").forEach(b=>b.onclick=()=>del(b.dataset.delete))}
function openSection(s={}){$("landSectionForm").reset();$("editSectionId").value=s.id||"";$("landSectionModalTitle").textContent=s.id?"Edit Land Section":"Add Land Section";$("sectionNameInput").value=s.name||"";$("sectionAreaInput").value=s.area||"";$("sectionUseInput").value=s.use||"Crop Production";$("sectionCropInput").value=s.crop||"";$("sectionNotesInput").value=s.notes||"";$("sectionShapeInput").value=s.shape||"rectangle";$("sectionLengthInput").value=s.length_m||"";$("sectionWidthInput").value=s.width_m||"";$("sectionSoilInput").value=s.soil||"";openModal("landSectionModal")}
function bindForms(){
 $("farmProfileForm").onsubmit=async e=>{e.preventDefault();try{const p={name:$("farmNameInput").value.trim(),type:$("farmTypeInput").value,description:$("farmDescriptionInput").value.trim(),city:$("farmCityInput").value.trim(),region:$("farmRegionInput").value.trim()},ha=Number($("farmAreaInput").value);const u=await db.from("farmer_profiles").update({farm_hectares:ha,city:p.city,region:p.region}).eq("id",user.id);if(u.error)throw u.error;profile={...profile,farm_hectares:ha,city:p.city,region:p.region};await save("farm_profile",p,first("farm_profile").id);closeModal("farmProfileModal");toast("Farm profile saved.");}catch(x){toast(x.message,true)}};
 $("landSectionForm").onsubmit=async e=>{e.preventDefault();try{const p={name:$("sectionNameInput").value.trim(),area:Number($("sectionAreaInput").value),use:$("sectionUseInput").value,crop:$("sectionCropInput").value,notes:$("sectionNotesInput").value,shape:$("sectionShapeInput").value,length_m:Number($("sectionLengthInput").value)||null,width_m:Number($("sectionWidthInput").value)||null,soil:$("sectionSoilInput").value};await save("land_section",p,$("editSectionId").value||null);closeModal("landSectionModal");toast("Land section saved.");}catch(x){toast(x.message,true)}};
 $("waterForm").onsubmit=async e=>{e.preventDefault();try{await save("water",{source:$("waterSourceInput").value,availability:$("irrigationAvailabilityInput").value,method:$("irrigationMethodInput").value,area:$("irrigatedAreaInput").value,notes:$("waterNotesInput").value},first("water").id);closeModal("waterModal");toast("Water information saved.");}catch(x){toast(x.message,true)}};
 $("locationForm").onsubmit=async e=>{e.preventDefault();try{await save("farm_location",{city:$("locationCityInput").value,region:$("locationRegionInput").value,lat:$("locationLatInput").value,lng:$("locationLngInput").value,notes:$("locationNotesInput").value},first("farm_location").id);closeModal("locationModal");toast("Location saved.");}catch(x){toast(x.message,true)}};
 const forms=[["assetForm","asset",()=>({name:$("assetNameInput").value,category:$("assetCategoryInput").value,quantity:$("assetQuantityInput").value,condition:$("assetConditionInput").value,notes:$("assetNotesInput").value}),"assetModal"],["infrastructureForm","infrastructure",()=>({name:$("infrastructureNameInput").value,type:$("infrastructureTypeInput").value,capacity:$("infrastructureCapacityInput").value,condition:$("infrastructureConditionInput").value,notes:$("infrastructureNotesInput").value}),"infrastructureModal"],["seasonalPlanForm","seasonal_plan",()=>({season:$("seasonNameInput").value,crops:$("seasonCropsInput").value,allocation:$("seasonLandInput").value,notes:$("seasonNotesInput").value}),"seasonalPlanModal"]];
 forms.forEach(([id,t,get,m])=>$(id).onsubmit=async e=>{e.preventDefault();try{await save(t,get());closeModal(m);$(id).reset();toast("Saved successfully.");}catch(x){toast(x.message,true)}});
}
function buttons(){
 $("editFarmProfileBtn2").onclick=()=>{const f=first("farm_profile");$("farmNameInput").value=f.name||"";$("farmTypeInput").value=f.type||"";$("farmDescriptionInput").value=f.description||"";$("farmAreaInput").value=profile.farm_hectares||"";$("farmCityInput").value=f.city||profile.city||"";$("farmRegionInput").value=f.region||profile.region||"";openModal("farmProfileModal")};
 $("addLandSectionBtn").onclick=()=>openSection();
 $("editWaterBtn").onclick=()=>{const w=first("water");$("waterSourceInput").value=w.source||"";$("irrigationAvailabilityInput").value=w.availability||"";$("irrigationMethodInput").value=w.method||"";$("irrigatedAreaInput").value=w.area||"";$("waterNotesInput").value=w.notes||"";openModal("waterModal")};
 $("editLocationBtn").onclick=()=>{const l=first("farm_location");$("locationCityInput").value=l.city||profile.city||"";$("locationRegionInput").value=l.region||profile.region||"";$("locationLatInput").value=l.lat||"";$("locationLngInput").value=l.lng||"";$("locationNotesInput").value=l.notes||"";openModal("locationModal")};
 [["addAssetBtn","assetModal","assetForm"],["addInfrastructureBtn","infrastructureModal","infrastructureForm"],["addSeasonalPlanBtn","seasonalPlanModal","seasonalPlanForm"]].forEach(([b,m,f])=>$(b).onclick=()=>{$(f).reset();openModal(m)});
 document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("show")}));
 $("globalSearch").addEventListener("keydown",e=>{if(e.key==="Enter"){const q=e.target.value.trim().toLowerCase();const n=rows.filter(r=>JSON.stringify(r.payload).toLowerCase().includes(q)).length;toast(q?(n?`${n} matching farm record(s).`:"No matching farm records."):"Enter a search term.")}});
}
function language(){
 const s=$("languageSelect"); if(!s)return;
 const supported=["en","am","ti","om","so"];
 const lang=localStorage.getItem("agrinova_language")||localStorage.getItem("currentLanguage")||"en";
 s.value=supported.includes(lang)?lang:"en";
 const fallback={
  en:{"My Farm":"My Farm","Dashboard Home":"Dashboard Home","Total Farm Area":"Total Farm Area","Cultivated Area":"Cultivated Area","Available Area":"Available Area","Land Sections":"Land Sections","Land Utilization":"Land Utilization","Water & Irrigation":"Water & Irrigation","Farm Location":"Farm Location","Assets & Equipment":"Assets & Equipment","Infrastructure":"Infrastructure","Seasonal Planning":"Seasonal Planning","Edit Profile":"Edit Profile","Add Land Section":"Add Land Section","Save":"Save"},
  am:{"My Farm":"የእኔ እርሻ","Dashboard Home":"የዳሽቦርድ መነሻ","Total Farm Area":"ጠቅላላ የእርሻ ስፋት","Cultivated Area":"የታረሰ መሬት","Available Area":"ያልተጠቀመ መሬት","Land Sections":"የመሬት ክፍሎች","Land Utilization":"የመሬት አጠቃቀም","Water & Irrigation":"ውሃ እና መስኖ","Farm Location":"የእርሻ አካባቢ","Assets & Equipment":"ንብረት እና መሳሪያዎች","Infrastructure":"መሠረተ ልማት","Seasonal Planning":"ወቅታዊ ዕቅድ","Edit Profile":"መገለጫ አርትዕ","Add Land Section":"የመሬት ክፍል ጨምር","Save":"አስቀምጥ"},
  ti:{"My Farm":"እርሻይ","Dashboard Home":"መበገሲ ዳሽቦርድ","Total Farm Area":"ጠቕላላ ስፍሓት እርሻ","Cultivated Area":"ዝተሓረሰ መሬት","Available Area":"ዘይተጠቕመሉ መሬት","Land Sections":"ክፍልታት መሬት","Land Utilization":"ኣጠቓቕማ መሬት","Water & Irrigation":"ማይን መስኖን","Farm Location":"ኣቀማምጣ እርሻ","Assets & Equipment":"ንብረትን መሳርሒታትን","Infrastructure":"ትሕተ ቅርጺ","Seasonal Planning":"ናይ ወቕቲ ትልሚ","Edit Profile":"መግለጺ ኣስተኻኽል","Add Land Section":"ክፍሊ መሬት ወስኽ","Save":"ዓቅብ"},
  om:{"My Farm":"Qonnaan koo","Dashboard Home":"Fuula jalqabaa","Total Farm Area":"Bal’ina waliigalaa qonnaa","Cultivated Area":"Lafa qotame","Available Area":"Lafa jiru","Land Sections":"Kutaa lafa","Land Utilization":"Fayyadama lafaa","Water & Irrigation":"Bishaanii fi jallisii","Farm Location":"Bakka qonnaa","Assets & Equipment":"Qabeenya fi meeshaalee","Infrastructure":"Bu’uuraalee misoomaa","Seasonal Planning":"Karoora yeroo","Edit Profile":"Odeeffannoo fooyyessi","Add Land Section":"Kutaa lafa dabali","Save":"Olkaa’i"},
  so:{"My Farm":"Beertayda","Dashboard Home":"Bogga hore","Total Farm Area":"Wadarta dhulka beerta","Cultivated Area":"Dhulka la beeray","Available Area":"Dhulka bannaan","Land Sections":"Qaybaha dhulka","Land Utilization":"Isticmaalka dhulka","Water & Irrigation":"Biyaha iyo waraabka","Farm Location":"Goobta beerta","Assets & Equipment":"Hantida iyo qalabka","Infrastructure":"Kaabayaasha","Seasonal Planning":"Qorshaha xilliyeed","Edit Profile":"Wax ka beddel xogta","Add Land Section":"Ku dar qayb dhul","Save":"Kaydi"}
 };
 function apply(){
   window.currentLanguage=s.value;document.documentElement.lang=s.value;
   if(typeof window.translatePage==="function"){window.translatePage();return;}
   const dict=fallback[s.value]||fallback.en;
   document.querySelectorAll("h1,h2,h3,h4,.stat-label,.nav-label,.sidebar-nav a,.section-title,.btn-primary,.btn-secondary,label").forEach(el=>{
     if(el.children.length===0){const original=el.dataset.originalText||(el.dataset.originalText=el.textContent.trim());if(dict[original])el.textContent=dict[original];}
     else {const text=el.childNodes.length===1?el.textContent.trim():"";if(text&&dict[text])el.textContent=dict[text];}
   });
 }
 s.onchange=()=>{localStorage.setItem("agrinova_language",s.value);localStorage.setItem("currentLanguage",s.value);apply();};apply();
}
async function init(){
 // Bind UI before connecting to Supabase. A missing key/session must never disable buttons or language selection.
 try{buttons();bindForms();language();}catch(e){console.error("My Farm UI initialization:",e);toast("Some page controls could not initialize: "+e.message,true);}
 try{await load();render();if($("notifBadge"))$("notifBadge").textContent="0";}
 catch(e){console.error("My Farm data connection:",e);toast("My Farm is in offline/unconfigured mode: "+e.message,true);const box=$("landSectionsContainer");if(box)box.innerHTML=`<div class="empty-state"><p>${esc(e.message)}</p><p>Page controls are active, but saving requires a valid Supabase configuration and signed-in account.</p></div>`;}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();