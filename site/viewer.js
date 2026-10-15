'use strict';
const id=new URLSearchParams(location.search).get('resource');
const grade=id==='xi-practice'?11:id==='xii-practice'?12:null;
if(grade)location.replace(`study.html?class=${grade}&chapter=2&mode=cards`);else document.getElementById('viewer-message').textContent='This chapter is unavailable. Return to Classes to choose a chapter.';
