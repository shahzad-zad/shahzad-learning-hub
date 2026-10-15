'use strict';
const {resources,profile}=window.LEARNING_HUB;
const $=id=>document.getElementById(id);
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const types={notes:'Notes',practice:'Practice',paper:'Test paper',bank:'MCQ bank'};
let type='all';
const subjects=[...new Set(resources.map(r=>r.subject))].sort();
$('subject-filter').innerHTML='<option value="all">All subjects</option>'+subjects.map(s=>`<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
function restore(){
 const params=new URLSearchParams(location.search);
 $('class-filter').value=['9','10','11','12'].includes(params.get('class'))?params.get('class'):'all';
 $('subject-filter').value=subjects.includes(params.get('subject'))?params.get('subject'):'all';
 $('search').value=params.get('q')||'';
 type=Object.hasOwn(types,params.get('type'))?params.get('type'):'all';
 render(false);
}
function render(update=true){
 const grade=$('class-filter').value,subject=$('subject-filter').value,query=$('search').value.trim().toLowerCase();
 const visible=resources.filter(r=>(grade==='all'||String(r.class)===grade)&&(subject==='all'||r.subject===subject)&&(type==='all'||r.type===type)&&(`${r.title} ${r.subject} class ${r.class} chapter ${r.chapter} ${r.description} ${r.detail}`.toLowerCase().includes(query)));
 document.querySelectorAll('[data-type]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.type===type)));
 $('resource-count').textContent=`${visible.length} resource${visible.length===1?'':'s'}${grade==='all'?'':` · Class ${grade}`}`;
 $('resource-list').innerHTML=visible.map(r=>{
   const href=r.type==='practice'?`viewer.html?resource=${encodeURIComponent(r.id)}`:r.url;
   const action=r.type==='paper'?'Download paper ↓':r.type==='notes'?'Read notes ↗':r.type==='practice'?'Open practice ↗':'Open bank ↗';
   return `<article class="resource-card"><div class="resource-meta"><span class="class-badge">Class ${r.class}</span><span>${escapeHtml(r.subject)} · Ch ${r.chapter}</span><span class="resource-kind">${types[r.type]}</span></div><h3>${escapeHtml(r.title)}</h3><p>${escapeHtml(r.description)}</p><div class="resource-bottom"><span>${escapeHtml(r.detail)} · ${escapeHtml(r.format)}</span><a href="${escapeHtml(href)}" ${r.type==='paper'?'download':''}>${action}</a></div></article>`;
 }).join('');
 $('empty-state').hidden=visible.length>0;
 if(update){
   const params=new URLSearchParams();
   if(grade!=='all')params.set('class',grade);
   if(subject!=='all')params.set('subject',subject);
   if(type!=='all')params.set('type',type);
   if(query)params.set('q',$('search').value.trim());
   history.replaceState(null,'',location.pathname+(params.size?'?'+params:'')+location.hash);
 }
}
function clear(){ $('class-filter').value='all';$('subject-filter').value='all';$('search').value='';type='all';render(); }
$('filters').addEventListener('submit',e=>{e.preventDefault();render();});
$('filters').addEventListener('reset',e=>{e.preventDefault();clear();});
$('search').addEventListener('input',()=>render());
for(const id of ['class-filter','subject-filter'])$(id).addEventListener('change',()=>render());
document.querySelectorAll('[data-type]').forEach(b=>b.addEventListener('click',()=>{type=b.dataset.type;render();}));
document.querySelectorAll('[data-class]').forEach(b=>b.addEventListener('click',()=>{
 $('class-filter').value=b.dataset.class;$('subject-filter').value='all';$('search').value='';type='all';
 history.pushState(null,'',location.pathname+'?class='+b.dataset.class+'#library');render(false);$('library').scrollIntoView();$('library-title').focus({preventScroll:true});
}));
$('empty-reset').addEventListener('click',clear);
window.addEventListener('popstate',restore);
$('teacher-bio').textContent=profile.bio;
$('research-list').innerHTML=profile.projects.map(p=>`<article class="research-item"><h4>${escapeHtml(p.title)}</h4><p>${escapeHtml(p.summary)}</p></article>`).join('');
restore();
