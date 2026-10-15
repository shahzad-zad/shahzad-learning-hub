'use strict';
const key=new URLSearchParams(location.search).get('id');
const bank=Object.hasOwn(window.MCQ_BANKS,key)?window.MCQ_BANKS[key]:null;
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
if(!bank){document.getElementById('bank-intro').textContent='This bank is unavailable. Return to Resources to choose one.';document.querySelector('.reader-tools').hidden=true;}
else{
 const grade=key==='ix-kinematics'?9:10;
 document.title=`Class ${grade} ${bank.title} MCQ Bank`;
 document.getElementById('bank-title').textContent=bank.title+' MCQ Bank';
 document.getElementById('bank-meta').textContent=`CLASS ${grade} · PHYSICS · CHAPTER 2 · 50 MCQs`;
 document.getElementById('bank-back').href=`index.html?class=${grade}#library`;
 document.getElementById('bank-questions').innerHTML=bank.questions.map(q=>`<article class="bank-question"><p class="eyebrow">${escapeHtml(q.difficulty)} · ${escapeHtml(q.topic)}</p><h2>${q.number}. ${escapeHtml(q.prompt)}</h2><ol class="bank-options">${q.options.map((o,i)=>`<li>${'ABCD'[i]}) ${escapeHtml(o)}</li>`).join('')}</ol><details><summary>Reveal answer and explanation</summary><div class="solution"><strong>${'ABCD'[q.correct]}) ${escapeHtml(q.answer)}</strong><p>${escapeHtml(q.solution)}</p></div></details></article>`).join('');
}
