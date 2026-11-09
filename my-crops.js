(()=>{"use strict";
const URL=window.AGRINOVA_SUPABASE_URL||"https://iqxfusbouchrapfxonxe.supabase.co",KEY=window.AGRINOVA_SUPABASE_ANON_KEY||"sb_publishable_rdYNi7mVezWsX-8xAX5kfg_zZv8Ftnv";
const AI_ENDPOINT=window.AGRINOVA_AI_INSIGHT_ENDPOINT||window.AI_INSIGHT_ENDPOINT||"",AI_PAGE=window.AGRINOVA_AI_ASSISTANT_PAGE||"ai-assistant.html",BUCKET="crop-checkpoints";
const $=id=>document.getElementById(id),esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const isoToday=()=>{let d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")};
const dateObj=s=>{let [y,m,d]=s.slice(0,10).split("-").map(Number);return new Date(y,m-1,d,12)};
const diff=(a,b)=>Math.floor((dateObj(b)-dateObj(a))/86400000),addDays=(s,n)=>{let d=dateObj(s);d.setDate(d.getDate()+n);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")};
const dateFmt=s=>s?dateObj(s).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"}):"—";
const dayText=n=>n===0?"Today":n<0?`${-n} days overdue`:`${n} days`;
const state={db:null,user:null,profile:null,crops:[],checks:[],sections:[],lang:"en",connected:false};
const toast=(s,err=false)=>{let e=$("cropToast");e.textContent=s;e.className="toast show"+(err?" error":"");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),3500)};
window.closeModal=id=>$(id)?.classList.remove("show");window.openModal=id=>$(id)?.classList.add("show");
const st=(name,start,end,description)=>({name,start,end,duration:end-start,description});
/* Timelines below use the supplied research stage boundaries. Existing crop
   total-cycle values are retained as the initial compatibility baseline.
   Boundaries are proportionally mapped to those original cycle lengths. */
const raw={
"Teff":["field",80,110,[["Initial: sowing, germination, emergence",0,10],["Development: leaf growth, tillering, stem elongation",10,50],["Mid-season: panicle emergence, flowering, grain formation",50,85],["Late: grain filling, ripening, harvest maturity",85,110]]],
"Bread wheat":["field",120,150,[["Initial: sowing, germination, emergence",0,15],["Development: leaf development, tillering, stem elongation",15,45],["Mid-season: booting, heading, flowering, grain filling",45,110],["Late: grain ripening and harvest maturity",110,150]]],
"Durum wheat":["field",110,150,[["Initial: sowing, germination, emergence",0,15],["Development: leaves, tillering, stem elongation",15,45],["Mid-season: booting, heading, flowering, grain filling",45,110],["Late: grain ripening and harvest maturity",110,150]]],
"Maize":["field",120,125,[["Initial: sowing, germination, emergence",0,20],["Development: leaf development, stem growth, tassel development",20,55],["Mid-season: tasseling, silking, pollination, kernel development",55,95],["Late: kernel filling, denting, physiological maturity, drying",95,125]]],
"Sorghum":["field",130,130,[["Initial: sowing, germination, emergence",0,20],["Development: leaf development, tillering, stem elongation",20,55],["Mid-season: booting, heading, flowering, grain formation",55,95],["Late: grain filling, hardening, ripening",95,130]]],
"Food barley":["field",100,150,[["Initial: sowing, germination, emergence",0,15],["Development: leaf development, tillering, stem elongation",15,45],["Mid-season: booting, heading, flowering, grain filling",45,110],["Late: grain ripening and harvest maturity",110,150]]],
"Barley (malt)":["field",110,150,[["Initial: sowing, germination, emergence",0,15],["Development: leaf development, tillering, stem elongation",15,45],["Mid-season: booting, heading, flowering, grain filling",45,110],["Late: grain ripening and harvest maturity",110,150]]],
"Rice (upland)":["field",120,120,[["Initial: sowing, germination, emergence",0,20],["Development: tillering, leaf growth, stem elongation",20,50],["Mid-season: panicle initiation, booting, heading, flowering, grain filling",50,90],["Late: grain ripening and harvest maturity",90,120]]],
"Finger millet":["field",125,130,[["Initial: sowing, germination, emergence",0,15],["Development: leaf development, tillering, stem elongation",15,60],["Mid-season: finger formation, flowering, grain development",60,100],["Late: grain filling, ripening, harvest maturity",100,130]]],
"Potato":["vegetable",110,130,[["Initial: sprouting and emergence",0,30],["Development: leaf and stem growth",30,65],["Mid-season: stolon development, tuber initiation and bulking",65,105],["Late: skin setting, haulm senescence and maturity",105,130]]],
"Arabica coffee":["fruit",240,240,[["Bud development and flowering",0,45],["Fruit set and early berry development",45,90],["Berry expansion and seed development",90,180],["Berry ripening and harvest",180,240]]],
"Avocado":["fruit",330,330,[["Vegetative flush and leaf development",0,60],["Flower-bud development and flowering",60,90],["Fruit set and early fruit development",90,150],["Fruit enlargement and maturation",150,330]]],
"Mango":["fruit",245,245,[["Vegetative flush and shoot maturation",0,60],["Flower-bud development and flowering",60,100],["Fruit set and early fruit development",100,145],["Fruit enlargement and ripening",145,245]]],
"Banana":["fruit",380,380,[["Sucker establishment and leaf development",0,120],["Rapid vegetative growth and pseudostem development",120,240],["Flower emergence and fruit set",240,280],["Bunch development and fruit maturity",280,380]]],
"Papaya":["fruit",325,325,[["Germination and seedling establishment",0,45],["Vegetative growth and leaf development",45,165],["Flowering and fruit set",165,225],["Fruit enlargement and ripening",225,325]]],
"Orange":["fruit",360,360,[["Vegetative flush and leaf development",0,60],["Flower-bud development and flowering",60,90],["Fruit set and early development",90,150],["Fruit enlargement, maturation and ripening",150,360]]],
"Lemon":["fruit",330,330,[["Vegetative flush and leaf development",0,60],["Flowering",60,90],["Fruit set and early development",90,150],["Fruit enlargement and maturation",150,330]]],
"Guava":["fruit",220,220,[["Vegetative flush and shoot development",0,60],["Flower-bud formation and flowering",60,90],["Fruit set and early fruit development",90,130],["Fruit enlargement and ripening",130,220]]],
"Pineapple":["fruit",585,585,[["Establishment and leaf development",0,120],["Vegetative growth and canopy development",120,360],["Flower induction and flowering",360,405],["Fruit development and ripening",405,585]]],
"Tomato":["vegetable",170,170,[["Sowing, germination and seedling establishment",0,25],["Leaf development and branching",25,60],["Flowering, pollination and fruit development",60,130],["Fruit ripening and final harvest",130,170]]],
"Onion":["vegetable",180,180,[["Germination and seedling establishment",0,30],["Leaf production and canopy growth",30,90],["Bulb initiation and bulb enlargement",90,150],["Neck fall, bulb maturation and curing",150,180]]],
"Cabbage":["vegetable",140,140,[["Germination and seedling establishment",0,25],["Leaf production and canopy expansion",25,55],["Head initiation and head enlargement",55,120],["Head maturity and harvest",120,140]]],
"Carrot":["vegetable",150,150,[["Germination and seedling emergence",0,25],["Leaf growth and root establishment",25,60],["Root thickening and storage development",60,130],["Root maturation and harvest",130,150]]],
"Garlic":["vegetable",160,160,[["Clove sprouting and emergence",0,25],["Leaf production and root growth",25,70],["Bulb initiation and clove enlargement",70,130],["Leaf senescence, bulb maturation and curing",130,160]]],
"Hot pepper":["vegetable",190,190,[["Germination and seedling establishment",0,30],["Leaf growth and branching",30,70],["Flowering, fruit set and fruit enlargement",70,150],["Fruit ripening and repeated harvest",150,190]]],
"Cucumber":["vegetable",130,130,[["Germination and emergence",0,25],["Vine and leaf development",25,60],["Flowering, pollination and fruit development",60,110],["Final fruit maturation and harvest",110,130]]],
"Faba bean":["legume",145,145,[["Germination and emergence",0,15],["Leaf and branch development, node formation",15,55],["Flowering, pod setting and seed filling",55,115],["Pod maturation, drying and harvest",115,145]]],
"Chickpea":["legume",145,145,[["Germination and emergence",0,15],["Leaf, branch and node development",15,55],["Flowering, pod formation and seed filling",55,115],["Pod drying and maturity",115,145]]],
"Common bean":["legume",105,105,[["Germination and emergence",0,15],["Trifoliate leaf and branch development",15,45],["Flowering, pod formation and seed filling",45,85],["Pod maturation and harvest",85,105]]],
"Field pea":["legume",120,120,[["Germination and emergence",0,15],["Leaf, tendril and node development",15,50],["Flowering, pod set and seed filling",50,95],["Pod maturation and drying",95,120]]],
"Lentil":["legume",165,165,[["Germination and emergence",0,20],["Leaf, branch and node development",20,55],["Flowering, pod formation and seed filling",55,125],["Pod maturation and harvest",125,165]]],
"Soybean":["legume",150,150,[["Germination and emergence",0,15],["Unifoliate and trifoliate leaves, branching",15,55],["Flowering, pod formation and seed filling",55,120],["Seed maturation and leaf senescence",120,150]]],
"Groundnut":["legume",140,140,[["Germination and emergence",0,15],["Leaf and branch growth; flowering begins",15,50],["Flowering, pegging, pod formation and seed filling",50,120],["Pod maturation and harvest",120,140]]],
"Cowpea":["legume",100,100,[["Germination and emergence",0,10],["Leaf and branch development",10,40],["Flowering, pod formation and seed filling",40,80],["Pod maturation and harvest",80,100]]]
};
const photos={"Maize":"photo-1551754655-cd27e38d2076","Teff":"photo-1500382017468-9049fed747ef","Bread wheat":"photo-1574323347407-f5e1ad6d020b","Durum wheat":"photo-1574323347407-f5e1ad6d020b","Potato":"photo-1518977676601-b53f82aba655","Arabica coffee":"photo-1442512595331-e89e73853f31","Tomato":"photo-1546094096-0df4bcaaa337","Mango":"photo-1553279768-865429fa0078","Banana":"photo-1571771894821-ce9b6c11b08e","Avocado":"photo-1523049673857-eb18f1d7b578"};
const cropDef=name=>{let k=Object.keys(raw).find(x=>x.toLowerCase()===String(name).trim().toLowerCase());if(!k)return{category:"field",total:120,stages:[st("Growth monitoring — research schedule needed",0,120,"No crop-specific schedule is currently loaded. Do not treat this placeholder as a verified agronomic recommendation.")],missing:true};let [category,total,base,arr]=raw[k],factor=total/base;let stages=arr.map(([n,a,b])=>st(n,Math.round(a*factor),Math.round(b*factor),n));stages[0].start=0;for(let i=1;i<stages.length;i++)stages[i].start=stages[i-1].end;stages[stages.length-1].end=total;stages.forEach(x=>x.duration=x.end-x.start);return{category,total,stages,name:k}};
const stageList=c=>c.custom_stages?.length?c.custom_stages:cropDef(c.crop_name).stages;
const timing=c=>{let elapsed=diff(c.planting_date,isoToday()),def=cropDef(c.crop_name),total=Number(c.total_days)||def.total,stages=stageList(c),i=stages.findIndex(s=>elapsed>=s.start&&elapsed<s.end);if(i<0)i=elapsed<0?0:stages.length-1;let harvest=addDays(c.planting_date,total);return{elapsed,total,stages,index:i,stage:stages[i],harvest,remaining:diff(isoToday(),harvest),planned:elapsed<0,harvested:elapsed>=total,progress:Math.max(0,Math.min(100,elapsed/total*100)),missing:def.missing}};
const active=c=>{let t=timing(c);return !t.planned&&!t.harvested&&c.status!=="removed"};
const area=c=>Number(c.area_ha)||0, totalFarm=()=>Number(state.profile?.farm_hectares)||0;
const fmtArea=n=>`${Number(n||0).toFixed(2)} ha`;
const checkpoints=c=>state.checks.filter(x=>x.crop_id===c).sort((a,b)=>new Date(a.created_at)-new Date(b.created_at));
const cpAt=(id,i)=>state.checks.find(x=>x.crop_id===id&&Number(x.stage_index)===i);
const image=c=>c.photo_url||`https://images.unsplash.com/${photos[c.crop_name]||"photo-1500382017468-9049fed747ef"}?w=850&q=80`;
const names=Object.keys(raw);
function notice(s,error=false){let e=$("connectionNotice");e.hidden=!s;e.textContent=s||"";e.classList.toggle("error",error)}
async function connect(){
 if(!window.supabase?.createClient)throw Error("Supabase JS did not load.");
 if(KEY.includes("PASTE_YOUR"))throw Error("Paste your Supabase anon/publishable key into my-crops.js.");
 state.db=window.supabase.createClient(URL,KEY);
 let {data:{session},error}=await state.db.auth.getSession();if(error)throw error;if(!session?.user)throw Error("Sign in to AgriNova first.");state.user=session.user;
 let [p,c,k,l]=await Promise.all([
 state.db.from("farmer_profiles").select("id,full_name,farm_hectares,city,region").eq("id",state.user.id).single(),
 state.db.from("my_crops").select("*").eq("farmer_id",state.user.id).order("created_at",{ascending:false}),
 state.db.from("crop_checkpoints").select("*").eq("farmer_id",state.user.id).order("created_at",{ascending:false}),
 state.db.from("farm_records").select("id,payload").eq("farmer_id",state.user.id).eq("record_type","land_section")]);
 for(let r of [p,c,k,l])if(r.error)throw r.error;state.profile=p.data;state.crops=c.data||[];state.checks=k.data||[];state.sections=(l.data||[]).map(x=>({...x.payload,id:x.id}));state.connected=true;
}
function fields(selected=""){let e=$("cropFieldInput");e.innerHTML=state.sections.length?'<option value="">Select land section</option>'+state.sections.map(s=>`<option value="${esc(s.id)}" ${String(s.id)===String(selected)?"selected":""}>${esc(s.name||"Field")} · ${Number(s.area||0).toFixed(2)} ha</option>`).join(""):'<option value="">Add a land section in My Farm first</option>'}
function stats(){
 let activeC=state.crops.filter(active),up=state.crops.filter(c=>c.status!=="removed"&&c.status!=="harvested").map(c=>timing(c)).filter(t=>t.remaining>=0).sort((a,b)=>a.remaining-b.remaining);
 $("statActiveCrops").textContent=activeC.length;$("statCultivatedArea").textContent=fmtArea(state.crops.filter(c=>c.status!=="removed"&&c.status!=="harvested"&&!timing(c).harvested).reduce((s,c)=>s+area(c),0));
 $("statNearestHarvest").textContent=up.length?dayText(up[0].remaining):"—";$("statLongestHarvest").textContent=up.length?dayText(up[up.length-1].remaining):"—";
 $("cropCount").textContent=state.crops.filter(c=>c.status!=="removed").length;$("notifBadge").textContent=state.checks.filter(c=>c.status!=="reviewed").length;
}
function card(c){
 let t=timing(c),planned=t.planned,done=t.harvested,cp=cpAt(c.id,t.index),status=done?"harvested":planned?"planned":"";
 return `<article class="card" data-open="${esc(c.id)}"><div class="photo"><img src="${esc(image(c))}" alt="${esc(c.crop_name)}" onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=850&q=80'"><span class="badge ${status}">${done?"Harvest date passed":planned?"Planting upcoming":"Growing"}</span></div><div class="cardbody"><div class="cardtop"><div><h3>${esc(c.crop_name)}</h3><div class="variety">${esc(c.variety||c.category)}</div></div><span class="stagepill">${esc(planned?"Not planted":done?"Harvest":t.stage.name)}</span></div><div class="progress"><i style="width:${t.progress}%"></i></div><div class="progressmeta"><span>${Math.round(t.progress)}% cycle</span><span>${Math.max(0,Math.min(t.elapsed,t.total))}/${t.total} DAP</span></div><div class="metas"><div><small>Harvest countdown</small><b>${planned?`Planting in ${dayText(-t.elapsed)}`:done?"Date passed":dayText(t.remaining)}</b></div><div><small>Harvest date</small><b>${dateFmt(t.harvest)}</b></div><div><small>Growing area</small><b>${fmtArea(c.area_ha)}</b></div><div><small>Land section</small><b>${esc(c.field_name||"—")}</b></div></div><div class="cardactions">${!planned&&!done&&!cp?'<span class="stagepill">Checkpoint due</span>':""}<button class="iconbtn" data-edit="${esc(c.id)}" title="Edit"><i class="fa fa-pen"></i></button><button class="iconbtn" data-delete="${esc(c.id)}" title="Remove"><i class="fa fa-trash"></i></button></div></div></article>`;
}
function render(){
 stats();let q=$("globalSearch").value.toLowerCase().trim(),cat=$("categoryFilter").value,st=$("statusFilter").value;
 let list=state.crops.filter(c=>c.status!=="removed").filter(c=>cat==="all"||c.category===cat).filter(c=>!q||`${c.crop_name} ${c.variety||""} ${c.field_name||""}`.toLowerCase().includes(q)).filter(c=>st==="all"||(st==="active"&&active(c))||(st==="planned"&&timing(c).planned)||(st==="harvested"&&timing(c).harvested));
 let g=$("cropsGrid");g.innerHTML=list.length?list.map(card).join(""):'<div class="empty">No crops found. Add your first crop to begin monitoring.</div>';
 g.querySelectorAll("[data-open]").forEach(e=>e.onclick=x=>{if(!x.target.closest("button"))detail(e.dataset.open)});
 g.querySelectorAll("[data-edit]").forEach(e=>e.onclick=x=>{x.stopPropagation();edit(e.dataset.edit)});
 g.querySelectorAll("[data-delete]").forEach(e=>e.onclick=x=>{x.stopPropagation();removeCrop(e.dataset.delete)});
}
function addForm(){ $("cropForm").reset();$("editCropId").value="";$("cropModalTitle").textContent="Add Crop";$("cropPlantingDateInput").value=isoToday();fields();$("fieldWarning").textContent="";window.openModal("cropModal")}
function edit(id){let c=state.crops.find(x=>x.id===id);if(!c)return;$("cropForm").reset();$("editCropId").value=c.id;$("cropNameInput").value=c.crop_name;$("cropCategoryInput").value=c.category;$("cropVarietyInput").value=c.variety||"";$("cropAreaInput").value=c.area_ha;$("cropQuantityInput").value=c.quantity||"";$("cropQuantityUnitInput").value=c.quantity_unit||"kg";$("cropPlantingDateInput").value=c.planting_date;$("cropNotesInput").value=c.notes||"";$("cropModalTitle").textContent="Edit Crop";fields(c.field_id);window.openModal("cropModal")}
async function removeCrop(id){let c=state.crops.find(x=>x.id===id);if(!c||!confirm(`Remove ${c.crop_name} from your crop list?`))return;try{let r=await state.db.from("my_crops").update({status:"removed"}).eq("id",id).eq("farmer_id",state.user.id);if(r.error)throw r.error;await reload();toast("Crop removed.");}catch(e){toast(e.message,true)}}
async function reload(){let [c,k]=await Promise.all([state.db.from("my_crops").select("*").eq("farmer_id",state.user.id).order("created_at",{ascending:false}),state.db.from("crop_checkpoints").select("*").eq("farmer_id",state.user.id).order("created_at",{ascending:false})]);if(c.error)throw c.error;if(k.error)throw k.error;state.crops=c.data||[];state.checks=k.data||[];render()}
async function saveCrop(e){
 e.preventDefault();let id=$("editCropId").value,name=$("cropNameInput").value.trim(),field=$("cropFieldInput").value,sec=state.sections.find(s=>String(s.id)===String(field)),ha=Number($("cropAreaInput").value),date=$("cropPlantingDateInput").value;
 if(!sec)return toast("Choose a land section from My Farm.",true);if(!(ha>0))return toast("Enter a valid area.",true);
 let used=state.crops.filter(c=>c.status!=="removed"&&c.status!=="harvested"&&!timing(c).harvested&&c.field_id===field&&c.id!==id).reduce((n,c)=>n+area(c),0);
 if(used+ha>Number(sec.area||0)+.0001){$("fieldWarning").textContent=`Selected section: ${Number(sec.area||0).toFixed(2)} ha. Other crops use ${used.toFixed(2)} ha.`;return toast("Crop area exceeds the remaining area of this land section.",true)}
 let def=cropDef(name),old=state.crops.find(c=>c.id===id),payload={farmer_id:state.user.id,crop_name:name,category:$("cropCategoryInput").value,scientific_name:null,variety:$("cropVarietyInput").value.trim()||null,field_id:field,field_name:sec.name||"Field",area_ha:ha,quantity:Number($("cropQuantityInput").value)||null,quantity_unit:$("cropQuantityUnitInput").value,planting_date:date,notes:$("cropNotesInput").value.trim()||null,total_days:def.total,status:"active",photo_url:old?.photo_url||null};
 try{let r=id?await state.db.from("my_crops").update(payload).eq("id",id).eq("farmer_id",state.user.id):await state.db.from("my_crops").insert(payload);if(r.error)throw r.error;await reload();window.closeModal("cropModal");toast(id?"Crop updated.":"Crop added.");}catch(x){toast(x.message,true)}
}
function detail(id){
 let c=state.crops.find(x=>x.id===id);if(!c)return;let t=timing(c),cp=checkpoints(id),done=cpAt(id,t.index);
 $("cropDetailTitle").textContent=c.crop_name;
 let timeline=t.stages.map((s,i)=>`<div class="stage ${i===t.index&&!t.planned&&!t.harvested?"current":""}"><span class="dot"></span><div><b>${esc(s.name)}</b><p>${esc(s.description)}</p></div><time>DAP ${s.start}–${s.end}<br>${s.end-s.start} days</time></div>`).join("");
 let gallery=cp.length?`<div class="gallery">${cp.map(x=>`<div><img src="${esc(x.photo_url||"")}" alt="Checkpoint"><small>${esc(x.stage_name)} · ${dateFmt(x.created_at.slice(0,10))}</small></div>`).join("")}</div>`:"<p class='notice'>No checkpoint photographs saved yet.</p>";
 $("cropDetailContent").innerHTML=`<div class="detailhero"><img src="${esc(image(c))}" alt="${esc(c.crop_name)}"><div><h3>${esc(c.crop_name)} · ${esc(c.variety||"")}</h3><p>${esc(c.notes||"No additional notes.")}</p><div class="kpis"><div class="kpi"><b>${esc(t.stage.name)}</b><small>Current stage</small></div><div class="kpi"><b>${t.remaining<0?"Passed":dayText(t.remaining)}</b><small>Harvest countdown</small></div><div class="kpi"><b>${fmtArea(c.area_ha)}</b><small>Growing area</small></div></div></div></div><div class="banner"><div><b>${done?"Checkpoint already saved":"Growth checkpoint"}</b><p>Planted ${dateFmt(c.planting_date)} · estimated harvest ${dateFmt(t.harvest)}</p></div>${!t.planned&&!t.harvested?`<button class="primary" id="checkpointOpen">${done?"Open checkpoint":"Add checkpoint"}</button>`:""}</div><h3>Growth stages</h3><div class="timeline">${timeline}</div><h3>Crop photo library (${cp.length})</h3>${gallery}<div class="actions"><button class="secondary" id="editDetail">Edit crop</button><a class="primary" style="text-decoration:none" href="${esc(AI_PAGE)}?cropId=${encodeURIComponent(c.id)}">Open AI Assistant</a></div>${t.missing?'<p class="notice">This crop has no crop-specific research schedule yet. Its 120-day placeholder is not a verified recommendation.</p>':'<p class="notice">Dates are estimates. Variety, altitude, weather, planting method and management can change actual crop development. Check visible crop conditions before acting.</p>'}`;
 $("checkpointOpen")?.addEventListener("click",()=>openCheckpoint(id,t.index));$("editDetail").onclick=()=>{window.closeModal("cropDetailModal");edit(id)};window.openModal("cropDetailModal");
}
const QUESTIONS=["Do the plants look healthy and evenly developed?","Have you noticed yellowing, spots, wilting, holes or unusual growth?","Is soil moisture adequate for this crop stage?","Have you noticed insects, weeds or signs of disease?","What farming activity did you complete during this stage?"];
function openCheckpoint(id,index){let c=state.crops.find(x=>x.id===id),s=stageList(c)[index];$("checkpointForm").reset();$("checkpointCropId").value=id;$("checkpointStageIndex").value=index;$("checkpointModalTitle").textContent=`${c.crop_name} · ${s.name}`;$("checkpointStageDescription").textContent=s.description;$("checkpointQuestions").innerHTML=QUESTIONS.map((q,i)=>`<div class="question"><p>${i+1}. ${esc(q)}</p><select name="answer${i}" required><option value="">Choose an answer</option><option>Yes</option><option>No</option><option>Not sure</option><option>Not applicable</option></select></div>`).join("");window.openModal("checkpointModal")}
async function checkpointSave(e){
 e.preventDefault();let id=$("checkpointCropId").value,index=Number($("checkpointStageIndex").value),c=state.crops.find(x=>x.id===id),s=stageList(c)[index],file=$("checkpointPhotoInput").files[0];
 if(!file||!["image/jpeg","image/png","image/webp"].includes(file.type))return toast("Use a JPG, PNG, or WebP crop photograph.",true);if(file.size>8*1024*1024)return toast("Image must be smaller than 8 MB.",true);
 try{
 let ext=(file.name.split(".").pop()||"jpg").toLowerCase().replace(/[^a-z0-9]/g,""),path=`${state.user.id}/${id}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
 let up=await state.db.storage.from(BUCKET).upload(path,file,{contentType:file.type});if(up.error)throw up.error;
 let url=state.db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
 let answers=QUESTIONS.map((q,i)=>({question:q,answer:$(`[name="answer${i}"]`).value}));
 let saved=await state.db.from("crop_checkpoints").insert({farmer_id:state.user.id,crop_id:id,stage_index:index,stage_name:s.name,photo_path:path,photo_url:url,answers,notes:$("checkpointNotesInput").value,status:"submitted"}).select().single();if(saved.error)throw saved.error;
 if(AI_ENDPOINT){try{let res=await fetch(AI_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${(await state.db.auth.getSession()).data.session.access_token}`},body:JSON.stringify({crop:c,checkpoint:saved.data})});let data=await res.json();if(!res.ok)throw Error(data.error||"AI request failed");let recommendation=data.recommendation||data.insight||"";if(recommendation)await state.db.from("crop_checkpoints").update({ai_recommendation:recommendation,status:"reviewed"}).eq("id",saved.data.id).eq("farmer_id",state.user.id);}catch(aiErr){console.warn("AI endpoint:",aiErr);}}
 await reload();window.closeModal("checkpointModal");toast("Checkpoint and photo saved to Supabase.");if(confirm("Checkpoint saved. Open AI Assistant for this crop?"))location.href=`${AI_PAGE}?cropId=${encodeURIComponent(id)}&checkpoint=latest&stageIndex=${index}`;
 }catch(x){toast("Checkpoint could not be saved: "+x.message,true)}
}
const translations={
 en:{myCrops:"My Crops",subtitle:"Monitor crop growth, checkpoints, and harvest timelines.",active:"Active Crops",cultivated:"Cultivated Area",longest:"Longest Harvest",nearest:"Nearest Harvest"},
 am:{myCrops:"የእኔ ሰብሎች",subtitle:"የሰብል እድገትን፣ የምርመራ ነጥቦችን እና የመከር ጊዜን ይከታተሉ።",active:"ንቁ ሰብሎች",cultivated:"የታረሰ መሬት",longest:"በጣም የሚዘገይ መከር",nearest:"ቅርብ መከር"},
 ti:{myCrops:"ኣትክልተይ",subtitle:"ዕብየት ሰብልን መዓልቲ ቀውሕን ተኸታተል።",active:"ንጡፋት ሰብልታት",cultivated:"ዝተሓረሰ መሬት",longest:"ዝረሓቐ ቀውሕ",nearest:"ቀረባ ቀውሕ"},
 om:{myCrops:"Midhaan koo",subtitle:"Guddina midhaanii fi yeroo haamaa hordofi.",active:"Midhaan hojii irra jiru",cultivated:"Bal’ina qotame",longest:"Haamaa fagoo",nearest:"Haamaa dhihoo"},
 so:{myCrops:"Dalagyadayda",subtitle:"La soco koritaanka dalagga iyo waqtiga goosashada.",active:"Dalagyada firfircoon",cultivated:"Dhulka la beeray",longest:"Goosashada ugu fog",nearest:"Goosashada ugu dhow"}
};
function language(){let sel=$("languageSelect"),v=localStorage.getItem("agrinova_language")||localStorage.getItem("currentLanguage")||"en";sel.value=translations[v]?v:"en";state.lang=sel.value;function apply(){state.lang=sel.value;document.documentElement.lang=state.lang;document.querySelectorAll("[data-i18n]").forEach(el=>{let k=el.dataset.i18n;el.textContent=(translations[state.lang]||translations.en)[k]||translations.en[k]||k});}sel.onchange=()=>{localStorage.setItem("agrinova_language",sel.value);localStorage.setItem("currentLanguage",sel.value);apply()};apply()}
function bind(){
 $("addCropBtn").onclick=addForm;$("cropForm").onsubmit=saveCrop;$("checkpointForm").onsubmit=checkpointSave;
 ["globalSearch","categoryFilter","statusFilter"].forEach(id=>$(id).addEventListener(id==="globalSearch"?"input":"change",render));
 $("cropNameInput").addEventListener("change",()=>{let d=cropDef($("cropNameInput").value);if(d.category)$("cropCategoryInput").value=d.category});
 $("cropFieldInput").onchange=()=>{let s=state.sections.find(x=>String(x.id)===$("cropFieldInput").value);$("fieldWarning").textContent=s?`Selected land section: ${Number(s.area||0).toFixed(2)} ha.`:""};
 document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>window.closeModal(b.dataset.close));
 document.querySelectorAll(".modal").forEach(m=>m.onclick=e=>{if(e.target===m)window.closeModal(m.id)});
 $("notifButton").onclick=()=>toast(`${state.checks.filter(x=>x.status!=="reviewed").length} checkpoint(s) awaiting review.`);
 language();
}
async function init(){bind();$("cropPlantingDateInput").value=isoToday();$("cropCatalog").innerHTML=names.map(n=>`<option value="${esc(n)}">`).join("");
 notice("Connecting to Supabase…");try{await connect();fields();notice("");render()}catch(e){console.error(e);notice(`Supabase is not connected: ${e.message} Run my-crops-supabase.sql and add your anon/publishable key.`,true);$("cropsGrid").innerHTML='<div class="empty">Saved crops cannot load until Supabase is configured.</div>';fields()}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();