/* Connects every page of the EE361 kit into one course: combined progress (Chapter I key + full-course key),
   chapter badges in the course menu, course-home progress, and the Chapter I hooks (menu entries in the phone
   selector and a "next chapter" link). Loaded after the page's own script. */
(function(){
"use strict";
var K1='ee361-ch1-learned', K2='ee361-full-learned';
var RANGES={ch2:[10,16],ch3:[17,21],ch4:[22,26],ch5:[27,31]}, TOTAL={ch1:13,ch2:7,ch3:5,ch4:5,ch5:5};
function read(k){try{var r=localStorage.getItem(k);return r?JSON.parse(r):[]}catch(e){return []}}
function counts(){
  var c={ch1:0,ch2:0,ch3:0,ch4:0,ch5:0},a=read(K1),b=read(K2);
  a.forEach(function(id){var m=/^l(\d+)$/.exec(id);if(m&&+m[1]>=1&&+m[1]<=13)c.ch1++;});
  b.forEach(function(id){var m=/^l(\d+)$/.exec(id);if(!m)return;var n=+m[1];for(var k in RANGES)if(n>=RANGES[k][0]&&n<=RANGES[k][1])c[k]++;});
  return {c:c,set1:a,set2:b};
}
function refresh(){
  var r=counts(),c=r.c,tot=0,done=0;
  for(var k in TOTAL){tot+=TOTAL[k];done+=c[k];}
  var bar=document.getElementById('cbar'),txt=document.getElementById('ctext');
  if(bar)bar.style.width=(100*done/tot)+'%';
  if(txt)txt.textContent='Whole course: '+done+' of '+tot+' lessons learned';
  [].forEach.call(document.querySelectorAll('.cnt[data-chap]'),function(el){var k=el.dataset.chap;el.textContent=c[k]+'/'+TOTAL[k];
    var d=el.closest('details');if(d)d.classList.toggle('done',c[k]===TOTAL[k]);});
  [].forEach.call(document.querySelectorAll('[data-chapbar]'),function(el){var k=el.dataset.chapbar;el.style.width=(100*c[k]/TOTAL[k])+'%';});
  [].forEach.call(document.querySelectorAll('[data-chapcount]'),function(el){var k=el.dataset.chapcount;el.textContent=c[k]+' of '+TOTAL[k]+' lessons learned';});
  /* green dots on lesson links in the course menu */
  [].forEach.call(document.querySelectorAll('.coursenav a.sub'),function(a){var h=a.getAttribute('href'),id=h.split('#')[1]||'';if(!/^l\d+$/.test(id))return;
    var page=h.indexOf('.html')>0?h.split('.html')[0]:(window.EE361_PAGE||document.body.dataset.chapter||'');
    var on=page==='ch1'?r.set1.indexOf(id)>=0:r.set2.indexOf(id)>=0;a.classList.toggle('done',on);});
  var ps=document.getElementById('progress-summary');
  if(ps)ps.textContent='Whole course: '+done+' of '+tot+' lessons marked learned — Chapter I '+c.ch1+'/13, II '+c.ch2+'/7, III '+c.ch3+'/5, IV '+c.ch4+'/5, V '+c.ch5+'/5 (stored only in this browser).';
  var cont=document.getElementById('continue');
  if(cont&&done>0){var order=[['ch1',1,13],['ch2',10,16],['ch3',17,21],['ch4',22,26],['ch5',27,31]];
    for(var i=0;i<order.length;i++){var o=order[i],set=o[0]==='ch1'?r.set1:r.set2;
      for(var n=o[1];n<=o[2];n++){if(set.indexOf('l'+n)<0){cont.href=o[0]+'.html#l'+n;cont.textContent='Continue: Chapter '+['I','II','III','IV','V'][i]+', Lesson '+n;return;}}}
    cont.href='tools.html';cont.textContent='All lessons learned — open the tools';}
}
document.addEventListener('click',function(e){if(e.target.closest('.mk'))setTimeout(refresh,0);});
window.addEventListener('storage',refresh);
/* Chapter I hooks */
if(window.EE361_PAGE==='ch1'){
  var sel=document.getElementById('topsel');
  if(sel){var og=document.createElement('optgroup');og.label='Whole course';
    [['index.html','Course home'],['ch2.html','Chapter II · Magnetic circuits'],['ch3.html','Chapter III · Transformers'],['ch4.html','Chapter IV · Electromechanical conversion, DC machines'],
     ['ch5.html','Chapter V · Power electronics'],['tools.html','Interactive tools'],['questions.html','Exam question index'],['reference.html','Formulas and glossary']].forEach(function(x){
      var o=document.createElement('option');o.value='url:'+x[0];o.textContent='→ '+x[1];og.appendChild(o);});
    sel.appendChild(og);
    sel.addEventListener('change',function(e){if(sel.value.indexOf('url:')===0){e.stopImmediatePropagation();location.href=sel.value.slice(4);}},true);}
  var l13=document.querySelector('.page[data-page="l13"]');
  if(l13){var box=document.createElement('div');box.className='nextchap';
    box.innerHTML='<b>End of the Chapter I lessons.</b> Practise with the <a href="#x-index">Chapter I question bank</a>, then continue with <a href="ch2.html">Chapter II: Magnetic circuits →</a>';
    var pg=l13.querySelector('.pager');l13.insertBefore(box,pg||null);}
  var pages=document.querySelectorAll('.page'),last=pages[pages.length-1],pager=last&&last.querySelector('.pager');
  if(pager&&!pager.querySelector('.nx')){var sp=pager.lastElementChild;var a=document.createElement('a');a.className='nx';a.href='ch2.html';
    a.innerHTML='<small>Next chapter</small><span>II · Magnetic circuits</span>';if(sp)pager.replaceChild(a,sp);else pager.appendChild(a);}
}
refresh();
})();
