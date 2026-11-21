#!/usr/bin/env python3
"""Build mt1.html, the MT1 practice page, from mt1/questions.md and mt1/solutions.md.

Questions and solutions are plain markdown (display math in $$ blocks, figures in
mt1/img). They are rendered to static html with the kit's own marked and KaTeX
(scripts/render-md.js, needs node), so the page works without loading anything.
The page reuses questions.html for the head, menus and scripts. Safe to run again;
run scripts/build-archive.py afterwards so the head block versions stay current.

  python3 scripts/build-mt1.py
"""
import html
import json
import re
import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'mt1'

# one line per question for the overview cards
TOPICS = {
    'a1': 'Single-phase power, power factor at two points, a PV feeder with a capacitor bank',
    'a2': 'Three-phase power factor correction, Y and Δ loads through lines, instantaneous power',
    'a3': 'Δ motor through a cable, grid-side Y capacitor bank, half-load power factor',
    'a4': 'Two parallel loads through a line, generator voltage, line loss, capacitor connection',
    'b1': 'Three coils on a gapped core with a nonlinear B-H segment',
    'b2': 'Three parallel gaps: flux densities, self and mutual inductance, series coils',
    'b3': 'Gapped E-core inductor: reluctance, saturation, core and copper losses',
    'b4': 'Two coils and a variable gap: inductances, induced voltage, equivalent circuit',
    'b5': 'Toroid inductor, saturation current, common-mode choke',
    'c1': 'Distribution transformer: referred circuit, primary voltage, losses, 60 Hz',
    'c2': 'OC and SC test sides, series impedance, maximum efficiency, turns, core length',
    'c3': 'Equivalent-circuit reasoning, efficiency and parameters from measured waveforms',
    'c4': 'True or false, reading a phasor diagram, OC and SC tests, efficiency',
}
PART_NOTE = {
    'a': 'Chapter I. Complex power, power factor correction, three-phase Y and Δ circuits.',
    'b': 'Chapter II. Reluctance circuits, B-H curves, inductance, losses.',
    'c': 'Chapter III, first half. Single-phase transformers only.',
}


def split(md):
    """Return [(part_title, [(heading, body), ...]), ...] from # and ## headings."""
    parts = []
    for chunk in re.split(r'^# ', md, flags=re.M)[1:]:
        title, _, rest = chunk.partition('\n')
        items = []
        for q in re.split(r'^## ', rest, flags=re.M)[1:]:
            heading, _, body = q.partition('\n')
            items.append((heading.strip(), body.strip()))
        parts.append((title.strip(), items))
    return parts


questions = split((SRC / 'questions.md').read_text())
solutions = {h.split(' ')[0].lower(): body for _, items in split((SRC / 'solutions.md').read_text()) for h, body in items}

order, sources = [], []
for title, items in questions:
    for heading, body in items:
        qid = heading.split(' ')[0].lower()
        assert qid in solutions and qid in TOPICS, qid
        order.append(qid)
        sources += [body, solutions[qid]]
assert len(order) == len(set(order)) == len(solutions) == len(TOPICS)

rendered = json.loads(subprocess.run(['node', str(ROOT / 'scripts/render-md.js')], input=json.dumps(sources),
                                     capture_output=True, text=True, check=True).stdout)


def figure(m):
    src, alt = m.group(1), m.group(2)
    w, h = Image.open(ROOT / src).size
    return f"<p class='fig'><img src='{src}' alt='{alt}' width='{w}' height='{h}' loading='lazy'></p>"


def tidy(fragment):
    fragment = re.sub(r'<p><img src="([^"]+)" alt="([^"]*)"></p>', figure, fragment)
    fragment = fragment.replace('<table>', "<div class='tbl'><table>").replace('</table>', '</table></div>')
    assert '<img src="' not in fragment, fragment
    return fragment.strip()


html_parts = iter(tidy(f) for f in rendered)
pages, cards, rail = [], [], []
for title, items in questions:
    key = title.split(' ')[1].lower()
    short = title.split(' (')[0]
    rail.append(f"<a class='nav' href='#{key}' data-id='{key}'><span class='dot'>{key.upper()}</span><span>{html.escape(short)}</span></a>")
    body = []
    for heading, _ in items:
        qid = heading.split(' ')[0].lower()
        label, points = re.match(r'(.*?)\s*\((\d+ pts|this term)\)$', heading).groups()
        q_html, s_html = next(html_parts), next(html_parts)
        body.append(f"<h2 id='{qid}'>{html.escape(label)} <span class='mt1-pts'>{points}</span></h2>\n{q_html}\n"
                    f"<details class='sol'><summary>Solution</summary><div class='solbody'>\n{s_html}\n</div></details>")
        cards.append(f"<a href='#{qid}'><span class='k'>{html.escape(label.split(' · ')[0])} · {points}</span>"
                     f"<b>{html.escape(label.split(' · ', 1)[1])}</b><small>{html.escape(TOPICS[qid])}</small></a>")
    pages.append(f"<section class='page' data-page='{key}' data-title='{html.escape(short)}'>\n"
                 f"<div class='crumb'>EE361 · MT1 practice</div>\n<h1>{html.escape(short)}</h1>\n"
                 f"<p class='lede'>{PART_NOTE[key]} Try each question first, then open its solution.</p>\n"
                 + '\n'.join(body) + '\n</section>')

overview = ["<section class='page' data-page='home' data-title='MT1 practice'>",
            "<div class='crumb'>EE361 · MT1 practice</div>",
            '<h1>MT1 practice set</h1>',
            "<p class='lede'>MT1 is on Monday 23 November at 18:00: three questions on Chapter I, Chapter II and "
            'single-phase transformers (first half of Chapter III). Each part below matches one exam question. '
            'For a mock exam, take one question from each part. Every solution is folded under its question.</p>']
i = 0
for (title, items), key in zip(questions, 'abc'):
    overview.append(f"<h2>{html.escape(title)}</h2>\n<div class='home-grid'>" + ''.join(cards[i:i + len(items)]) + '</div>')
    i += len(items)
overview.append('</section>')

main = '<main id="main">\n' + '\n'.join(overview) + '\n' + '\n'.join(pages) + '\n</main>'
style = ('<style>.mt1-pts{font-size:.72rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;'
         'color:var(--mut);margin-left:.4rem;white-space:nowrap}'
         '.page details.sol .solbody>:first-child{margin-top:.2rem}'
         '.mt1-eq{margin:.75rem 0;text-align:center;overflow-x:auto;overflow-y:hidden;padding:.15rem 0;line-height:2.4}'
         '.mt1-eq .katex{font-size:1.08em}</style>')

template = (ROOT / 'questions.html').read_text()
page = re.sub(r'<main id="main">.*?</main>', lambda m: main, template, flags=re.S)
page = re.sub(r'<title>.*?</title>', '<title>EE361 MT1 practice</title>', page)
page = re.sub(r'<meta name="description" content="[^"]*">',
              '<meta name="description" content="EE361 MT1 practice set: 13 past exam questions on AC power, magnetic circuits and single-phase transformers, each with a full worked solution.">', page)
page = re.sub(r'<div class="brand">.*?</div>', '<div class="brand">EE361 · MT1 practice<small>13 questions with full solutions</small></div>', page, flags=re.S)
page = page.replace('<nav id="railnav"></nav>', "<nav id=\"railnav\"><div class='grp'>MT1 practice</div><a class='nav' href='#home' data-id='home'><span class='dot'>●</span><span>Overview</span></a>" + ''.join(rail) + '</nav>')
page = page.replace("data-prev-href='tools.html' data-prev-title='Interactive tools'", "data-prev-href='archive.html' data-prev-title='Past exams archive'")
page = page.replace("class='cnav on' href='questions.html'", "class='cnav' href='questions.html'")
page = page.replace("<a class='cnav' href='questions.html'><span class='dot'>?</span><span>Exam question index</span></a>",
                    "<a class='cnav' href='questions.html'><span class='dot'>?</span><span>Exam question index</span></a>"
                    "<a class='cnav' href='archive.html'><span class='dot'>✎</span><span>Past exams archive</span></a>"
                    "<a class='cnav on' href='mt1.html'><span class='dot'>M</span><span>MT1 practice</span></a>")
page = page.replace('</head>', style + '\n</head>', 1)
assert "href='mt1.html'" in page and "data-page='home' data-title='MT1 practice'" in page and 'id="railnav"><div' in page
(ROOT / 'mt1.html').write_text(page)
print(json.dumps({'questions': len(order), 'figures': page.count("<p class='fig'>"),
                  'display_equations': page.count("class='mt1-eq'"), 'bytes': len(page.encode())}))
