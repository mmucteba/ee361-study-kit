/* links the kit to the past exams page: menu entry, a practice box under every lesson,
   chapter and home cards. runs before studio.js builds its menu and search. */
(function () {
  'use strict';
  var X = window.EE361_ARCHIVE_INDEX;
  if (!X) return;
  var file = location.pathname.split('/').pop() || 'index.html';
  var chapter = /^ch[1-5]\.html$/.test(file) ? file.slice(0, 3) : '';
  var roman = { ch1: 'I', ch2: 'II', ch3: 'III', ch4: 'IV', ch5: 'V' };
  var status = {};
  try { status = JSON.parse(localStorage.getItem('ee361-archive-status-v1') || '{}') || {}; } catch (e) {}
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // course menu entry, right after the question index
  document.querySelectorAll('.coursenav').forEach(function (nav) {
    if (nav.querySelector('a[href="archive.html"]')) return;
    var after = nav.querySelector('a[href="questions.html"]');
    var a = document.createElement('a'); a.className = 'cnav'; a.href = 'archive.html';
    a.innerHTML = '<span class="dot">✎</span><span>Past exams archive</span>';
    if (after) after.after(a); else nav.appendChild(a);
  });
  var sel = document.getElementById('topsel');
  if (sel && !sel.querySelector('option[value="url:archive.html"]')) {
    var o = document.createElement('option'); o.value = 'url:archive.html'; o.textContent = '→ Past exams archive';
    var og = sel.querySelector('optgroup[label="Whole course"]'); (og || sel).appendChild(o);
  }

  function item(q) {
    return '<li class="' + (status[q[0]] === 'solved' ? 'done' : '') + '"><a href="archive.html?q=' + encodeURIComponent(q[0]) + '"><span class="s">' + esc(q[1]) + '</span><span>' + esc(q[2]) + '</span>' + (q[3] ? '<span class="k">worked in kit</span>' : '') + '</a></li>';
  }

  // practice box at the end of every lesson
  if (chapter) {
    document.querySelectorAll('.page').forEach(function (page) {
      var id = page.dataset.page;
      if (!/^l\d+$/.test(id)) return;
      var list = X.lessons[chapter + ':' + id];
      if (!list || !list.length) return;
      var solved = list.filter(function (q) { return status[q[0]] === 'solved'; }).length;
      var box = document.createElement('aside'); box.className = 'ax-lesson'; box.setAttribute('aria-label', 'Past exam practice');
      var first = list.slice(0, 6), rest = list.slice(6);
      box.innerHTML = '<h3>Past exam practice for this lesson</h3><p>' + list.length + ' archive question' + (list.length > 1 ? 's' : '') + ' use this lesson' + (solved ? ' · ' + solved + ' solved' : '') + '. Questions marked “worked in kit” have a full solution here.</p>' +
        '<ul>' + first.map(item).join('') + '</ul>' +
        (rest.length ? '<details><summary>' + rest.length + ' more</summary><ul>' + rest.map(item).join('') + '</ul></details>' : '') +
        '<a class="ax-all" href="archive.html?lesson=' + chapter + ':' + id + '">Open them in the archive →</a>';
      var pager = page.querySelector(':scope > .pager');
      page.insertBefore(box, pager || null);
    });
    // chapter overview
    var home = document.querySelector('.page[data-page="home"]'), c = X.chapters[chapter];
    if (home && c) {
      var b = document.createElement('div'); b.className = 'ax-banner';
      b.innerHTML = '<span><b>Past exams for Chapter ' + roman[chapter] + ':</b> ' + c.n + ' questions from 2014–2026, ' + c.kit + ' of them worked in this kit.</span><a href="archive.html?ch=' + chapter + '">Practise by lesson →</a>';
      var grid = home.querySelector('.home-grid');
      if (grid) grid.before(b); else home.appendChild(b);
    }
  }
  // chapter I keeps its own question bank page; point it to the full archive too
  if (chapter === 'ch1') {
    var bank = document.querySelector('.page[data-page="x-index"]');
    if (bank) {
      var n = document.createElement('div'); n.className = 'ax-banner';
      n.innerHTML = '<span>More Chapter I questions (MT1 2021–2024, Final 2023–2024) are in the past exams archive.</span><a href="archive.html?ch=ch1">Open Chapter I in the archive →</a>';
      var h = bank.querySelector('h1'); if (h && h.nextElementSibling) h.nextElementSibling.after(n); else bank.appendChild(n);
    }
  }
  // course home card and question index banner
  if (file === 'index.html' || file === '') {
    var grids = document.querySelectorAll('.page[data-page="home"] .home-grid:not(.chapters)');
    var g = grids[0];
    if (g && !g.querySelector('a[href="archive.html"]')) {
      var a = document.createElement('a'); a.href = 'archive.html';
      a.innerHTML = '<span class="k">Past exams</span><b>Past exams archive</b><small>All ' + X.total + ' archive questions (2014–2026) sorted by chapter and lesson, with original pages, supplied solutions and solved / review marks.</small>';
      var q = g.querySelector('a[href="questions.html"]'); if (q) q.after(a); else g.appendChild(a);
    }
  }
  if (file === 'questions.html') {
    var page = document.querySelector('.page[data-page="home"]'), lede = page && page.querySelector('.lede');
    if (lede) {
      var nb = document.createElement('div'); nb.className = 'ax-banner';
      nb.innerHTML = '<span>This index lists the questions solved in the lessons. For all ' + X.total + ' archive questions, including the ones with only a supplied key, use the past exams archive.</span><a href="archive.html">Open the archive →</a>';
      lede.after(nb);
    }
  }
})();
