(function(){var K="gate_suzana_ok",SALT="sr-suzana-2026",HASH="331924f151f94b1a740e0ed2216d5d19cefcb7e34af4c6450d65a32cb6a1ba85",RESET="1",LK="suzana-gate";
try{if(sessionStorage.getItem(K)==="1")return}catch(e){}
var own=null;try{var o=JSON.parse(localStorage.getItem(LK));if(o&&o.v===RESET)own=o}catch(e){}
var st=document.createElement("style");st.textContent="main{display:none!important}";document.head.appendChild(st);
var d=document.createElement("div");d.style.cssText="position:fixed;left:0;top:0;right:0;bottom:0;background:#FBF6EE;z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;overflow:auto";document.body.appendChild(d);
var mode=own?"own":"prov",tmp="";
function hex(b){return Array.prototype.map.call(new Uint8Array(b),function(x){return("0"+x.toString(16)).slice(-2)}).join("")}
function dk(pw,salt){var e=new TextEncoder();return crypto.subtle.importKey("raw",e.encode(pw),"PBKDF2",false,["deriveBits"]).then(function(k){return crypto.subtle.deriveBits({name:"PBKDF2",salt:e.encode(salt),iterations:150000,hash:"SHA-256"},k,256)}).then(hex)}
function inp(id,ph){return '<input id="'+id+'" type="password" autocomplete="off" placeholder="'+ph+'" style="width:100%;font:inherit;font-size:19px;padding:14px;border:2px solid #E8DAC8;border-radius:14px;margin:0 0 10px">'}
function show(){var t,s,f;
if(mode==="own"){t="Área da Dra. Suzana";s="Digite a sua senha para entrar.";f=inp("g1","Sua senha")}
else if(mode==="prov"){t="Área da Dra. Suzana";s="Digite a senha provisória que você recebeu. Depois você cria a sua própria.";f=inp("g1","Senha provisória")}
else{t="Crie a sua senha";s="Escolha uma senha só sua (mínimo 6 caracteres). Depois disso, ninguém mais entra com a provisória neste aparelho.";f=inp("g1","Nova senha")+inp("g2","Repita a nova senha")}
d.innerHTML='<div style="max-width:360px;width:100%;text-align:center;font:18px/1.55 system-ui,-apple-system,sans-serif;color:#3A2A22"><p style="font:italic 400 28px Georgia,serif;color:#5A3A28;margin:0 0 8px">'+t+'</p><p style="color:#7A6A60;margin:0 0 14px">'+s+'</p>'+f+'<button id="gbt" type="button" style="width:100%;min-height:56px;border:0;border-radius:16px;background:#A9603C;color:#fff;font:600 19px system-ui;cursor:pointer">'+(mode==="novo"?"Salvar e entrar":"Entrar")+'</button><p id="gerr" style="color:#9b3b3b;font-size:16px;margin:10px 0 0"></p>'+(mode==="own"?'<p style="font-size:15px;color:#7A6A60;margin:14px 0 0">Esqueceu? Peça uma senha provisória nova para a Eve.</p>':'')+'</div>';
document.getElementById("gbt").onclick=go;document.getElementById("g1").onkeydown=function(e){if(e.key==="Enter")go()}}
function er(m){document.getElementById("gerr").textContent=m}
function ok(){try{sessionStorage.setItem(K,"1")}catch(e){}st.remove();d.remove()}
function go(){er("");if(!(window.crypto&&crypto.subtle)){er("Abra este endereço no Safari ou no Chrome.");return}var v=document.getElementById("g1").value;
if(mode==="own"){dk(v,own.s).then(function(h){if(h===own.h)ok();else er("Senha incorreta.")});return}
if(mode==="prov"){dk(v,SALT).then(function(h){if(h===HASH){tmp=v;mode="novo";show()}else er("Senha incorreta.")});return}
var v2=document.getElementById("g2").value;if(v.length<6){er("Use pelo menos 6 caracteres.");return}if(v!==v2){er("As senhas não são iguais.");return}if(v===tmp){er("Escolha uma senha diferente da provisória.");return}
var a=new Uint8Array(12);crypto.getRandomValues(a);var s=hex(a);dk(v,s).then(function(h){try{localStorage.setItem(LK,JSON.stringify({v:RESET,s:s,h:h}))}catch(e){}ok()})}
show()})();
