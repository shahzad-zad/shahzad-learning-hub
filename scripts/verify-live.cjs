const fs=require('fs'),path=require('path'),crypto=require('crypto');
const site=path.resolve(__dirname,'../site');
const base=process.argv[2]||'https://shahzadgullabbhatti.github.io/';
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const hash=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
const normalise=(buffer,file)=>/\.(html|js|css|json)$/.test(file)?Buffer.from(buffer.toString('utf8').replace(/\r\n/g,'\n')):buffer;
(async()=>{
 const results=await Promise.all(walk(site).map(async file=>{
   const relative=path.relative(site,file).replace(/\\/g,'/');
   const response=await fetch(new URL(relative,base));
   if(!response.ok)throw Error(relative+' returned HTTP '+response.status);
   const remote=Buffer.from(await response.arrayBuffer());
   if(hash(normalise(remote,file))!==hash(normalise(fs.readFileSync(file),file)))throw Error('Content mismatch: '+relative);
   return relative;
 }));
 console.log(`PASS: ${results.length} live files return HTTP 200 and match the reviewed local site, including chapter navigation, portfolio, notes, practice pages and images.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
