/* EE361 reader UI. Loaded in <head> to apply saved colors before first paint.
   Does not replace the original routers, scientific content or progress keys. */
(function () {
  'use strict';
  var KEY = 'ee361-reading-preferences-v1';
  var defaults = { theme: 'paper', size: 18, leading: 'relaxed', font: 'sans', width: 'comfortable', focus: false };
  var allowedThemes = ['paper', 'cloud', 'sage', 'dusk', 'night', 'system'];
  var prefs = Object.assign({}, defaults), storageOK = true;
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (saved && typeof saved === 'object') {
      if (allowedThemes.indexOf(saved.theme) >= 0) prefs.theme = saved.theme;
      if ([16, 18, 20, 22, 24].indexOf(saved.size) >= 0) prefs.size = saved.size;
      ['leading', 'font', 'width'].forEach(function (key) {
        var values = { leading: ['relaxed', 'airy'], font: ['sans', 'serif'], width: ['comfortable', 'wide'] };
        if (values[key].indexOf(saved[key]) >= 0) prefs[key] = saved[key];
      });
      if (typeof saved.focus === 'boolean') prefs.focus = saved.focus;
    }
  } catch (e) { storageOK = false; }
  var root = document.documentElement, media = window.matchMedia('(prefers-color-scheme: dark)');
  function apply() {
    root.dataset.theme = prefs.theme === 'system' ? (media.matches ? 'dusk' : 'paper') : prefs.theme;
    root.dataset.readerFont = prefs.font;
    root.dataset.readerWidth = prefs.width;
    root.dataset.focus = String(prefs.focus);
    root.style.setProperty('--reader-size', prefs.size + 'px');
    root.style.setProperty('--reader-leading', prefs.leading === 'airy' ? '2' : '1.8');
  }
  apply();
  if (media.addEventListener) media.addEventListener('change', function () { if (prefs.theme === 'system') apply(); });

  document.addEventListener('DOMContentLoaded', function () {
    var main = document.querySelector('main'), rail = document.querySelector('.rail');
    if (!main || !rail) return;
    var pages = Array.from(document.querySelectorAll('.page'));
    var filename = location.pathname.split('/').pop() || 'index.html';
    var chapterKey = /^ch[1-5]\.html$/.test(filename) ? filename.slice(0, 3) : '';
    var chapterNames = { ch1: 'Power systems', ch2: 'Magnetic circuits', ch3: 'Transformers', ch4: 'Energy conversion & DC machines', ch5: 'Power electronics' };
    var romans = { ch1: 'I', ch2: 'II', ch3: 'III', ch4: 'IV', ch5: 'V' };
    var icons = {
      search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
      menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
      focus: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/><circle cx="12" cy="12" r="3"/>',
      arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
      book: '<path d="M12 5c-3-3-7-2-9-1v15c3-1 6-1 9 1m0-15c3-3 7-2 9-1v15c-3-1-6-1-9 1V5Z"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 18l9 5 9-5"/>',
      globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"/>'
    };
    function svg(name, cls) { return '<svg class="' + (cls || 'studio-icon') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icons[name] + '</svg>'; }
    function node(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }
    function button(cls, label, markup) { var b = node('button', cls); b.type = 'button'; b.setAttribute('aria-label', label); b.innerHTML = markup; return b; }
    function readProgress(key) { try { var val = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(val) ? val : []; } catch (e) { return []; } }
    function save() {
      try { localStorage.setItem(KEY, JSON.stringify(prefs)); storageOK = true; } catch (e) { storageOK = false; }
      apply(); syncPrefs();
    }

    // The complete existing course menu remains the source of navigation data.
    var courseNav = rail.querySelector('.coursenav');
    var catalog = [], seen = new Set();
    if (courseNav) courseNav.querySelectorAll('a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || seen.has(href)) return;
      seen.add(href);
      var chapter = a.closest('details.chap'), title = a.querySelector('span:last-child');
      catalog.push({ href: href, title: (title || a).textContent.trim(), group: chapter ? 'Chapter ' + (chapter.querySelector('summary .dot') || {}).textContent : 'Course resources' });
    });
    var brand = rail.querySelector('.brand');
    if (brand) brand.innerHTML = '<a class="studio-brand-link" href="index.html"><span class="brand-mark"><svg viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M4 14h5m10 0h5M9 14c0-8 3-8 3 0s3 8 3 0 3-8 3 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span><span>EE361<span style="font-weight:400"> / study</span></span><span class="brand-tag">METU</span></a><small>Electromechanical energy conversion</small>';
    var searchButton = button('studio-search', 'Search lessons and resources', svg('search') + '<span>Find a lesson</span><kbd>' + (/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘ K' : 'Ctrl K') + '</kbd>');
    if (brand) brand.after(searchButton);
    var foot = node('div', 'studio-rail-foot', 'A little progress, every day.\nYour learning stays on this browser.');
    rail.appendChild(foot);

    var skip = node('a', 'skip-link', 'Skip to lesson'); skip.href = '#main';
    skip.addEventListener('click', function (e) { e.preventDefault(); main.tabIndex = -1; main.focus(); });
    document.body.prepend(skip);
    var header = node('header', 'study-header');
    var menuButton = button('ui-button mobile-nav-trigger', 'Open course menu', svg('menu'));
    var breadcrumb = node('div', 'study-breadcrumb');
    breadcrumb.innerHTML = '<a href="index.html">Your classroom</a><span class="crumb-divider" aria-hidden="true">/</span>';
    var crumbLabel = node('span'); breadcrumb.appendChild(crumbLabel);
    var actions = node('div', 'header-actions');
    var mobileSearchButton = button('ui-button header-search-trigger', 'Search lessons and resources', svg('search'));
    var focusButton = button('ui-button focus-trigger', 'Enter focus mode', svg('focus') + '<span class="button-label">Focus</span>');
    focusButton.title = 'Focus mode (F)';
    var appearanceButton = button('ui-button appearance-trigger', 'Reading appearance', '<span class="type-icon" aria-hidden="true">Aa</span><span class="button-label">Appearance</span>');
    actions.append(mobileSearchButton, focusButton, appearanceButton);
    var track = node('div', 'reading-track'); track.setAttribute('aria-hidden', 'true'); var trackBar = node('i'); track.appendChild(trackBar);
    header.append(menuButton, breadcrumb, actions, track); main.prepend(header);
    var toc = node('aside', 'studio-toc'); toc.setAttribute('aria-label', 'On this page'); main.appendChild(toc);

    // Frame chapter introductions without replacing the educational markup.
    var heroPrimary = null;
    pages.forEach(function (page) {
      if (page.dataset.page !== 'home') return;
      var title = page.querySelector('h1'), intro = page.querySelector('.lede'), crumb = page.querySelector('.crumb');
      if (!title || !intro) return;
      var hero = node('div', 'studio-hero'); page.insertBefore(hero, crumb || title);
      if (crumb) hero.appendChild(crumb);
      hero.appendChild(title); hero.appendChild(intro);
      if (chapterKey) title.textContent = title.textContent.replace(/^Chapter [IV]+:\s*/i, '');
      else if (filename === 'index.html') title.textContent = 'Big ideas.\nLasting understanding.';
      var art = node('div', 'hero-art'); art.setAttribute('aria-hidden', 'true');
      art.innerHTML = '<svg viewBox="0 0 300 260" fill="none"><g stroke="currentColor" stroke-width=".7"><ellipse cx="160" cy="130" rx="40" ry="90"/><ellipse cx="160" cy="130" rx="63" ry="105"/><ellipse cx="160" cy="130" rx="87" ry="116"/><ellipse cx="160" cy="130" rx="111" ry="124"/><path d="M30 130h260M160 0v260" stroke-dasharray="3 6"/></g><rect x="137" y="78" width="46" height="104" rx="17" fill="currentColor" fill-opacity=".1" stroke="currentColor"/><g stroke="currentColor" stroke-width="2"><path d="M134 91q26-16 52 0m-52 13q26-16 52 0m-52 13q26-16 52 0m-52 13q26-16 52 0m-52 13q26-16 52 0m-52 13q26-16 52 0m-52 13q26-16 52 0"/></g><circle cx="160" cy="27" r="3" fill="currentColor"/><circle cx="49" cy="130" r="3" fill="currentColor"/></svg>';
      hero.appendChild(art);
      var heroActions = node('div', 'hero-actions'), existing = page.querySelector('#continue');
      if (existing) { var parent = existing.parentElement; heroActions.appendChild(existing); if (!parent.textContent.trim()) parent.remove(); }
      else if (chapterKey) { heroPrimary = node('a', 'btn'); heroActions.appendChild(heroPrimary); }
      var secondary = node('a', 'secondary-link', chapterKey ? 'Explore the whole course ↗' : 'Explore interactive tools ↗');
      secondary.href = chapterKey ? 'index.html' : 'tools.html'; heroActions.appendChild(secondary); hero.appendChild(heroActions);
      var facts = node('div', 'hero-facts'), count = pages.filter(function (p) { return /^l\d+$/.test(p.dataset.page); }).length;
      facts.innerHTML = '<span>' + svg('book') + (count ? count + ' lessons, one clear path' : '35 lessons · 5 chapters') + '</span><span>' + svg('layers') + 'Theory to worked examples</span><span>' + svg('globe') + 'English + Türkçe</span>';
      hero.appendChild(facts);
      var objectives = page.querySelector('.objectives');
      if (objectives) { var workflow = node('details', 'workflow'); workflow.appendChild(node('summary', '', 'A simple way to study this chapter')); objectives.before(workflow); workflow.appendChild(objectives); var grid = page.querySelector('.home-grid'); if (grid) grid.after(workflow); }
      var firstGrid = page.querySelector('.home-grid');
      if (firstGrid && !(firstGrid.previousElementSibling && firstGrid.previousElementSibling.matches('h2'))) {
        var label = node('div', 'studio-section-label'); label.append(node('span', '', 'Your learning path'), node('small', '', 'One lesson at a time')); firstGrid.before(label);
      }
    });

    document.querySelectorAll('.home-grid>a').forEach(function (a, index) {
      var key = a.querySelector('.k'), match = key && key.textContent.match(/(?:Lesson|Chapter)\s+([\dIV]+)/i);
      var badge = node('span', 'card-number', match ? match[1] : String(index + 1).padStart(2, '0')); badge.setAttribute('aria-hidden', 'true'); a.prepend(badge);
    });
    pages.forEach(function (page) {
      var heading = page.querySelector('h1'), metadata = heading && heading.nextElementSibling;
      if (metadata && metadata.tagName === 'P' && /^Chapter [IV]+:/.test(metadata.textContent)) metadata.classList.add('lesson-meta');
      Array.from(page.children).forEach(function (p) {
        if (p.tagName === 'P' && p.querySelector('em') && /Assistant.written teaching note/i.test(p.textContent)) {
          var d = node('details', 'source-note'); d.appendChild(node('summary', '', 'Sources & lesson notes')); p.before(d); d.appendChild(p);
        }
      });
    });

    function dialog(id, title, cls) {
      var d = node('dialog', 'studio-dialog ' + (cls || '')); d.id = id; d.setAttribute('aria-labelledby', id + '-title');
      var dh = node('div', 'dialog-head'), h = node('h2', '', title); h.id = id + '-title';
      var close = button('ui-button', 'Close ' + title.toLowerCase(), '×'); close.addEventListener('click', function () { d.close(); });
      dh.append(h, close); d.appendChild(dh); document.body.appendChild(d);
      d.addEventListener('click', function (e) { if (e.target !== d) return; var b = d.getBoundingClientRect(); if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) d.close(); });
      d.addEventListener('close', function () { document.body.style.overflow = ''; });
      return d;
    }
    function openDialog(d) { if (d.open) return; document.querySelectorAll('.studio-dialog[open]').forEach(function (other) { other.close(); }); d.showModal(); document.body.style.overflow = 'hidden'; }
    var appearance = dialog('reading-appearance', 'Make yourself comfortable');
    var form = node('div', 'dialog-body');
    form.innerHTML = '<p class="dialog-intro">Your space, your pace. Find a reading setup that feels right.</p>' +
      '<fieldset class="preference-group"><legend>Page color</legend><div class="theme-grid">' +
      allowedThemes.map(function (theme) { return '<label class="theme-option"><input type="radio" name="reading-theme" value="' + theme + '"><span class="theme-preview ' + theme + '" aria-hidden="true">Aa</span><span>' + (theme === 'system' ? 'Device' : theme.charAt(0).toUpperCase() + theme.slice(1)) + '</span></label>'; }).join('') + '</div></fieldset>' +
      '<div class="preference-row"><span class="preference-label" id="size-label">Text size</span><div class="size-stepper" role="group" aria-labelledby="size-label"><button type="button" data-size="-2" aria-label="Decrease text size">−</button><output aria-live="polite" id="reader-size-output"></output><button type="button" data-size="2" aria-label="Increase text size">+</button></div></div>' +
      segment('Typeface', 'font', [['sans', 'Sans'], ['serif', 'Serif']]) +
      segment('Line spacing', 'leading', [['relaxed', 'Relaxed'], ['airy', 'Airy']]) +
      segment('Reading width', 'width', [['comfortable', 'Focused'], ['wide', 'Wide']]) +
      '<div class="prefs-footer"><span id="preference-storage-note"></span><button type="button" class="text-button" id="reset-appearance">Reset appearance</button></div>';
    appearance.appendChild(form);
    function segment(label, key, options) {
      return '<div class="preference-row"><span class="preference-label" id="pref-' + key + '">' + label + '</span><div class="segmented" role="group" aria-labelledby="pref-' + key + '">' + options.map(function (o) { return '<button type="button" data-pref="' + key + '" data-value="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div></div>';
    }
    function syncPrefs() {
      appearance.querySelectorAll('[name="reading-theme"]').forEach(function (el) { el.checked = el.value === prefs.theme; });
      appearance.querySelectorAll('[data-pref]').forEach(function (el) { el.setAttribute('aria-pressed', String(prefs[el.dataset.pref] === el.dataset.value)); });
      document.getElementById('reader-size-output').textContent = prefs.size + 'px';
      appearance.querySelector('[data-size="-2"]').disabled = prefs.size <= 16;
      appearance.querySelector('[data-size="2"]').disabled = prefs.size >= 24;
      document.getElementById('preference-storage-note').textContent = storageOK ? 'Saved on this browser. Make it yours.' : 'Applied here. Browser storage is unavailable.';
      focusButton.setAttribute('aria-pressed', String(prefs.focus));
      focusButton.setAttribute('aria-label', prefs.focus ? 'Exit focus mode' : 'Enter focus mode');
      focusButton.querySelector('.button-label').textContent = prefs.focus ? 'Exit focus' : 'Focus';
      updateTrack();
    }
    appearance.addEventListener('change', function (e) { if (e.target.name === 'reading-theme') { prefs.theme = e.target.value; save(); } });
    appearance.addEventListener('click', function (e) {
      var control = e.target.closest('[data-pref], [data-size]');
      if (control && !control.disabled) {
        if (control.dataset.pref) prefs[control.dataset.pref] = control.dataset.value;
        else prefs.size = Math.max(16, Math.min(24, prefs.size + Number(control.dataset.size)));
        save();
      }
      if (e.target.closest('#reset-appearance')) { prefs = Object.assign({}, defaults); save(); }
    });
    appearanceButton.addEventListener('click', function () { syncPrefs(); openDialog(appearance); });
    focusButton.addEventListener('click', function () { prefs.focus = !prefs.focus; save(); });

    var search = dialog('lesson-search', 'Find your next idea', 'search-dialog');
    var searchBody = node('div', 'dialog-body'), searchInput = node('input'); searchInput.type = 'search'; searchInput.placeholder = 'Try “flux”, “transformer”, “buck”…'; searchInput.setAttribute('aria-label', 'Search lessons and resources');
    var results = node('div', 'search-results'); results.setAttribute('aria-label', 'Search results');
    var resultStatus = node('p', 'dialog-intro'); resultStatus.setAttribute('role', 'status');
    searchBody.append(searchInput, resultStatus, results); search.appendChild(searchBody);
    function renderResults() {
      var query = searchInput.value.trim().toLocaleLowerCase(), matches = catalog.filter(function (item) { return (item.title + ' ' + item.group).toLocaleLowerCase().indexOf(query) >= 0; });
      results.replaceChildren(); resultStatus.textContent = query ? matches.length + ' matching lessons and resources' : 'All lessons and course resources';
      matches.forEach(function (item) { var a = node('a', 'search-result'); a.href = item.href; var t = node('span'); t.append(node('small', '', item.group), node('span', '', item.title)); a.append(t, node('span', 'result-arrow', '↗')); results.appendChild(a); });
      if (!matches.length) results.appendChild(node('p', 'search-empty', 'No matches yet. Try a shorter topic or chapter name.'));
    }
    function openSearch() { renderResults(); openDialog(search); searchInput.focus(); }
    searchInput.addEventListener('input', renderResults);
    searchInput.addEventListener('keydown', function (e) { var first = results.querySelector('a'); if (e.key === 'ArrowDown' && first) { e.preventDefault(); first.focus(); } else if (e.key === 'Enter' && first) { e.preventDefault(); first.click(); } });
    searchButton.addEventListener('click', openSearch);
    mobileSearchButton.addEventListener('click', openSearch);
    results.addEventListener('click', function (e) { if (e.target.closest('a')) search.close(); });
    var menu = dialog('course-menu', 'Your classroom', 'nav-dialog');
    menuButton.addEventListener('click', function () {
      var previous = menu.querySelector('.coursenav'); if (previous) previous.remove();
      if (courseNav) menu.appendChild(courseNav.cloneNode(true)); openDialog(menu);
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) menu.close(); });
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (!appearance.open && !menu.open) { if (search.open) search.close(); else openSearch(); } return; }
      if (e.target.closest('input,textarea,select,[contenteditable="true"]') || e.metaKey || e.ctrlKey || e.altKey || document.querySelector('dialog[open]')) return;
      if (e.key.toLowerCase() === 'f') { e.preventDefault(); prefs.focus = !prefs.focus; save(); }
    });

    var activePage = null, headings = [], spy = null;
    function updateTrack() {
      if (!activePage || !/^l\d+$/.test(activePage.dataset.page)) { track.hidden = true; return; }
      track.hidden = false;
      var top = activePage.offsetTop, distance = activePage.offsetHeight - window.innerHeight + header.offsetHeight;
      var fraction = distance > 0 ? (window.scrollY - top + header.offsetHeight) / distance : 1;
      trackBar.style.width = Math.min(100, Math.max(0, fraction * 100)) + '%';
    }
    function refreshPage() {
      activePage = pages.find(function (p) { return !p.hidden; }) || pages[0];
      if (!activePage) return;
      var isLesson = /^l\d+$/.test(activePage.dataset.page);
      crumbLabel.textContent = (chapterNames[chapterKey] || (filename === 'index.html' ? 'Course overview' : document.title.replace(/^EE361[ :·—-]*/, ''))) + (isLesson ? ' / Lesson ' + activePage.dataset.page.slice(1) : '');
      if (courseNav) courseNav.querySelectorAll('a.sub').forEach(function (a) { var href = a.getAttribute('href'), current = href === filename + '#' + activePage.dataset.page || href === '#' + activePage.dataset.page; a.classList.toggle('studio-current', current); if (current) { a.setAttribute('aria-current', 'page'); var chapter = a.closest('details'); if (chapter) chapter.open = true; } else a.removeAttribute('aria-current'); });
      toc.replaceChildren(); headings = [];
      if (isLesson) {
        toc.appendChild(node('b', '', 'In this lesson'));
        activePage.querySelectorAll('h2[id]').forEach(function (h) { var a = node('a', '', h.textContent.replace(/^\d+\.\s*/, '')); a.href = '#' + h.id; toc.appendChild(a); headings.push({ heading: h, link: a }); });
      }
      toc.hidden = !headings.length;
      if (spy) spy.disconnect();
      if ('IntersectionObserver' in window && headings.length) {
        spy = new IntersectionObserver(function (entries) { var entry = entries.find(function (e) { return e.isIntersecting; }); if (!entry) return; headings.forEach(function (h) { h.link.classList.toggle('active', h.heading === entry.target); }); }, { rootMargin: '-100px 0px -65% 0px' });
        headings.forEach(function (h) { spy.observe(h.heading); });
      }
      refreshProgress(); updateTrack();
    }
    function refreshProgress() {
      var done = readProgress(chapterKey === 'ch1' ? 'ee361-ch1-learned' : 'ee361-full-learned');
      if (heroPrimary) {
        var lessons = pages.filter(function (p) { return /^l\d+$/.test(p.dataset.page); });
        var next = lessons.find(function (p) { return done.indexOf(p.dataset.page) < 0; }) || lessons[0];
        if (next) { heroPrimary.href = '#' + next.dataset.page; heroPrimary.innerHTML = (lessons.every(function (p) { return done.indexOf(p.dataset.page) >= 0; }) ? 'Revisit this chapter' : done.some(function (id) { return lessons.some(function (p) { return p.dataset.page === id; }); }) ? 'Continue chapter' : 'Start learning') + svg('arrow'); }
      }
      document.querySelectorAll('.home-grid>a').forEach(function (a) { var href = a.getAttribute('href') || '', match = /#(l\d+)$/.exec(href); if (match) { var key = href.indexOf('ch1.html') === 0 || (href[0] === '#' && chapterKey === 'ch1') ? 'ee361-ch1-learned' : 'ee361-full-learned'; a.classList.toggle('is-learned', readProgress(key).indexOf(match[1]) >= 0); } });
    }
    var routeObserver = new MutationObserver(function () { window.requestAnimationFrame(refreshPage); });
    pages.forEach(function (page) { routeObserver.observe(page, { attributes: true, attributeFilter: ['hidden'] }); });
    document.addEventListener('click', function (e) { if (e.target.closest('.mk')) setTimeout(refreshProgress, 0); });
    window.addEventListener('storage', function (e) {
      if (e.key === KEY) { try { var incoming = JSON.parse(e.newValue || '{}'); if (allowedThemes.indexOf(incoming.theme) >= 0) { /* Reload validated settings without touching either progress key. */ location.reload(); } } catch (err) {} }
      else refreshProgress();
    });
    window.addEventListener('scroll', updateTrack, { passive: true });
    window.addEventListener('resize', updateTrack);
    syncPrefs(); refreshPage();
  });
})();
