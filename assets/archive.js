/* past exams page: filters, practice status, question reader */
(function () {
  'use strict';
  var D = window.EE361_ARCHIVE, app = document.getElementById('ax-app');
  if (!D || !app) return;
  var Q = D.questions, L = D.lessons, CH = D.chapters;
  var byId = {}; Q.forEach(function (q) { byId[q.id] = q; });
  var roman = {}; CH.forEach(function (c) { roman[c.id] = c.roman; });
  var STATUS_KEY = 'ee361-archive-status-v1', SET_KEY = 'ee361-archive-set-v1';

  function load(key, fallback) { try { var v = JSON.parse(localStorage.getItem(key) || 'null'); return v || fallback; } catch (e) { return fallback; } }
  function store(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }
  var status = load(STATUS_KEY, {}), mySet = load(SET_KEY, []);
  if (typeof status !== 'object' || Array.isArray(status)) status = {};
  if (!Array.isArray(mySet)) mySet = [];

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function isPractice(q) { return !(q.kind === 'Past exam' || q.kind === 'Solution only'); }
  function lessonShort(key) { var l = L[key]; return l ? 'L' + l.n : key; }
  function hasKit(q) { return q.kit.length > 0; }

  // state from the url so links like archive.html?lesson=ch2:l13 work
  var params = new URLSearchParams(location.search);
  var st = { ch: '', lesson: '', group: 'All', status: 'all', kit: false, query: '', set: false };
  if (roman[params.get('ch')]) st.ch = params.get('ch');
  if (L[params.get('lesson')]) { st.lesson = params.get('lesson'); st.ch = L[st.lesson].chapter; }
  if (params.get('view') === 'set') st.set = true;
  var openId = byId[params.get('q')] ? params.get('q') : '';

  function syncUrl() {
    var p = new URLSearchParams();
    if (st.lesson) p.set('lesson', st.lesson); else if (st.ch) p.set('ch', st.ch);
    if (st.set) p.set('view', 'set');
    if (current) p.set('q', current.id);
    var s = p.toString();
    try { history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + location.hash); } catch (e) {}
  }

  // layout
  var groups = [['All', 'All'], ['Quiz', 'Quiz'], ['MT1', 'MT1'], ['MT2', 'MT2'], ['Final', 'Final'], ['Problems', 'Chapter problems (ODTUClass)'], ['Practice', 'Homework & solved sets']];
  app.innerHTML =
    '<div class="ax-controls" role="search">' +
      '<div class="ax-row"><span class="ax-lab">Chapter</span><span id="ax-ch" class="ax-row"></span></div>' +
      '<div class="ax-row"><span class="ax-lab">Lesson</span><select id="ax-lesson" aria-label="Filter by lesson"></select></div>' +
      '<div class="ax-row"><span class="ax-lab">Paper</span><span id="ax-group" class="ax-row"></span></div>' +
      '<div class="ax-row"><span class="ax-lab">Show</span><span id="ax-status" class="ax-row"></span>' +
        '<label class="ax-toggle"><input type="checkbox" id="ax-kit"> Worked solution in the kit</label></div>' +
      '<div class="ax-row"><input type="search" id="ax-q" placeholder="Search: transformer test, air gap, buck, 2023…" aria-label="Search questions"></div>' +
    '</div>' +
    '<div class="ax-summary"><span id="ax-count" aria-live="polite"></span><span class="ax-progress"><span id="ax-prog"></span>' +
      '<button class="ax-chip" id="ax-setbtn" aria-pressed="false"></button><button class="ax-chip" id="ax-reset">Clear filters</button></span></div>' +
    '<div id="ax-route"></div><div id="ax-out"></div>' +
    '<p class="ax-foot">Sources: the three supplied EE361 archives (56 files) plus this term’s Quiz 1 and last year’s MT1, which are solved in the kit. Supplied solutions are shown as printed and were not re-checked for this page; where a kit lesson solves the same question it explains any wrong key. Archive papers show past question types, not the scope of the 2026 exams. Solved/review marks and your set stay in this browser only.</p>';

  var $ = function (id) { return document.getElementById(id); };

  function chipRow() {
    var counts = {}; CH.forEach(function (c) { counts[c.id] = Q.filter(function (q) { return q.chapters.indexOf(c.id) >= 0; }).length; });
    $('ax-ch').innerHTML = '<button class="ax-chip" data-ch="">All <small>' + Q.length + '</small></button>' +
      CH.map(function (c) { return '<button class="ax-chip" data-ch="' + c.id + '" title="' + esc(c.title) + '">' + c.roman + ' · ' + esc(c.title.replace(/ and DC Machines$/, ' & DC')) + ' <small>' + counts[c.id] + '</small></button>'; }).join('');
    $('ax-group').innerHTML = groups.map(function (g) { return '<button class="ax-chip" data-group="' + g[0] + '">' + g[1] + '</button>'; }).join('');
    $('ax-status').innerHTML = [['all', 'Everything'], ['todo', 'Not solved yet'], ['review', '↻ To review'], ['solved', '✓ Solved']].map(function (s) { return '<button class="ax-chip" data-status="' + s[0] + '">' + s[1] + '</button>'; }).join('');
  }
  function lessonOptions() {
    var html = '<option value="">' + (st.ch ? 'All lessons of Chapter ' + roman[st.ch] : 'All lessons') + '</option>';
    CH.forEach(function (c) {
      if (st.ch && st.ch !== c.id) return;
      html += '<optgroup label="Chapter ' + c.roman + ' · ' + esc(c.title) + '">';
      Object.keys(L).filter(function (k) { return L[k].chapter === c.id; }).forEach(function (k) {
        var n = Q.filter(function (q) { return q.lessons.indexOf(k) >= 0; }).length;
        html += '<option value="' + k + '"' + (n ? '' : ' disabled') + '>L' + L[k].n + ' · ' + esc(L[k].title) + ' (' + n + ')</option>';
      });
      html += '</optgroup>';
    });
    $('ax-lesson').innerHTML = html;
    $('ax-lesson').value = st.lesson;
  }

  function matches(q) {
    if (st.set && mySet.indexOf(q.id) < 0) return false;
    if (st.ch && q.chapters.indexOf(st.ch) < 0) return false;
    if (st.lesson && q.lessons.indexOf(st.lesson) < 0) return false;
    if (st.group !== 'All') {
      if (st.group === 'Practice') { if (!isPractice(q) || q.group === 'Problems') return false; }
      else if (st.group === 'Problems') { if (q.group !== 'Problems') return false; }
      else if (isPractice(q) || q.group !== st.group) return false;
    }
    var s = status[q.id] || '';
    if (st.status === 'todo' && s === 'solved') return false;
    if (st.status === 'solved' && s !== 'solved') return false;
    if (st.status === 'review' && s !== 'review') return false;
    if (st.kit && !hasKit(q)) return false;
    if (st.query) {
      var hay = (q.label + ' ' + q.title + ' ' + q.reason + ' ' + (q.year || '') + ' ' + q.lessons.map(function (k) { return lessonShort(k) + ' ' + (L[k] ? L[k].title : ''); }).join(' ') + ' ' + q.search).toLowerCase();
      if (!st.query.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; })) return false;
    }
    return true;
  }
  function sortKey(a, b) {
    return ((b.year || 0) - (a.year || 0)) || (isPractice(a) - isPractice(b)) || a.label.localeCompare(b.label);
  }

  function tags(q) {
    var t = q.chapters.map(function (c) { return '<span class="ax-tag">Ch ' + roman[c] + '</span>'; });
    var ls = q.lessons.filter(function (k) { return !st.ch || L[k].chapter === st.ch; });
    if (ls.length) t.push('<span class="ax-tag">' + ls.map(lessonShort).join(' · ') + '</span>');
    if (hasKit(q)) t.push('<span class="ax-tag kit">Worked in the kit</span>');
    if (q.sol_md) t.push('<span class="ax-tag kit">Solution here</span>');
    if (q.solutions.length || q.answers_on_page) t.push('<span class="ax-tag key">' + (q.solutions.length ? 'Supplied solution' : 'Answers on the pages') + '</span>');
    if (!hasKit(q) && !q.sol_md && !q.solutions.length && !q.answers_on_page) t.push('<span class="ax-tag none">No solution supplied</span>');
    if (q.missing_prompt) t.push('<span class="ax-tag none">Prompt missing</span>');
    if (mySet.indexOf(q.id) >= 0) t.push('<span class="ax-tag set">In my set</span>');
    return t.join('');
  }
  function card(q) {
    var s = status[q.id] || '';
    return '<button type="button" class="ax-card' + (s ? ' is-' + s : '') + '" data-open="' + q.id + '"><span class="ax-dot" aria-hidden="true"></span>' +
      '<span class="ax-src">' + esc(q.label) + (s ? ' · ' + (s === 'solved' ? '✓ solved' : '↻ review') : '') + '</span><span class="ax-go" aria-hidden="true">↗</span>' +
      '<span class="ax-t">' + esc(q.title) + '</span><span class="ax-meta">' + tags(q) + '</span></button>';
  }

  var visible = [];
  function render() {
    [].forEach.call(document.querySelectorAll('[data-ch]'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.ch === st.ch)); });
    [].forEach.call(document.querySelectorAll('[data-group]'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.group === st.group)); });
    [].forEach.call(document.querySelectorAll('[data-status]'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.status === st.status)); });
    $('ax-kit').checked = st.kit;
    $('ax-setbtn').innerHTML = (st.set ? '← All questions' : '★ My set') + ' <small>' + mySet.length + '</small>';
    $('ax-setbtn').setAttribute('aria-pressed', String(st.set));

    var list = Q.filter(matches).sort(sortKey), html = '';
    if (st.lesson || st.set || st.query) {
      html = list.length ? '<div class="ax-list">' + list.map(card).join('') + '</div>' : '';
      visible = list;
    } else {
      var sections = [];
      if (st.ch) {
        sections.push(['Mainly Chapter ' + roman[st.ch], list.filter(function (q) { return q.chapters[0] === st.ch; })]);
        sections.push(['Also uses Chapter ' + roman[st.ch], list.filter(function (q) { return q.chapters[0] !== st.ch; })]);
      } else {
        CH.forEach(function (c) { sections.push(['Chapter ' + c.roman + ' · ' + c.title, list.filter(function (q) { return q.chapters[0] === c.id; })]); });
      }
      visible = [];
      sections.forEach(function (s) {
        if (!s[1].length) return;
        visible = visible.concat(s[1]);
        html += '<h3 class="ax-group"><span>' + esc(s[0]) + '</span><span>' + s[1].length + '</span></h3><div class="ax-list">' + s[1].map(card).join('') + '</div>';
      });
    }
    $('ax-out').innerHTML = html || '<p class="ax-empty">' + (st.set ? 'Your set is empty. Open a question and press “＋ My set”.' : 'No questions match these filters.') + '</p>';

    var solved = Q.filter(function (q) { return status[q.id] === 'solved'; }).length, review = Q.filter(function (q) { return status[q.id] === 'review'; }).length;
    $('ax-count').innerHTML = 'Showing <b>' + list.length + '</b> of ' + Q.length + ' questions' + (st.lesson ? ' for <b>L' + L[st.lesson].n + ' · ' + esc(L[st.lesson].title) + '</b>' : '');
    $('ax-prog').textContent = '✓ ' + solved + ' solved · ↻ ' + review + ' to review';

    var route = st.ch && !st.lesson && !st.set && !st.query && D.routes[st.ch];
    $('ax-route').innerHTML = route ? '<div class="ax-route"><h3>Where to start in Chapter ' + roman[st.ch] + '</h3><p>A short path: this term’s own problems first, then papers worked in the kit so you can check yourself, then recent exams with supplied keys.</p><ol>' +
      route.map(function (id) { var q = byId[id]; return '<li><button type="button" data-open="' + id + '" class="' + (status[id] === 'solved' ? 'is-solved' : '') + '">' + esc(q.label) + '</button></li>'; }).join('') + '</ol></div>' : '';
    lessonOptions();
    syncUrl();
  }

  chipRow();
  app.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ch]'); if (b) { st.ch = b.dataset.ch; if (st.lesson && L[st.lesson].chapter !== st.ch) st.lesson = ''; st.set = false; render(); return; }
    b = e.target.closest('[data-group]'); if (b) { st.group = b.dataset.group; render(); return; }
    b = e.target.closest('[data-status]'); if (b) { st.status = b.dataset.status; render(); return; }
    b = e.target.closest('[data-open]'); if (b) { openQuestion(b.dataset.open); return; }
    if (e.target.closest('#ax-setbtn')) { st.set = !st.set; render(); return; }
    if (e.target.closest('#ax-reset')) { st = { ch: '', lesson: '', group: 'All', status: 'all', kit: false, query: '', set: false }; $('ax-q').value = ''; render(); }
  });
  $('ax-lesson').addEventListener('change', function () { st.lesson = this.value; if (st.lesson) st.ch = L[st.lesson].chapter; render(); });
  $('ax-kit').addEventListener('change', function () { st.kit = this.checked; render(); });
  var timer; $('ax-q').addEventListener('input', function () { var v = this.value; clearTimeout(timer); timer = setTimeout(function () { st.query = v.trim().toLowerCase(); render(); }, 120); });

  // reader
  var dlg = document.createElement('dialog'); dlg.className = 'ax-reader'; dlg.setAttribute('aria-labelledby', 'ax-rtitle');
  dlg.innerHTML = '<div class="ax-rbar"><span class="ax-src" id="ax-rsrc"></span><span class="ax-acts">' +
    '<button class="ax-btn solved" id="ax-solved" aria-pressed="false">✓ <span>Solved</span></button>' +
    '<button class="ax-btn review" id="ax-review" aria-pressed="false">↻ <span>Review again</span></button>' +
    '<button class="ax-btn" id="ax-inset" aria-pressed="false">＋ <span>My set</span></button>' +
    '<button class="ax-btn" id="ax-close" aria-label="Close question">✕</button></span></div><div class="ax-rbody" id="ax-rbody" tabindex="-1"></div>';
  document.body.appendChild(dlg);
  var current = null;

  function figures(pages) { return '<div class="ax-pages">' + pages.map(function (p) { return '<figure><img loading="lazy" src="' + p.src + '" alt="' + esc(p.cap) + '"><figcaption>' + esc(p.cap) + '</figcaption></figure>'; }).join('') + '</div>'; }
  function body(q) {
    var h = '<p class="ax-note">' + q.chapters.map(function (c) { return 'Chapter ' + roman[c]; }).join(' + ') + ' · ' + esc(q.kind) + '</p>' +
      '<h2 id="ax-rtitle">' + esc(q.title) + '</h2>' + (q.reason ? '<p class="ax-why">' + esc(q.reason) + '</p>' : '');
    h += '<p class="ax-review"><span>Review first:</span>' + q.lessons.map(function (k) { return '<a href="' + L[k].href + '" title="' + esc(L[k].title) + '">' + roman[L[k].chapter] + ' · L' + L[k].n + ' ' + esc(L[k].title.split(/[:,;]/)[0]) + '</a>'; }).join('') + '</p>';
    Object.keys(q.parts).forEach(function (c) { h += '<p class="ax-partline"><b>Chapter ' + roman[c] + ':</b> ' + esc(q.parts[c]) + '</p>'; });
    if (q.missing_prompt) h += '<div class="ax-box warn">Only the solution pages of this question were supplied. The original question is missing, so the pages below show the worked answer.</div>';
    if (q.md) {
      h += '<div class="ax-prompt" id="ax-prompt"><p class="ax-note">Loading the question…</p></div>';
      if (q.pages.length) h += '<details><summary>Original exam pages (' + q.pages.length + ')' + (q.answers_on_page ? ' · include the supplied answers' : '') + '</summary><div class="ax-inner">' + figures(q.pages) + '</div></details>';
    } else if (q.pages.length) {
      if (q.answers_on_page && !q.missing_prompt) h += '<div class="ax-box warn">These pages come from a solution file, so the supplied answer is written on or after the question. Cover it if you want to try first.</div>';
      h += figures(q.pages);
    }
    if (q.link) h += '<p class="ax-note"><a href="' + q.link.href + '" target="_blank" rel="noopener">' + esc(q.link.label) + ' ↗</a></p>';
    if (q.sol_md) h += '<details><summary>Official solution, numbers recomputed</summary><div class="ax-inner ax-prompt" id="ax-sol"><p class="ax-note">Loading…</p></div></details>';
    if (q.kit.length) h += '<div class="ax-box kit"><h3>Worked solution in the kit</h3><ul>' + q.kit.map(function (k) { return '<li><a href="' + k.href + '">' + esc(k.label) + '</a>' + (k.title ? ' — ' + esc(k.title) : '') + '</li>'; }).join('') + '</ul></div>';
    q.solutions.forEach(function (s) { h += '<details><summary>' + (/alternative/i.test(s.role) ? 'Alternative supplied solution' : 'Supplied solution') + ' · ' + esc(s.file) + ' (' + s.pages.length + ' page' + (s.pages.length > 1 ? 's' : '') + ')</summary><div class="ax-inner">' + (/alternative/i.test(s.role) ? '<p class="ax-note">' + esc(s.role) + '.</p>' : '') + figures(s.pages) + '</div></details>'; });
    q.others.forEach(function (s) { h += '<details><summary>Other copy · ' + esc(s.role) + '</summary><div class="ax-inner">' + figures(s.pages) + '</div></details>'; });
    if (q.note) h += '<div class="ax-box"><h3>Source note</h3><p class="ax-note">' + esc(q.note) + '</p></div>';
    if (!q.kit.length && !q.sol_md && !q.solutions.length && !q.answers_on_page) h += '<div class="ax-box"><h3>No solution supplied</h3><p class="ax-note">The archive has no key for this one. Use the lessons above, then check your numbers with a classmate or the TA.</p></div>';
    h += '<div class="ax-rnav"><button class="ax-btn" id="ax-prev">← Previous</button><button class="ax-btn" id="ax-next">Next →</button></div>';
    return h;
  }

  var libs = null;
  function loadScript(src) { return new Promise(function (ok, fail) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = fail; document.head.appendChild(s); }); }
  function mdToHtml(md) {
    var math = [], plain = md.replace(/\$\$([\s\S]*?)\$\$|\$([^$\n]+?)\$/g, function (_, block, inline) {
      var n = math.length;
      try { math.push(katex.renderToString(block != null ? block : inline, { displayMode: block != null, throwOnError: false, strict: 'ignore' })); } catch (err) { math.push(esc(block || inline)); }
      return 'AXMATH' + n + 'END';
    });
    return marked.parse(plain, { gfm: true }).replace(/AXMATH(\d+)END/g, function (_, n) { return math[+n]; });
  }
  function renderPrompt(q) {
    if (!libs) libs = Promise.all([loadScript('assets/katex/katex.min.js'), loadScript('assets/vendor/marked.min.js')]);
    libs.then(function () {
      if (current !== q) return;
      $('ax-prompt').innerHTML = mdToHtml(q.md);
      if (q.sol_md && $('ax-sol')) $('ax-sol').innerHTML = mdToHtml(q.sol_md);
    }).catch(function () { if ($('ax-prompt')) $('ax-prompt').innerHTML = '<p class="ax-note">The typed version could not load. Use the original pages below.</p>'; });
  }

  function syncReader() {
    if (!current) return;
    var s = status[current.id] || '';
    $('ax-solved').setAttribute('aria-pressed', String(s === 'solved'));
    $('ax-review').setAttribute('aria-pressed', String(s === 'review'));
    var inSet = mySet.indexOf(current.id) >= 0;
    $('ax-inset').setAttribute('aria-pressed', String(inSet));
    $('ax-inset').innerHTML = (inSet ? '★' : '＋') + ' <span>' + (inSet ? 'In my set' : 'My set') + '</span>';
    var i = visible.indexOf(current);
    $('ax-prev').disabled = i <= 0; $('ax-next').disabled = i < 0 || i >= visible.length - 1;
  }
  function openQuestion(id) {
    var q = byId[id]; if (!q) return;
    current = q;
    $('ax-rsrc').textContent = q.label;
    $('ax-rbody').innerHTML = body(q);
    $('ax-rbody').scrollTop = 0;
    if (q.md) renderPrompt(q);
    if (!dlg.open) { dlg.showModal(); document.body.style.overflow = 'hidden'; }
    $('ax-rbody').focus({ preventScroll: true });
    syncReader(); syncUrl();
  }
  function closeReader() { if (dlg.open) dlg.close(); }
  dlg.addEventListener('close', function () { document.body.style.overflow = ''; current = null; syncUrl(); });
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg) { var r = dlg.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeReader(); return; }
    if (e.target.closest('#ax-close')) { closeReader(); return; }
    if (e.target.closest('#ax-prev') || e.target.closest('#ax-next')) { var i = visible.indexOf(current) + (e.target.closest('#ax-prev') ? -1 : 1); if (visible[i]) openQuestion(visible[i].id); return; }
    var mark = e.target.closest('#ax-solved') ? 'solved' : e.target.closest('#ax-review') ? 'review' : '';
    if (mark && current) { if (status[current.id] === mark) delete status[current.id]; else status[current.id] = mark; store(STATUS_KEY, status); syncReader(); render(); return; }
    if (e.target.closest('#ax-inset') && current) { var k = mySet.indexOf(current.id); if (k >= 0) mySet.splice(k, 1); else mySet.push(current.id); store(SET_KEY, mySet); syncReader(); render(); }
  });
  document.addEventListener('keydown', function (e) {
    if (!dlg.open || !current || (e.target.closest && e.target.closest('input,select,textarea')) || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { var i = visible.indexOf(current) + (e.key === 'ArrowLeft' ? -1 : 1); if (visible[i]) { e.preventDefault(); openQuestion(visible[i].id); } }
  });
  window.addEventListener('storage', function (e) { if (e.key === STATUS_KEY || e.key === SET_KEY) { status = load(STATUS_KEY, {}); mySet = load(SET_KEY, []); render(); syncReader(); } });

  render();
  if (openId) openQuestion(openId);
})();
