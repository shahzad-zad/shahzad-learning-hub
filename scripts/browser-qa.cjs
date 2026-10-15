const fs=require('fs'),path=require('path'),{spawn}=require('child_process');
const root=path.resolve(__dirname,'..'),out=path.join(root,'tmp/browser-qa');fs.mkdirSync(out,{recursive:true});
const profile=path.join(out,'chrome-'+Date.now());
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{windowsHide:true,stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const base=process.argv[2]||'http://127.0.0.1:8767/';
(async()=>{let ws;const log=[];try{
 const portFile=path.join(profile,'DevToolsActivePort');for(let i=0;i<100&&!fs.existsSync(portFile);i++)await sleep(100);
 const port=fs.readFileSync(portFile,'utf8').split('\n')[0];
 const targets=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
 ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
 let id=0;const pending=new Map(),errors=[];
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text+' '+(m.params.exceptionDetails.exception?.description||''));if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
 const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||'Evaluation failed');return result.result.value;};
 const wait=async expression=>{for(let i=0;i<150;i++){if(await evaluate(expression))return;await sleep(40);}throw Error('Timed out: '+expression);};
 const go=async relative=>{await send('Page.navigate',{url:new URL(relative,base).href});await wait("document.readyState==='complete'");await sleep(120);};
 const assert=async(expression,label)=>{if(!await evaluate(expression))throw Error(label);log.push('PASS: '+label);};
 const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(out,name+'.png'),Buffer.from(r.data,'base64'));};
 await send('Page.enable');await send('Runtime.enable');await send('Emulation.setFocusEmulationEnabled',{enabled:true});
 for(const size of [{name:'laptop',w:1440,h:1000},{name:'tablet',w:768,h:1024},{name:'mobile',w:390,h:844},{name:'small-mobile',w:320,h:900}]){
   await send('Emulation.setDeviceMetricsOverride',{width:size.w,height:size.h,deviceScaleFactor:1,mobile:size.w<800});await go('index.html');
   await assert(`innerWidth===${size.w}&&document.documentElement.scrollWidth<=innerWidth`,size.name+' home fits viewport');
   await assert("document.querySelectorAll('.class-card').length===4&&!document.getElementById('library')&&!document.querySelector('input[type=search]')",size.name+' home has class cards without a global resource library');
   await assert("!/the educators|daharki|start here|YOUR TEACHER/.test(document.body.textContent)",size.name+' removed school branding and teacher caption');
   await assert('[...document.images].every(i=>i.complete&&i.naturalWidth>0)',size.name+' personal logo and header image load');
   await assert("document.querySelector('.teacher-picture-link').getAttribute('href')==='portfolio.html'",size.name+' picture opens separate portfolio');await shot('home-'+size.name);
   await evaluate("document.querySelector('.teacher-picture-link').focus()");await sleep(250);
   await wait("Number(getComputedStyle(document.querySelector('.picture-tooltip')).opacity)>.99");
   await assert("document.activeElement===document.querySelector('.teacher-picture-link')",size.name+' About your teacher tooltip works on keyboard focus');
   for(const grade of [9,10,11,12]){
     await go('class.html?class='+grade);
     await assert(`document.querySelectorAll('.resource-card').length===${grade<11?1:2}&&document.getElementById('class-title').textContent==='Class ${grade}'`,size.name+' class '+grade+' contains only its relevant resources');
     await assert('document.documentElement.scrollWidth<=innerWidth',size.name+' class '+grade+' fits viewport');
     if(grade===11)await shot('class-'+size.name);
   }
 }
 await go('class.html?class=11');
 await evaluate("document.getElementById('search').value='projectiles';document.getElementById('search').dispatchEvent(new Event('input'))");
 await assert("document.querySelectorAll('.resource-card').length===1&&document.body.textContent.includes('Kinematics Notes')",'search is scoped to selected class');
 await evaluate("document.getElementById('search').value='zzzznoresource';document.getElementById('search').dispatchEvent(new Event('input'))");
 await assert("!document.getElementById('empty-state').hidden&&document.querySelectorAll('.resource-card').length===0",'class search empty state');
 await evaluate("document.getElementById('empty-reset').click()");
 await assert("document.querySelectorAll('.resource-card').length===2",'clear search keeps selected class');
 await go('class.html?class=12&q=heat');await assert("document.querySelectorAll('.resource-card').length===1",'bookmarked class search restores');
 await go('class.html?class=invalid');await assert("document.getElementById('class-search').hidden",'invalid class handled');
 await go('portfolio.html');
 await assert("document.querySelectorAll('.portfolio-project').length===9&&document.title.includes('Portfolio')",'separate portfolio contains all 9 original projects');
 await assert('document.documentElement.scrollWidth<=innerWidth','portfolio fits 320px');await shot('portfolio-mobile');
 await evaluate("document.querySelector('.portfolio-project details').open=true");
 await assert("document.querySelector('.portfolio-project details').open",'portfolio project details expand');
 await go('bank.html?id=ix-kinematics');
 await assert("document.querySelectorAll('.bank-question').length===50&&document.querySelectorAll('details[open]').length===0",'Class 9 bank has 50 questions with initially hidden answers');
 await evaluate("document.querySelector('[data-expand]').click()");
 await assert("document.querySelectorAll('details[open]').length===50",'bank reveal all');
 await evaluate("document.querySelector('[data-collapse]').click()");
 await assert("document.querySelectorAll('details[open]').length===0",'bank hide all');
 await assert('document.documentElement.scrollWidth<=innerWidth','Class 9 bank fits 320px');await shot('bank-mobile');
 await go('bank.html?id=x-sound');await assert("document.querySelectorAll('.bank-question').length===50",'Class 10 bank has 50 questions');
 for(const grade of [11,12]){
   const slug=grade===11?'kinematics':'thermodynamics';
   await go(`materials/class-${grade}/${slug}-notes.html`);
   await assert("document.querySelectorAll('.note-block').length===16",`Class ${grade} complete notes`);
   await assert('document.documentElement.scrollWidth<=innerWidth',`Class ${grade} notes fit 320px`);await shot('notes-'+grade+'-mobile');
   await evaluate("document.querySelector('[data-collapse]').click()");await assert("document.querySelectorAll('details[open]').length===0",`Class ${grade} collapse notes`);
   await evaluate("dispatchEvent(new Event('beforeprint'))");await assert("document.querySelectorAll('details[open]').length===16",`Class ${grade} print expands notes`);
   await evaluate("dispatchEvent(new Event('afterprint'))");await assert("document.querySelectorAll('details[open]').length===0",`Class ${grade} restores collapsed state after print`);
   await go(`viewer.html?resource=${grade===11?'xi':'xii'}-practice`);
   await wait("document.getElementById('chapter-frame').contentDocument?.getElementById('home-title')&&document.getElementById('chapter-frame').contentDocument.readyState==='complete'");
   await assert('document.documentElement.scrollWidth<=innerWidth',`Class ${grade} viewer fits 320px`);
   await assert("document.getElementById('chapter-frame').contentDocument.getElementById('logo').naturalWidth>0",`Class ${grade} embedded logo loads`);
   await evaluate("document.getElementById('chapter-frame').contentWindow.document.querySelector('[data-test]').click()");
   await assert("!document.getElementById('chapter-frame').contentDocument.getElementById('formats').hidden",`Class ${grade} embedded Test button works`);
   await evaluate("document.getElementById('chapter-frame').contentDocument.querySelector('[data-mode=\"cards\"]').click()");
   await wait("!!document.getElementById('chapter-frame').contentDocument.getElementById('flip-card')");
   await evaluate("document.getElementById('chapter-frame').contentDocument.getElementById('flip-card').click()");
   await assert("!document.getElementById('chapter-frame').contentDocument.getElementById('next').hidden",`Class ${grade} flipped card keeps Next`);
   await shot('viewer-'+grade+'-mobile');
 }
 await go('viewer.html?resource=invalid');await assert("document.getElementById('chapter-frame').hidden&&document.getElementById('viewer-message').textContent.includes('unavailable')",'invalid viewer ID handled');
 await go('bank.html?id=__proto__');await assert("document.getElementById('bank-intro').textContent.includes('unavailable')",'invalid bank ID handled');
 if(errors.length)throw Error('Browser errors: '+errors.join('\n'));
 log.push('PASS: no JavaScript exceptions');
 fs.writeFileSync(path.join(out,'results.txt'),log.join('\n'));console.log(log.join('\n'));
 await send('Browser.close');
 }finally{if(ws)ws.close();chrome.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
