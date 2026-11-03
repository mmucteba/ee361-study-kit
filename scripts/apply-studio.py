#!/usr/bin/env python3
"""Idempotently attach the shared reader UI after exporting the course HTML.

This touches head assets only; original lesson markup, scripts and anchors stay
in place. Run from any directory: python3 scripts/apply-studio.py
"""
from pathlib import Path
from hashlib import sha256
import re

root = Path(__file__).resolve().parents[1]
js_version = sha256((root / 'assets/studio.js').read_bytes()).hexdigest()[:12]
css_version = sha256((root / 'assets/studio.css').read_bytes()).hexdigest()[:12]
block = '''<!-- study-studio -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Source+Serif+4:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<script src="assets/studio.js?v=JS_VERSION"></script>
<link rel="stylesheet" href="assets/studio.css?v=CSS_VERSION">
<!-- /study-studio -->'''.replace('JS_VERSION', js_version).replace('CSS_VERSION', css_version)
for path in sorted(root.glob('*.html')):
    src = path.read_text()
    if 'class="shell"' not in src and "class='shell'" not in src:
        continue  # course.html is a legacy redirect
    src = re.sub(r'<!-- study-studio -->.*?<!-- /study-studio -->\s*', '', src, flags=re.S)
    src = re.sub(r'<link[^>]+href=["\']https://fonts.googleapis.com/css2[^>]+>\s*', '', src)
    src = src.replace('</head>', block + '\n</head>')
    path.write_text(src)
    print(path.name)
