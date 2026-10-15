 'use strict';
const $=id=>document.getElementById(id),resources=window.LEARNING_HUB.resources;
const params=new URLSearchParams(location.search),grade=Number(params.get('class'));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const kinds={notes:'Notes',practice:'Practice',bank:'MCQ banks'};
const items=resources.filter(r=>r.class===grade);
if(![9,10,11,12].includes(grade)){
 $('class-title').textContent='Choose a class';$('class-intro').textContent='Return to the homepage to choose your class.';$('class-search').hidden=true;
}else{
 document.title=`Class ${grade} | Shahzad Learning Hub`;
 $('class-title').textContent=`Class ${grade}`;
 $('class-intro').textContent=grade===9?'Physics · Chapter 2 · Kinematics':grade===10?'Physics · Chapter 2 · Sound':grade===11?'Physics · Chapter 2 · Kinematics':'Physics · Chapter 2 · First Law of Thermodynamics';
 $('search').placeholder=`Search within Class ${grade}…`;$('search').value=params.get('q')||'';
 function render(update=true){
  const query=$('search').value.trim().toLowerCase();
  const filtered=items.filter(r=>`${r.title} ${r.subject} chapter ${r.chapter} ${r.description} ${r.detail}`.toLowerCase().includes(query));
  $('class-sections').innerHTML=Object.entries(kinds).map(([type,label])=>{
   const matches=filtered.filter(r=>r.type===type);if(!matches.length)return '';
   return `<section class="class-resource-section" aria-labelledby="section-${type}"><h2 id="section-${type}">${label}</h2><div class="resource-grid">${matches.map(r=>{
    const href=r.type==='practice'?`viewer.html?resource=${encodeURIComponent(r.id)}`:r.url;
    return `<article class="resource-card"><div class="resource-meta"><span>${esc(r.subject)} · Chapter ${r.chapter}</span></div><h3>${esc(r.title)}</h3><p>${esc(r.description)}</p><div class="resource-bottom"><span>${esc(r.detail)}</span><a href="${esc(href)}">${r.type==='notes'?'Read notes':r.type==='practice'?'Open practice':'Open bank'} ↗</a></div></article>`;
   }).join('')}</div></section>`;
  }).join('');
  $('empty-state').hidden=filtered.length>0;$('resource-count').textContent=`${filtered.length} resource${filtered.length===1?'':'s'}`;
  if(update){const p=new URLSearchParams({class:String(grade)});if(query)p.set('q',$('search').value.trim());history.replaceState(null,'',location.pathname+'?'+p);}
 }
 $('class-search').addEventListener('submit',e=>e.preventDefault());$('search').addEventListener('input',()=>render());
 $('empty-reset').addEventListener('click',()=>{$('search').value='';render();$('search').focus();});
 window.addEventListener('popstate',()=>{$('search').value=new URLSearchParams(location.search).get('q')||'';render(false);});render(false);
}
