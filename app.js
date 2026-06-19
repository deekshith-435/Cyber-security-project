const bootLines=[
"Initializing Threat Intelligence System...",
"Loading modules...",
"Connecting feeds...",
"Decrypting streams...",
"Access Granted."
];

let i=0;
const boot=document.getElementById("bootText");

function bootSeq(){
if(i<bootLines.length){
boot.innerHTML+=bootLines[i]+"\n";
i++;
setTimeout(bootSeq,600);
}else{
document.getElementById("boot").style.display="none";
document.getElementById("app").classList.remove("hidden");
start();
}
}
bootSeq();

const feed=document.getElementById("feed");
const alerts=document.getElementById("alerts");
const logs=document.getElementById("logs");
const ioc=document.getElementById("ioc");
const cmd=document.getElementById("cmd");
const terminal=document.getElementById("terminalOutput");

function r(min,max){return Math.floor(Math.random()*(max-min)+min);}
function ip(){return `${r(1,255)}.${r(1,255)}.${r(1,255)}.${r(1,255)}`;}

function start(){
setInterval(()=>{ 
let i1=ip();
feed.innerHTML+=`[THREAT] ${i1}<br>`;
ioc.innerHTML+=`IOC ${i1}<br>`;
if(Math.random()>0.6)alerts.innerHTML+=`[ALERT] Suspicious ${i1}<br>`;
},2000);

setInterval(()=>{
logs.innerHTML+=`[LOG] Packet ${ip()}<br>`;
},1500);
}

cmd.addEventListener("keydown",e=>{
if(e.key==="Enter"){
let v=cmd.value;
terminal.innerHTML+=`> ${v}<br>`;

if(v==="scan"){
terminal.innerHTML+="Scanning... ports 22,80,443<br>";
alerts.innerHTML+="[ALERT] Scan detected<br>";
}
else if(v==="clear"){terminal.innerHTML="";}
else if(v.startsWith("track ")){
ioc.innerHTML+=`Tracking ${v.split(" ")[1]}<br>`;
}
else{
terminal.innerHTML+="Unknown command<br>";
}
cmd.value="";
}
});
