'use strict';
const resource=window.LEARNING_HUB.resources.find(r=>r.id===new URLSearchParams(location.search).get('resource')&&r.type==='practice');
const frame=document.getElementById('chapter-frame'),message=document.getElementById('viewer-message');
if(!resource){message.textContent='This chapter is unavailable. Return to Resources to choose a chapter.';document.querySelector('.viewer-help').hidden=true;}
else{
 document.title=resource.title+" | Shahzad's Learning Hub";
 document.getElementById('viewer-title').textContent=resource.title;
 document.getElementById('viewer-meta').textContent=`CLASS ${resource.class} · ${resource.subject.toUpperCase()} · CHAPTER ${resource.chapter}`;
 document.getElementById('back-library').href=`index.html?class=${resource.class}#library`;
 const direct=document.getElementById('open-separately');direct.href=resource.url;direct.hidden=false;
 frame.title=`Class ${resource.class} ${resource.title}`;frame.hidden=false;
 frame.addEventListener('load',()=>{message.hidden=true;});frame.src=resource.url;
 const fullscreen=document.getElementById('fullscreen');
 if(frame.requestFullscreen){fullscreen.hidden=false;fullscreen.addEventListener('click',async()=>{try{await frame.requestFullscreen();}catch{message.textContent='Fullscreen is unavailable here. Use Open separately.';message.hidden=false;}});}
}
