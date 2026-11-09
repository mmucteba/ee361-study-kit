# EE361 Study Kit — the whole course, connected

Study site for METU EE361 Electromechanical Energy Conversion I (2026 syllabus), all five chapters as one connected course.

**Open the site:** https://mmucteba.github.io/ee361-study-kit/

## Reading experience

Open **Aa · Appearance** in the top bar to choose Paper, Cloud, Sage, Dusk or Night, or follow your device setting. Text size (16–24 px), sans/serif type, line spacing and reading width are adjustable. Preferences are saved separately from the two existing learning-progress keys. Resetting appearance never clears lesson marks.

The shared UI adds course/lesson navigation, lesson search (`⌘/Ctrl K`), a phone course menu, focus mode (`F`), an outline for the generated lessons on wide screens, and a reading-position indicator. Native dialogs support keyboard navigation and Escape. Motion is suppressed when the device requests reduced motion. Scientific diagrams keep their original colors and white image backgrounds; long equations and tables scroll within their containers.

`assets/studio.js` applies saved colors before first paint and adds the presentation controls after the original readers initialize. `assets/studio.css` supplies the shared visual layer. HTML integration changes head assets only; educational markup, original routers/calculators, anchors and progress handlers remain in place. A normal static server and GitHub Pages both work; no application backend or new framework is required.

After exporting fresh course HTML into this repository, retain the Studio assets and run:

```sh
python3 scripts/apply-studio.py
python3 scripts/verify-studio.py
```

The first script is idempotent and fingerprints both asset URLs so updates do not keep using an older CSS/JS file. The second checks palette text contrast, local links/assets/anchors and preservation of all nine published course bodies against the pre-UI commit. It does not claim a complete accessibility or scientific-content audit. Palette checks use the [WCAG text-contrast calculation](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html); flexible text controls follow the intent of [user-adjustable text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html). Theme choices support reading comfort and personal preference, without medical claims.

This public repository is the current connected-site source. The older private course checkout's `site/` folder must not be copied over it wholesale; its Chapter I entry-point/navigation structure predates the connected-site export.

## Past exams archive

`archive.html` lists every question from the three supplied EE361 archives (MT1, MT2, Final 2014–2024, homework, recitation and solved sets) plus this term's Quiz 1 and last year's MT1: 118 entries. Filter by chapter, lesson, paper, solved/review status or "worked in the kit"; open a question to see the original pages, the supplied solution pages (folded, so you can try first) and links to the kit's own worked solution where one exists. Every lesson now ends with a "Past exam practice" box listing its archive questions, and each chapter page links to its part of the archive. Solved/review marks and "my set" are kept in the browser (`ee361-archive-status-v1`, `ee361-archive-set-v1`), separate from lesson progress.

The data comes from the private catalog (`EE361/assistant/question-bank/past-exams-2026`) and `archive/lesson-map.json` (question → lessons, kit solutions, suggested order per chapter). After editing either, run:

```sh
python3 scripts/build-archive.py --catalog ../EE361/assistant/question-bank/past-exams-2026
python3 scripts/verify-studio.py
```

The builder copies only the page images it uses into `archive/`, regenerates `archive.html` from `questions.html` so the menus match, and adds one head block to each page. Lesson bodies are not edited; the practice boxes and menu entry are added by `assets/archive-links.js`. Supplied keys are shown as printed and were not re-checked.

| Page | Contents |
| --- | --- |
| `index.html` | Course home: all chapters with progress, "continue" link, printable PDFs |
| `ch1.html` | Chapter I · Introduction to Power Systems — 13 interactive lessons, question bank, formula sheet, glossary |
| `ch2.html` | Chapter II · Magnetic Circuits — Lessons 10–16 |
| `ch3.html` | Chapter III · Transformers — Lessons 17–21 + solved archive problems (Ch. II–III) |
| `ch4.html` | Chapter IV · Electromechanical Conversion and DC Machines — Lessons 22–26 + DC-machine archive problems |
| `ch5.html` | Chapter V · Power Electronics — Lessons 27–31 |
| `tools.html` | Interactive tools: magnetic circuit with air gap, transformer loading, force and torque, DC machine and starter, buck/boost converters, diode rectifiers |
| `questions.html` | Every solved exam and textbook question of the course, with links |
| `archive.html` | All 118 past exam questions by chapter and lesson, with original pages and supplied solutions |
| `reference.html` | Formula summaries and one English–Turkish glossary for the whole course |
| `pdf/` | Printable PDFs of Chapters II–V |

Every page has the same course menu (all chapters and their lessons), one progress bar for all 35 lessons, and previous/next links that run from Chapter I through Chapter V. Older links such as `index.html#l5` now open `ch1.html#l5`. Progress is stored only in your browser.

Lessons for Chapters II–V give goals, derivations, figures, common mistakes, worked examples from simple to exam level, practice with hidden solutions, a summary, EN–TR vocabulary and source pages. Chapter V has no teacher lecture notes in the supplied material and follows the syllabus and Sen, *Principles of Electric Machines and Power Electronics* (3rd ed.), Ch. 10.

All numbers were checked with executable scripts; where a printed key disagrees, the solution explains why. Exam questions and figures belong to the METU EE361 instructors and are included for study. Textbook PDFs are not included. This site is generated from Markdown lessons maintained in a private course repository; the site was browser-tested at desktop and phone widths before publishing.
