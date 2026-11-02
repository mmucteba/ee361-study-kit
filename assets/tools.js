/* EE361 interactive tools (Chapters II-V). Plain JS + canvas; every formula is the one derived in the lessons.
   Tested against the lesson verifier values by site/build/test_site.js. */
(function(){
"use strict";
var $=function(id){return document.getElementById(id)};
var MU0=4*Math.PI*1e-7;
function num(id){var v=parseFloat($(id).value);return isFinite(v)?v:NaN;}
function fmt(x,d){if(!isFinite(x))return '—';var a=Math.abs(x);d=d===undefined?4:d;
  if(a!==0&&(a<1e-3||a>=1e6))return x.toExponential(d-1);return Number(x.toPrecision(d)).toString();}
function setOut(id,v){var el=$(id);if(el)el.textContent=v;}
function interp(xs,ys,x){if(x<=xs[0])return ys[0];for(var i=1;i<xs.length;i++){if(x<=xs[i]){var t=(x-xs[i-1])/(xs[i]-xs[i-1]);return ys[i-1]+t*(ys[i]-ys[i-1]);}}
  var n=xs.length-1,s=(ys[n]-ys[n-1])/(xs[n]-xs[n-1]);return ys[n]+s*(x-xs[n]);}
/* tiny plotting helper */
function plot(cv,series,opt){
  var ctx=cv.getContext('2d'),W=cv.width,H=cv.height,pl=58,pr=14,pt=26,pb=40;ctx.clearRect(0,0,W,H);
  var xs=[],ys=[];series.forEach(function(s){s.x.forEach(function(v){xs.push(v)});s.y.forEach(function(v){if(isFinite(v))ys.push(v)})});
  var x0=opt.xmin!==undefined?opt.xmin:Math.min.apply(null,xs),x1=opt.xmax!==undefined?opt.xmax:Math.max.apply(null,xs);
  var y0=opt.ymin!==undefined?opt.ymin:Math.min.apply(null,ys),y1=opt.ymax!==undefined?opt.ymax:Math.max.apply(null,ys);
  if(y1-y0<1e-12){y1+=1;y0-=1;} var pad=(y1-y0)*0.06; if(opt.ymin===undefined)y0-=pad; if(opt.ymax===undefined)y1+=pad;
  var X=function(v){return pl+(v-x0)/(x1-x0)*(W-pl-pr)},Y=function(v){return H-pb-(v-y0)/(y1-y0)*(H-pt-pb)};
  ctx.strokeStyle='#d5dbe3';ctx.lineWidth=1;ctx.font='12px sans-serif';ctx.fillStyle='#555';
  for(var k=0;k<=5;k++){var yv=y0+k*(y1-y0)/5,xv=x0+k*(x1-x0)/5;ctx.beginPath();ctx.moveTo(pl,Y(yv));ctx.lineTo(W-pr,Y(yv));ctx.stroke();
    ctx.fillText(fmt(yv,3),4,Y(yv)+4);ctx.fillText(fmt(xv,3),X(xv)-12,H-pb+16);}
  if(y0<0&&y1>0){ctx.strokeStyle='#999';ctx.beginPath();ctx.moveTo(pl,Y(0));ctx.lineTo(W-pr,Y(0));ctx.stroke();}
  ctx.fillStyle='#333';ctx.fillText(opt.xlabel||'',W/2-40,H-6);ctx.fillText(opt.ylabel||'',4,14);
  series.forEach(function(s){ctx.strokeStyle=s.color||'#0e7085';ctx.lineWidth=s.w||2;ctx.setLineDash(s.dash||[]);ctx.beginPath();var st=false;
    for(var i=0;i<s.x.length;i++){if(!isFinite(s.y[i])){st=false;continue;}var px=X(s.x[i]),py=Y(Math.max(Math.min(s.y[i],y1+(y1-y0)),y0-(y1-y0)));if(!st){ctx.moveTo(px,py);st=true}else ctx.lineTo(px,py);}ctx.stroke();ctx.setLineDash([]);
    if(s.pt){ctx.fillStyle=s.color||'#c0392b';ctx.beginPath();ctx.arc(X(s.pt[0]),Y(s.pt[1]),5,0,2*Math.PI);ctx.fill();}
    if(s.label){var j=Math.floor(s.x.length*0.72);while(j>0&&!isFinite(s.y[j]))j--;ctx.fillStyle=s.color||'#333';ctx.fillText(s.label,X(s.x[j])+6,Y(s.y[j])-8);}});
}

/* ---------------- Tool 1: magnetic circuit with an air gap ---------------- */
var BH={ /* Sen Fig. 1.7 read by eye (assistant/calculations/full-semester/bh_data.py) */
  cast:{H:[0,100,200,300,400,510,600,700,785,800,900,1000],B:[0,0.10,0.20,0.38,0.56,0.80,0.88,0.97,1.08,1.10,1.15,1.20],name:'cast steel'},
  si:{H:[0,25,50,75,100,150,200,300,442.3,600,800,1000],B:[0,0.25,0.55,0.80,0.93,1.02,1.08,1.17,1.225,1.28,1.31,1.33],name:'silicon sheet steel'}};
function Hcore(mat,B,mur){if(mat==='lin')return B/(MU0*mur);var d=BH[mat];return interp(d.B,d.H,B);}
function magnetic(){
  var N=num('m-N'),I=num('m-I'),lc=num('m-lc')/100,A=num('m-A')*1e-4,g=num('m-g')/1000,mat=$('m-mat').value,mur=num('m-mur'),fr=$('m-fr').checked;
  var Ag=fr?Math.pow(Math.sqrt(A)+g,2):A, F=N*I;
  var f=function(B){return Hcore(mat,B,mur)*lc+(B*A/Ag)*g/MU0-F;};
  var lo=0,hi=Math.max(3,MU0*F/Math.max(g,1e-9)*2);if(mat!=='lin'){hi=Math.min(hi,BH[mat].B[BH[mat].B.length-1]*2.5);}
  if(f(hi)<0){hi=10;} for(var k=0;k<200;k++){var m=(lo+hi)/2;if(f(m)>0)hi=m;else lo=m;}
  var B=(lo+hi)/2,Hc=Hcore(mat,B,mur),Phi=B*A,Fc=Hc*lc,Fg=F-Fc,L=N*Phi/I;
  setOut('m-B',fmt(B)+' T');setOut('m-Hc',fmt(Hc)+' A/m');setOut('m-Phi',fmt(Phi*1e3)+' mWb');setOut('m-Fg',fmt(100*Fg/F,3)+' %');setOut('m-L',fmt(L*1e3)+' mH');setOut('m-W',fmt(0.5*N*Phi*I)+' J (linear est.)');
  var warn=(mat!=='lin'&&Hc>BH[mat].H[BH[mat].H.length-1])?'Operating point beyond the tabulated curve (extrapolated): the core is saturated.':'';setOut('m-warn',warn);
  var Hs=[],Bs=[],Ll=[];var Hmax=Math.max(Hc*1.6,mat==='lin'?Hc*2:1000);
  for(var i=0;i<=120;i++){var h=Hmax*i/120;Hs.push(h);Bs.push(mat==='lin'?MU0*mur*h:interp(BH[mat].H,BH[mat].B,h));Ll.push(g>0?MU0*(Ag/A)*(F-h*lc)/g:NaN);}
  plot($('m-cv'),[{x:Hs,y:Bs,color:'#0e7085',label:'core B–H'},{x:Hs,y:Ll,color:'#c0392b',dash:[6,4],label:'load line',pt:[Hc,B]}],{xlabel:'H in core (A/m)',ylabel:'B (T)',ymin:0,ymax:Math.max(B*1.6,0.2),xmin:0});
}

/* ---------------- Tool 2: transformer loading ---------------- */
function cplx(re,im){return{re:re,im:im}}
function transformer(){
  var S=num('t-S'),V2=num('t-V2'),R=num('t-R'),X=num('t-X'),P0=num('t-P0'),frac=num('t-load'),pf=num('t-pf'),lead=$('t-lead').value==='lead';
  var I=frac*S/V2,th=Math.acos(Math.min(Math.max(pf,0),1))*(lead?-1:1);
  var Ire=I*Math.cos(th),Iim=-I*Math.sin(th);
  var V1={re:V2+Ire*R-Iim*X,im:Iim*R+Ire*X},V1m=Math.hypot(V1.re,V1.im),del=Math.atan2(V1.im,V1.re)*180/Math.PI;
  var VR=100*(V1m-V2)/V2,approx=100*I*(R*Math.cos(th)+X*Math.sin(th))/V2;
  var Pout=V2*I*pf,Pcu=I*I*R,eta=Pout/(Pout+Pcu+P0);
  setOut('t-I',fmt(I)+' A');setOut('t-V1',fmt(V1m)+' V ∠'+fmt(del,3)+'°');setOut('t-VR',fmt(VR,3)+' %');setOut('t-VRa',fmt(approx,3)+' %');
  setOut('t-eta',fmt(100*eta,4)+' %');setOut('t-Pcu',fmt(Pcu)+' W');
  var xr=[],e1=[],e2=[],xmax=1.4;var Irated=S/V2;var xopt=Math.sqrt(P0/(Irated*Irated*R));
  for(var i=1;i<=140;i++){var x=xmax*i/140;xr.push(x);var Ii=x*Irated;e1.push(100*V2*Ii*pf/(V2*Ii*pf+Ii*Ii*R+P0));e2.push(100*V2*Ii/(V2*Ii+Ii*Ii*R+P0));}
  setOut('t-xopt',isFinite(xopt)?fmt(xopt,3)+' × rated':'—');
  plot($('t-cv'),[{x:xr,y:e2,color:'#999',dash:[5,4],label:'unity pf'},{x:xr,y:e1,color:'#0e7085',label:'selected pf',pt:[frac,100*eta]}],{xlabel:'load (fraction of rated current)',ylabel:'efficiency (%)',xmin:0,xmax:xmax});
}

/* ---------------- Tool 3: force and torque ---------------- */
function force(){
  var N=num('f-N'),I=num('f-I'),A=num('f-A')*1e-4,x=num('f-x')/1000;
  var B=MU0*N*I/(2*x),F=B*B*(2*A)/(2*MU0),L=N*N*MU0*A/(2*x);
  setOut('f-B',fmt(B)+' T');setOut('f-F',fmt(F)+' N');setOut('f-L',fmt(L*1e3)+' mH');setOut('f-m',fmt(F/9.81)+' kg');
  var xs=[],Fi=[],Fl=[];var lam=L*I;
  for(var k=1;k<=100;k++){var xx=x*0.25+x*1.75*k/100;xs.push(xx*1000);var Bi=MU0*N*I/(2*xx);Fi.push(Bi*Bi*A/MU0);var Lx=N*N*MU0*A/(2*xx);var il=lam/Lx;var Bl=MU0*N*il/(2*xx);Fl.push(Bl*Bl*A/MU0);}
  plot($('f-cv'),[{x:xs,y:Fi,color:'#0e7085',label:'constant i'},{x:xs,y:Fl,color:'#c0392b',dash:[6,4],label:'constant λ',pt:[x*1000,F]}],{xlabel:'gap x (mm)',ylabel:'force (N)',xmin:x*250,ymin:0});
}
function torque(){
  var L0=num('r-L0'),L2=num('r-L2'),I=num('r-I'),mode=$('r-mode').value,del=num('r-del')*Math.PI/180;
  var th=[],T=[];for(var k=0;k<=180;k++){var a=k*Math.PI/180;th.push(k);T.push(-I*I*L2*Math.sin(2*a));}
  var Tmax=I*I*L2,Tavg=mode==='ac'?-0.25*I*I*L2*Math.sin(2*del):-I*I*L2*Math.sin(2*del);
  setOut('r-Tmax',fmt(Tmax)+' N·m');setOut('r-T',fmt(Tavg)+' N·m');
  setOut('r-note',mode==='ac'?'AC current of peak '+fmt(I)+' A, rotor at synchronous speed with load angle δ: T_avg = −¼ I_m² L₂ sin 2δ (Sen Ex. 3.5). At any other speed the average is zero.':'DC current: T(θ) = −I² L₂ sin 2θ; the rotor is pulled to the aligned position θ = 0.');
  plot($('r-cv'),[{x:th,y:T,color:'#0e7085',label:'T(θ) with DC'}],{xlabel:'rotor angle θ (degrees)',ylabel:'torque (N·m)',xmin:0,xmax:180});
}

/* ---------------- Tool 4: separately excited DC machine ---------------- */
function dcmachine(){
  var V=num('d-V'),Ra=num('d-Ra'),K=num('d-K'),TL=num('d-T');
  var Ia=TL/K,w=(V-Ia*Ra)/K,Ea=K*w,n=w*60/(2*Math.PI);
  var Pm=Ea*Ia,Pin=V*Ia,eta=Pin>0&&Pm>0?Pm/Pin:(Pin<0&&Pm<0?Pin/Pm:NaN);
  setOut('d-Ia',fmt(Ia)+' A');setOut('d-n',fmt(n)+' rpm ('+fmt(w)+' rad/s)');setOut('d-Ea',fmt(Ea)+' V');setOut('d-P',fmt(Pm/1e3)+' kW');
  setOut('d-eta',isFinite(eta)?fmt(100*eta,4)+' %':'—');
  var mode=(Ia>=0?(w>=0?'motoring, forward (I)':'braking (plugging / lowering), quadrant IV'):(w>=0?'regenerative braking, forward (II)':'motoring, reverse (III)'));setOut('d-mode',mode);
  var Ts=[],ws=[],w0=[];var Tm=Math.max(Math.abs(TL)*2,1);for(var k=0;k<=100;k++){var t=-Tm+2*Tm*k/100;Ts.push(t);ws.push((V-t/K*Ra)/K*60/(2*Math.PI));}
  plot($('d-cv'),[{x:Ts,y:ws,color:'#0e7085',label:'speed–torque line',pt:[TL,n]}],{xlabel:'electromagnetic torque (N·m)',ylabel:'speed (rpm)'});
  /* starter design */
  var Imax=num('d-Imax'),Imin=num('d-Imin'),steps=[],Rt=V/Imax,Eac=0,guard=0;
  if(Imax>Imin&&Imin>0&&Rt>Ra){steps.push(Rt);Eac=V-Imin*Rt;while((V-Eac)/Ra>Imax+1e-9&&guard<30){Rt=(V-Eac)/Imax;steps.push(Rt);Eac=V-Imin*Rt;guard++;}}
  setOut('d-steps',steps.length?steps.map(function(r){return fmt(r-Ra,3)}).join(' → ')+' Ω external, then 0 (final current '+fmt((V-Eac)/Ra,3)+' A)':'—');
}

/* ---------------- Tool 5: buck / boost converter ---------------- */
function converter(){
  var typ=$('c-type').value,Vin=num('c-Vin'),D=num('c-D'),L=num('c-L')*1e-6,C=num('c-C')*1e-6,R=num('c-R'),fs=num('c-fs')*1e3,T=1/fs;
  var K=2*L/(R*T),mode,Vo,dI,IL,dV,Imin,Imax,tz=null;
  if(typ==='buck'){
    if(K>=1-D){mode='CCM';Vo=D*Vin;dI=Vo*(1-D)*T/L;IL=Vo/R;dV=dI/(8*C*fs);}
    else{mode='DCM';Vo=Vin*2/(1+Math.sqrt(1+4*K/(D*D)));dI=(Vin-Vo)*D*T/L;IL=Vo/R;dV=NaN;tz=D*T+dI*L/Vo;}
  }else{
    var Kc=D*(1-D)*(1-D);
    if(K>=Kc){mode='CCM';Vo=Vin/(1-D);IL=Vo/R/(1-D);dI=Vin*D*T/L;dV=(Vo/R)*D*T/C;}
    else{mode='DCM';Vo=Vin*(1+Math.sqrt(1+4*D*D/K))/2;dI=Vin*D*T/L;IL=NaN;dV=NaN;tz=D*T+dI*L/(Vo-Vin);}
  }
  setOut('c-mode',mode);setOut('c-Vo',fmt(Vo)+' V');setOut('c-dI',fmt(dI)+' A');setOut('c-IL',fmt(IL)+' A');setOut('c-dV',isFinite(dV)?fmt(dV)+' V':'(DCM: see lesson)');
  setOut('c-bound',typ==='buck'?('L_crit = '+fmt((1-D)*R*T/2*1e6)+' µH'):('L_crit = '+fmt(D*(1-D)*(1-D)*R*T/2*1e6)+' µH'));
  /* inductor current waveform over two periods (piecewise linear) */
  var ts=[],is=[];
  for(var k=0;k<=400;k++){var t=2*T*k/400,tp=t%T,i;
    if(mode==='CCM'){var I1=IL-dI/2;i=tp<D*T?I1+dI*tp/(D*T):I1+dI-dI*(tp-D*T)/((1-D)*T);}
    else{var rise=dI/(D*T);i=tp<D*T?rise*tp:Math.max(dI-dI*(tp-D*T)/(tz-D*T),0);}
    ts.push(t*1e6);is.push(i);}
  plot($('c-cv'),[{x:ts,y:is,color:'#0e7085',label:'inductor current'}],{xlabel:'t (µs)',ylabel:'i_L (A)',xmin:0});
}

/* ---------------- Tool 6: diode rectifiers ---------------- */
function rectifier(){
  var typ=$('rc-type').value,load=$('rc-load').value,V=num('rc-V'),f=num('rc-f'),R=num('rc-R'),C=num('rc-C')*1e-6;
  var Npts=24000,th=[],vo=[],w=2*Math.PI*f,i,Vm;
  var three=typ.indexOf('3')===0;Vm=Math.SQRT2*(three?V/Math.sqrt(3):V);
  for(i=0;i<Npts;i++){var a=2*Math.PI*i/Npts;th.push(a);var va=Vm*Math.sin(a),vb=Vm*Math.sin(a-2*Math.PI/3),vc=Vm*Math.sin(a+2*Math.PI/3);
    var v=typ==='1h'?Math.max(va,0):typ==='1b'?Math.abs(va):typ==='3h'?Math.max(va,vb,vc):Math.max(va,vb,vc)-Math.min(va,vb,vc);vo.push(v);}
  var out=vo.slice(),note='';
  if(load==='C'){ /* ideal capacitor filter: v_C = max(rectified, decayed previous) over 4 cycles */
    var dt=1/(f*Npts),dec=Math.exp(-dt/(R*C)),vcap=Math.max.apply(null,vo),hist=[];
    for(var cyc=0;cyc<4;cyc++)for(i=0;i<Npts;i++){vcap=Math.max(vo[i],vcap*dec);if(cyc===3)hist.push(vcap);}
    out=hist; note='Ideal source and diodes; simple estimate V_m/(2fRC) (1-φ bridge) is conservative.';
  }
  var s=0,s2=0;for(i=0;i<Npts;i++){s+=out[i];s2+=out[i]*out[i];}
  var V0=s/Npts,Vr=Math.sqrt(s2/Npts),RF=Math.sqrt(Math.max(Vr*Vr/(V0*V0)-1,0)),pp=Math.max.apply(null,out)-Math.min.apply(null,out);
  var pfMap={'1b':2*Math.SQRT2/Math.PI,'3b':3/Math.PI};
  setOut('rc-V0',fmt(V0)+' V');setOut('rc-Vr',fmt(Vr)+' V');setOut('rc-RF',fmt(RF,3));setOut('rc-pp',fmt(pp)+' V');
  setOut('rc-I0',fmt(V0/R)+' A');
  setOut('rc-pf',load==='L'&&pfMap[typ]?fmt(pfMap[typ],4)+' (ripple-free current)':load==='L'?'supply current has a DC component':'—');
  if(load==='L'&&(typ==='1h'||typ==='3h'))note='Half-wave with a large inductor: add a freewheeling diode (1-φ) — values shown are for the voltage waveform without overlap.';
  if(load==='L'&&typ==='1b')note='Bridge with large L: output voltage = |v_s|, current ≈ constant V0/R, supply current is a ±I0 square wave.';
  setOut('rc-note',note);
  var deg=th.map(function(a){return a*180/Math.PI});
  plot($('rc-cv'),[{x:deg,y:vo,color:'#bbb',w:1,label:''},{x:deg,y:out,color:'#c0392b',label:'v_o'}],{xlabel:'ωt (degrees)',ylabel:'output voltage (V)',xmin:0,xmax:360,ymin:Math.min(0,Math.min.apply(null,out))});
}

var tools=[['magnetic',magnetic],['transformer',transformer],['force',force],['torque',torque],['dcmachine',dcmachine],['converter',converter],['rectifier',rectifier]];
tools.forEach(function(t){var box=$('tool-'+t[0]);if(!box)return;[].forEach.call(box.querySelectorAll('input,select'),function(el){el.addEventListener('input',t[1]);el.addEventListener('change',t[1]);});t[1]();});
window.EE361Tools={magnetic:magnetic,transformer:transformer,force:force,torque:torque,dcmachine:dcmachine,converter:converter,rectifier:rectifier};
})();
