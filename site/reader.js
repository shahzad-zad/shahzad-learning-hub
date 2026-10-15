'use strict';
const panels=()=>document.querySelectorAll('.note-block, .bank-question details');
document.querySelector('[data-expand]')?.addEventListener('click',()=>panels().forEach(p=>p.open=true));
document.querySelector('[data-collapse]')?.addEventListener('click',()=>panels().forEach(p=>p.open=false));
let beforePrint=[];
window.addEventListener('beforeprint',()=>{beforePrint=[...panels()].map(p=>p.open);panels().forEach(p=>p.open=true);});
window.addEventListener('afterprint',()=>panels().forEach((p,i)=>p.open=beforePrint[i]??true));
document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());
