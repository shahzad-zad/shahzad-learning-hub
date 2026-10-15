'use strict';
const $=id=>document.getElementById(id),params=new URLSearchParams(location.search),grade=Number(params.get('class'));
const chapter=Number(params.get('chapter')||2),mode=params.get('mode')==='mcqs'?'mcqs':'cards',data=window.STUDY_DATA[grade];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
if(!data||chapter!==2){$('study-title').textContent='Chapter unavailable';document.querySelector('.study-settings').hidden=true;document.querySelector('.study-controls').hidden=true;}
else{
 const all=data[mode],storageKey=`shahzad-study-${grade}-${mode}-v1`;
 let items=[...all],index=0,responses={},flips={};
 document.title=`Class ${grade} ${data.title} ${mode==='cards'?'Cards':'MCQs'} | Shahzad’s Learning Hub`;
 $('study-title').textContent=mode==='cards'?'Cards':'MCQs';$('study-meta').textContent=`Class ${grade} · Chapter 2 · ${data.title}`;
 $('study-back').href=`chapter.html?class=${grade}&chapter=2&subject=Physics`;
 $('study-topic').innerHTML='<option value="all">All topics</option>'+data.topics.map(t=>`<option value="${esc(t.id)}">${esc(t.name)}</option>`).join('');
 const topicName=id=>data.topics.find(t=>t.id===id)?.name||id;
 function save(){try{localStorage.setItem(storageKey,JSON.stringify({index,ids:items.map(q=>q.id),responses,flips,topic:$('study-topic').value,shuffle:$('study-shuffle').checked}));}catch{}}
 try{const previous=JSON.parse(localStorage.getItem(storageKey));if(previous&&Array.isArray(previous.ids)&&previous.ids.length&&new Set(previous.ids).size===previous.ids.length&&previous.ids.every(id=>all.some(q=>q.id===id))&&Number.isInteger(previous.index)&&previous.index>=0&&previous.index<previous.ids.length){items=previous.ids.map(id=>all.find(q=>q.id===id));index=previous.index;responses=previous.responses||{};flips=previous.flips||{};$('study-topic').value=data.topics.some(t=>t.id===previous.topic)?previous.topic:'all';$('study-shuffle').checked=Boolean(previous.shuffle);}}catch{}
 function feedback(q,selected,animate=false){
  const correct=selected===q.correct,f=$('study-feedback');f.hidden=false;f.className='study-feedback '+(correct?'correct':'incorrect')+(animate?' animate':'');
  f.innerHTML=`<strong>${correct?'Correct':'Not quite'}</strong><p><strong>${'ABCD'[q.correct]}) ${esc(q.answer)}</strong></p><p>${esc(q.explanation)}</p>`;
  document.querySelectorAll('.study-option').forEach((b,i)=>{b.disabled=true;b.setAttribute('aria-pressed',String(i===selected));if(i===q.correct)b.classList.add('right-answer');if(i===selected&&!correct)b.classList.add('wrong-answer');});
 }
 function render(){
  const q=items[index];$('study-position').textContent=`${index+1} of ${items.length} · ${topicName(q.topic)}`;$('study-progress').max=items.length;$('study-progress').value=index+1;$('study-previous').disabled=index===0;$('study-feedback').hidden=true;
  if(mode==='cards'){
   $('study-question').style.setProperty('--card-accent',['#6ee7b7','#8cb8ff','#f5d782','#c4b5fd'][index%4]);
   $('study-question').innerHTML=`<button id="study-card" class="study-flip${flips[q.id]?' is-flipped':''}" aria-label="${esc(flips[q.id]?'Answer: '+q.answer+'. '+q.explanation:q.prompt+'. Tap to reveal the answer')}"><span class="study-flip-inner"><span class="study-face study-front"><span class="study-card-prompt">${esc(q.prompt)}</span><small>Tap or click to flip</small></span><span class="study-face study-back"><strong>${esc(q.answer)}</strong><span>${esc(q.explanation)}</span><small>Tap or click to flip back</small></span></span></button>`;
   $('study-card').addEventListener('click',()=>{flips[q.id]=!flips[q.id];$('study-card').classList.toggle('is-flipped',Boolean(flips[q.id]));$('study-card').setAttribute('aria-label',flips[q.id]?'Answer: '+q.answer+'. '+q.explanation:q.prompt+'. Tap to reveal the answer');save();});
  }else{
   $('study-question').innerHTML=`<article class="study-mcq"><h2>${esc(q.prompt)}</h2><div class="study-options" role="group" aria-label="Answer choices">${q.options.map((o,i)=>`<button class="study-option" aria-pressed="false"><span>${'ABCD'[i]}</span>${esc(o)}</button>`).join('')}</div></article>`;
   document.querySelectorAll('.study-option').forEach((b,i)=>b.addEventListener('click',()=>{responses[q.id]=i;feedback(q,i,true);save();}));
   if(Number.isInteger(responses[q.id])&&responses[q.id]>=0&&responses[q.id]<4)feedback(q,responses[q.id]);
  }
 }
 function filter(){items=all.filter(q=>$('study-topic').value==='all'||q.topic===$('study-topic').value);if($('study-shuffle').checked)for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}index=0;save();render();}
 $('study-topic').addEventListener('change',filter);$('study-shuffle').addEventListener('change',filter);
 $('study-next').addEventListener('click',()=>{index=(index+1)%items.length;save();render();$('study-question').scrollIntoView({block:'start',behavior:'auto'});});
 $('study-previous').addEventListener('click',()=>{if(index>0){index--;save();render();}});render();
}
