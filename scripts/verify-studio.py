#!/usr/bin/env python3
"""Check reader contrast, local assets/anchors and preservation of course bodies.

No browser state is read or written. The baseline is the published course commit
before the UI work; update it intentionally only if educational content changes.
"""
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
BASE = '04d5d78'


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids, self.refs = set(), []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        for key in ('id', 'data-page'):
            if key in a:
                self.ids.add(a[key])
        attr = 'href' if tag in ('a', 'link') else 'src' if tag in ('img', 'script') else None
        if attr and a.get(attr):
            self.refs.append(a[attr])


css = (ROOT / 'assets/studio.css').read_text()
base = re.search(r':root,:root\[data-theme\]\{(.*?)\n\}', css, re.S).group(1)


def properties(text):
    return dict(re.findall(r'(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{6})', text))


def luminance(color):
    rgb = [int(color[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    linear = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in rgb]
    return sum(x * weight for x, weight in zip(linear, (0.2126, 0.7152, 0.0722)))


def contrast(foreground, background):
    lo, hi = sorted((luminance(foreground), luminance(background)))
    return (hi + 0.05) / (lo + 0.05)


ratios = {}
for theme in ('paper', 'cloud', 'sage', 'dusk', 'night'):
    values = properties(base)
    override = re.search(r':root\[data-theme="' + theme + r'"\]\{([^}]+)\}', css)
    if override:
        values.update(properties(override.group(1)))
    pairs = [(fg, bg) for fg in ('--ink', '--ink2', '--mut', '--accent')
             for bg in ('--bg', '--panel', '--soft', '--hero', '--accent-soft')]
    pairs += [('--accent-ink', '--accent'), ('--good', '--good-soft'), ('--warn', '--warn-soft')]
    measured = {fg + '/' + bg: contrast(values[fg], values[bg]) for fg, bg in pairs}
    assert min(measured.values()) >= 4.5, (theme, measured)
    ratios[theme] = round(min(measured.values()), 3)

files = {p.name: Document(p.read_text()) for p in ROOT.glob('*.html')}
checked_refs, preserved = 0, []
for name, document in files.items():
    text = (ROOT / name).read_text()
    is_new = subprocess.run(['git', 'cat-file', '-e', BASE + ':' + name], cwd=ROOT, capture_output=True).returncode != 0
    if ('class="shell"' in text or "class='shell'" in text) and not is_new:
        original = subprocess.check_output(['git', 'show', BASE + ':' + name], cwd=ROOT, text=True)
        # Head-only integration must not rewrite any lesson, equation or script.
        assert text.split('</head>', 1)[1] == original.split('</head>', 1)[1], name
        assert text.count('<!-- study-studio -->') == 1, name
        preserved.append(name)
    for ref in document.refs:
        parsed = urlsplit(ref)
        if parsed.scheme or parsed.netloc:
            continue
        target = unquote(parsed.path) or name
        assert (ROOT / target).is_file(), (name, ref)
        if parsed.fragment and target in files:
            assert unquote(parsed.fragment) in files[target].ids, (name, ref)
        checked_refs += 1

print(json.dumps({'minimum_text_contrast_by_theme': ratios,
                  'unchanged_course_bodies': preserved,
                  'local_links_assets_and_anchors_checked': checked_refs}, indent=2))
