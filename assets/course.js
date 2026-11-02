/* EE361 full-course pages: one section visible at a time, hash routing, progress in localStorage.
   Progress key for Chapters II-V: 'ee361-full-learned' (the Chapter I kit keeps its own 'ee361-ch1-learned'). */
(function(){
"use strict";
var $=function(id){return document.getElementById(id)};
var KEY='ee361-full-learned', KEY1='ee361-ch1-learned';
var pages=[].slice.call(document.querySelectorAll('.page'));
var lessonIds=pages.filter(function(p){return p.dataset.lesson}).map(function(p){return p.dataset.page});
var done={}, current=null;
try{var raw=localStorage.getItem(KEY);if(raw)JSON.parse(raw).forEach(function(k){done[k]=1});}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(Object.keys(done)))}catch(e){}}
var railnav=$('railnav'), topsel=$('topsel');
pages.forEach(function(p){var o=document.createElement('option');o.value=p.dataset.page;o.textContent=p.dataset.title;topsel.appendChild(o);});
[].forEach.call(document.querySelectorAll('.coursenav a:not(.sub)'),function(a){
  var o=document.createElement('option');o.value='url:'+a.getAttribute('href');o.textContent='→ '+a.lastChild.textContent;topsel.appendChild(o);});
topsel.addEventListener('change',function(){var v=topsel.value;if(v.indexOf('url:')===0){location.href=v.slice(4);}else go(v);});
pages.forEach(function(p,i){
  var pg=document.createElement('div');pg.className='pager';
  var prev=pages[i-1],next=pages[i+1],isL=!!p.dataset.lesson,h='',B=document.body.dataset;
  var ph=prev?'#'+prev.dataset.page:B.prevHref,pt=prev?prev.dataset.title:B.prevTitle,nh=next?'#'+next.dataset.page:B.nextHref,nt=next?next.dataset.title:B.nextTitle;
  h+=ph?'<a class="pv" href="'+ph+'"><small>'+(prev?'Previous':'Previous chapter')+'</small><span></span></a>':'<span></span>';
  h+=isL?'<button class="btn mk" data-id="'+p.dataset.page+'"></button>':'<span></span>';
  h+=nh?'<a class="nx" href="'+nh+'"><small>'+(next?'Next':'Next in the course')+'</small><span></span></a>':'<span></span>';
  pg.innerHTML=h;
  if(ph)pg.querySelector('.pv span').textContent=pt;
  if(nh)pg.querySelector('.nx span').textContent=nt;
  p.appendChild(pg);
});
function refresh(){
  var n=lessonIds.filter(function(k){return done[k]}).length;
  if($('ptext')&&lessonIds.length){$('ptext').textContent='This chapter: '+n+' of '+lessonIds.length+' lessons';$('toppct').textContent=n+'/'+lessonIds.length;}
  [].forEach.call(railnav.querySelectorAll('a.nav'),function(a){a.classList.toggle('done',!!done[a.dataset.id]);a.classList.toggle('on',a.dataset.id===current)});
  [].forEach.call(document.querySelectorAll('.pager .mk'),function(b){var d=!!done[b.dataset.id];b.textContent=d?'✓ Learned':'Mark as learned';b.classList.toggle('ghost',d)});
}
function go(id,anchor){
  var target=document.querySelector('.page[data-page="'+id+'"]')||pages[0];
  id=target.dataset.page;
  pages.forEach(function(p){p.hidden=p!==target});
  current=id; topsel.value=id; refresh();
  try{if(location.hash.slice(1)!==(anchor||id))history.replaceState(null,'','#'+(anchor||id))}catch(e){}
  if(anchor){var el=$(anchor);if(el){setTimeout(function(){el.scrollIntoView({block:'start'})},0);return;}}
  window.scrollTo(0,0);
}
document.addEventListener('click',function(e){
  var mk=e.target.closest('.pager .mk');
  if(mk){var id=mk.dataset.id;if(done[id])delete done[id];else done[id]=1;save();refresh();return;}
  var a=e.target.closest('a[href^="#"]');
  if(a){var id=a.getAttribute('href').slice(1);
    if(document.querySelector('.page[data-page="'+id+'"]')){e.preventDefault();go(id);return;}
    var el=$(id),pg=el&&el.closest('.page');
    if(pg){e.preventDefault();go(pg.dataset.page,id);}
  }
});
function route(){var h=decodeURIComponent(location.hash.slice(1));
  if(!h){go(pages[0].dataset.page);return;}
  if(document.querySelector('.page[data-page="'+h+'"]')){go(h);return;}
  var el=$(h),pg=el&&el.closest('.page'); go(pg?pg.dataset.page:pages[0].dataset.page,pg?h:null);}
window.addEventListener('hashchange',route);
route();
/* filters (question index, glossary) */
function filterList(inputId,sel){var inp=$(inputId);if(!inp)return;inp.addEventListener('input',function(){var q=inp.value.toLowerCase();
  [].forEach.call(document.querySelectorAll(sel),function(el){el.style.display=el.textContent.toLowerCase().indexOf(q)>=0?'':'none'});});}
filterList('qfilter','.qlist li'); filterList('gfilter','#gloss tr:not(:first-child)');
})();
