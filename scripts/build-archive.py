#!/usr/bin/env python3
"""Build the past-exam archive pages from the private question catalog.

Reads the catalog folder (questions.json, chapters.json, assets/) and
archive/lesson-map.json, then writes:
  archive/data.js          data for archive.html
  archive/lesson-index.js  per-lesson lists for the boxes added to lessons
  archive/pages/, archive/figures/  only the images the archive uses
  archive.html             page built from questions.html so menus match
and adds one head block to every course page. Safe to run again.

  python3 scripts/build-archive.py --catalog ../EE361/assistant/question-bank/past-exams-2026
"""
import argparse
import hashlib
import html
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'archive'
ROMAN = {'ch1': 'I', 'ch2': 'II', 'ch3': 'III', 'ch4': 'IV', 'ch5': 'V'}
CHAPTER_TITLES = {'ch1': 'Introduction to Power Systems', 'ch2': 'Magnetic Circuits', 'ch3': 'Transformers',
                  'ch4': 'Electromechanical Conversion and DC Machines', 'ch5': 'Power Electronics'}

ap = argparse.ArgumentParser()
ap.add_argument('--catalog', default=str(ROOT.parent / 'EE361/assistant/question-bank/past-exams-2026'))
args = ap.parse_args()
CAT = Path(args.catalog).resolve()
assert (CAT / 'questions.json').is_file(), f'catalog not found at {CAT}'

catalog = json.loads((CAT / 'questions.json').read_text())
chapters = json.loads((CAT / 'chapters.json').read_text())
chapters = chapters.get('chapters', chapters) if isinstance(chapters, dict) else chapters
mapping = json.loads((OUT / 'lesson-map.json').read_text())


def text(fragment):
    fragment = re.sub(r'<span class="katex-mathml">.*?</span>', '', fragment, flags=re.S)
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', fragment))).strip()


# Lesson titles come from the course menu so they always match the kit.
index_html = (ROOT / 'index.html').read_text()
lessons = {}
for href, label in re.findall(r"<a class='cnav sub' href='(ch\d\.html#l\d+)'><span class='dot'></span><span>(.*?)</span></a>", index_html):
    page, anchor = href.split('#')
    key = page[:3] + ':' + anchor
    number, title = text(label).split('. ', 1)
    lessons[key] = {'href': href, 'n': int(number), 'title': title, 'chapter': page[:3]}
assert len(lessons) == 35, len(lessons)

# Every heading id and page id in the chapter files, for resolving and checking links.
headings, anchors = {}, {}
for page in ('ch1.html', 'ch2.html', 'ch3.html', 'ch4.html', 'ch5.html'):
    src = (ROOT / page).read_text()
    sections = [(m.start(), m.group(1), m.group(2)) for m in re.finditer(r"<section[^>]*data-page=['\"]([^'\"]+)['\"][^>]*data-title=['\"]([^'\"]+)['\"]", src)]
    anchors[page] = set(re.findall(r"(?:id|data-page)=['\"]([^'\"]+)['\"]", src))
    headings[page] = []
    for m in re.finditer(r"<h([234])[^>]*id=['\"]([^'\"]+)['\"][^>]*>(.*?)</h\1>", src, re.S):
        owner = [s for s in sections if s[0] < m.start()]
        headings[page].append((m.group(2), text(m.group(3)), owner[-1][1] if owner else '', html.unescape(owner[-1][2]) if owner else ''))


def resolve(link):
    if 'href' in link:
        page, anchor = link['href'].split('#')
        assert anchor in anchors[page], link
        return {'href': link['href'], 'label': link['label']}
    found = [h for h in headings[link['page']] if h[1].startswith(link['find'])]
    assert len(found) == 1, (link, [h[1] for h in found])
    anchor, title, owner, owner_title = found[0]
    short = title.split(' — ')[0]
    if re.fullmatch(r'l\d+', owner):
        label = f'Lesson {owner[1:]} · {short}'
    else:
        label = f'{owner_title} · {short.split(" ", 1)[0].rstrip(".")}'
    return {'href': f"{link['page']}#{anchor}", 'label': label, 'title': title.split(' — ', 1)[-1]}


def page_caption(file, page):
    return f'{file} · PDF page {page}'


used_images = set()


def image(path):
    path = path.replace('assets/archive-pages/', 'pages/').replace('assets/figures/', 'figures/')
    used_images.add(path)
    return 'archive/' + path


questions = []
for q in sorted(catalog, key=lambda q: q['order']):
    qid = q['id']
    assert qid in mapping['lessons'], f'no lessons mapped for {qid}'
    pages = [{'src': image(p), 'cap': page_caption(q['file'], q['pages'][i])}
             for i, p in enumerate(q.get('original_images') or [])]
    solutions, others = [], []
    for v in q['variants']:
        group = solutions if 'solution' in v['role'].lower() else others
        group.append({'role': v['role'], 'file': v['file'],
                      'pages': [{'src': image(f"assets/archive-pages/{v['source_id']}-p{p}.webp"), 'cap': page_caption(v['file'], p)} for p in v['pages']]})
    md = ''
    if q['curated']:
        md = q['markdown'].replace('](assets/figures/', '](archive/figures/')
        for fig in re.findall(r'\]\((archive/figures/[^)]+)\)', md):
            used_images.add(fig[len('archive/'):])
    search = re.sub(r'\s+', ' ', q.get('search_text') or '')[:1400]
    parts = {k: v for k, v in (q.get('chapter_parts') or {}).items() if not v.startswith('Whole question')}
    questions.append({
        'id': qid, 'group': q['group'], 'kind': q['kind'], 'year': q.get('year'),
        'label': q['source_label'], 'title': q['title'], 'reason': '' if 'Choose this question to practise' in q['reason'] else q['reason'], 'note': q.get('note') or '',
        'chapters': q['chapters'], 'parts': parts, 'lessons': mapping['lessons'][qid],
        'kit': [resolve(l) for l in mapping['kit'].get(qid, [])],
        'missing_prompt': q['status'] == 'prompt_missing', 'md': md,
        'pages': pages, 'answers_on_page': bool(q['source_has_answers']),
        'solutions': solutions, 'others': others, 'search': search,
    })

for extra in mapping['extra']:
    md, sol = '', ''
    if extra.get('md_file'):
        md, _, sol = (ROOT / extra['md_file']).read_text().partition('<!-- solution -->')
        md, sol = md.strip(), sol.strip()
    questions.append({
        'id': extra['id'], 'group': extra['group'], 'kind': extra['kind'], 'year': extra['year'],
        'label': extra['source_label'], 'title': extra['title'], 'reason': extra['reason'], 'note': extra.get('note', ''),
        'chapters': extra['chapters'], 'parts': {}, 'lessons': extra['lessons'],
        'kit': [resolve(l) for l in extra['kit']], 'missing_prompt': False, 'md': md, 'sol_md': sol,
        'link': extra.get('link'), 'pages': extra.get('pages', []),
        'answers_on_page': False, 'solutions': extra.get('solutions', []), 'others': [],
        'search': re.sub(r'[$\\{}]|\s+', ' ', md)[:1400], 'kit_only': bool(extra['kit']),
    })

ids = [q['id'] for q in questions]
assert len(ids) == len(set(ids))
for q in questions:
    for key in q['lessons']:
        assert key in lessons, (q['id'], key)
for chapter, route in mapping['routes'].items():
    for qid in route:
        assert qid in ids and chapter in next(q for q in questions if q['id'] == qid)['chapters'], (chapter, qid)

# Copy only the images in use; drop stale ones from earlier builds.
for sub in ('pages', 'figures'):
    target = OUT / sub
    target.mkdir(parents=True, exist_ok=True)
    wanted = {p.split('/', 1)[1] for p in used_images if p.startswith(sub + '/')}
    for old in target.iterdir():
        if old.name not in wanted:
            old.unlink()
    for name in wanted:
        src = CAT / 'assets' / ('archive-pages' if sub == 'pages' else 'figures') / name
        dst = target / name
        if not dst.exists() or dst.stat().st_size != src.stat().st_size:
            shutil.copyfile(src, dst)

data = {'chapters': [{'id': c, 'roman': ROMAN[c], 'title': CHAPTER_TITLES[c]} for c in ROMAN],
        'lessons': lessons, 'routes': mapping['routes'], 'questions': questions}
(OUT / 'data.js').write_text('/* generated by scripts/build-archive.py */\nwindow.EE361_ARCHIVE=' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n')

index = {'total': len(questions), 'chapters': {}, 'lessons': {}}
for c in ROMAN:
    inside = [q for q in questions if c in q['chapters']]
    index['chapters'][c] = {'n': len(inside), 'kit': sum(1 for q in inside if q['kit'] or q.get('sol_md'))}
for key in lessons:
    inside = [q for q in questions if key in q['lessons']]
    inside.sort(key=lambda q: (-(q['year'] or 0), q['kind'] not in ('Past exam', 'Solution only'), q['label']))
    index['lessons'][key] = [[q['id'], q['label'], q['title'], 1 if q['kit'] or q.get('sol_md') else 0] for q in inside]
(OUT / 'lesson-index.js').write_text('/* generated by scripts/build-archive.py */\nwindow.EE361_ARCHIVE_INDEX=' + json.dumps(index, ensure_ascii=False, separators=(',', ':')) + ';\n')

# archive.html reuses the question index page so the menu, head and scripts stay identical.
template = (ROOT / 'questions.html').read_text()
main = '''<main id="main">
<section class='page' data-page='home' data-title='Past exams'>
<div class='crumb'>EE361 · past exams</div>
<h1>Past exams, sorted by lesson</h1>
<p class='lede'>Every question from the three supplied archives (MT1, MT2, Final 2014–2024, plus homework, recitation and solved sets), with this term's Quiz 1, the chapter problem sets posted on ODTUClass and last year's Midterm 1. Pick a chapter or lesson, try the question from the original pages, then open the supplied solution or the kit's worked solution.</p>
<div id='ax-app' class='ax'><p class='ax-loading'>Loading the archive…</p></div>
<noscript><p>This page needs JavaScript. The worked archive problems are listed in the <a href='questions.html'>exam question index</a>.</p></noscript>
</section>
</main>'''
page = re.sub(r'<main id="main">.*?</main>', lambda m: main, template, flags=re.S)
page = re.sub(r'<title>.*?</title>', '<title>EE361 past exams</title>', page)
page = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="Every EE361 past exam question (2014–2026) sorted by chapter and lesson, with original pages, supplied solutions and links to worked solutions.">', page)
page = re.sub(r'<div class="brand">.*?</div>', '<div class="brand">EE361 · Past exams<small>Every archive question, by lesson</small></div>', page, flags=re.S)
page = page.replace("data-prev-href='tools.html' data-prev-title='Interactive tools'", "data-prev-href='questions.html' data-prev-title='Exam question index'")
page = page.replace("class='cnav on' href='questions.html'", "class='cnav' href='questions.html'")
page = page.replace("<a class='cnav' href='questions.html'><span class='dot'>?</span><span>Exam question index</span></a>",
                    "<a class='cnav' href='questions.html'><span class='dot'>?</span><span>Exam question index</span></a><a class='cnav on' href='archive.html'><span class='dot'>✎</span><span>Past exams archive</span></a>")
assert 'archive.html' in page and "data-page='home' data-title='Past exams'" in page
page = page.replace("<script src='assets/course.js'></script>", "<script src='assets/course.js'></script>\n<script src='archive/data.js'></script>\n<script src='assets/archive.js'></script>")
(ROOT / 'archive.html').write_text(page)


def version(path):
    return hashlib.sha256((ROOT / path).read_bytes()).hexdigest()[:12]


block = ('<!-- archive-links -->\n'
         f'<link rel="stylesheet" href="assets/archive.css?v={version("assets/archive.css")}">\n'
         f'<script defer src="archive/lesson-index.js?v={version("archive/lesson-index.js")}"></script>\n'
         f'<script defer src="assets/archive-links.js?v={version("assets/archive-links.js")}"></script>\n'
         '<!-- /archive-links -->')
for path in sorted(ROOT.glob('*.html')):
    src = path.read_text()
    if 'class="shell"' not in src and "class='shell'" not in src:
        continue
    src = re.sub(r'<!-- archive-links -->.*?<!-- /archive-links -->\s*', '', src, flags=re.S)
    path.write_text(src.replace('</head>', block + '\n</head>', 1))

with_kit = sum(1 for q in questions if q['kit'])
solution_pages = sum(1 for q in questions if q['solutions'] or q['answers_on_page'] or q.get('sol_md'))
print(json.dumps({'questions': len(questions), 'from_catalog': len(catalog), 'kit_only': len(mapping['extra']),
                  'with_kit_solution': with_kit, 'with_supplied_answers': solution_pages,
                  'no_solution_at_all': sum(1 for q in questions if not q['kit'] and not q['solutions'] and not q['answers_on_page'] and not q.get('sol_md')),
                  'images': len(used_images), 'per_chapter': index['chapters']}, indent=1))
