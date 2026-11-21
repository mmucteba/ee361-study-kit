// markdown with $$ display math to static html, for scripts/build-mt1.py
// reads a json array of markdown strings on stdin, writes a json array of html
const path = require('path');
const root = path.resolve(__dirname, '..');
const { marked } = require(path.join(root, 'assets/vendor/marked.min.js'));
const katex = require(path.join(root, 'assets/katex/katex.min.js'));

// split a display block at top-level \qquad so each statement gets its own line
function statements(tex) {
  const out = [];
  let depth = 0, start = 0;
  for (let i = 0; i < tex.length; i++) {
    const c = tex[i];
    if (c === '{') depth++;
    else if (c === '}') depth--;
    else if (depth === 0 && tex.startsWith('\\qquad', i) && !/[a-zA-Z]/.test(tex[i + 6] || '')) {
      out.push(tex.slice(start, i));
      start = i + 6;
    }
  }
  out.push(tex.slice(start));
  return out.map((s) => s.trim().replace(/,$/, '').trim()).filter(Boolean);
}

// inline mode with displaystyle lets long chains wrap after = and + on narrow screens
function display(tex) {
  return statements(tex).map((s) => "<div class='mt1-eq'>" + katex.renderToString('\\displaystyle ' + s, { displayMode: false, throwOnError: true, strict: 'ignore' }) + '</div>').join('\n');
}

// plain-text subscripts such as R_c, v_an, Z_Δ become <sub>
function subscripts(md) {
  return md.replace(/(?<![\\A-Za-z_])([A-Za-zα-ωΑ-Ω]{1,3})\\?_([A-Za-z0-9α-ωΑ-Ω]{1,6})(?![\w])/g, '$1<sub>$2</sub>');
}

function render(md) {
  const math = [];
  const plain = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
    math.push(display(tex.trim()));
    return '\n\nMDMATH' + (math.length - 1) + 'END\n\n';
  });
  return marked.parse(subscripts(plain), { gfm: true })
    .replace(/<p>MDMATH(\d+)END<\/p>/g, (_, n) => math[+n])
    .replace(/MDMATH(\d+)END/g, (_, n) => math[+n]);
}

let input = '';
process.stdin.on('data', (c) => { input += c; });
process.stdin.on('end', () => { process.stdout.write(JSON.stringify(JSON.parse(input).map(render))); });
