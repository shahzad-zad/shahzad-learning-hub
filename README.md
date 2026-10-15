# Shahzad's Learning Hub

A student website for Classes 9–12 at The Educators (Daharki Campus), using the existing Educators dark theme and content adapted from Shahzad's local portfolio.

Website: https://shahzad-zad.github.io/

Repository: https://github.com/shahzad-zad/shahzad-zad.github.io

## Open locally

Open `site/index.html` directly, or run `python -m http.server 8767 --bind 127.0.0.1 --directory site` from this folder and visit http://127.0.0.1:8767. The website has no package installation or build requirement.

## Included resources

| Class | Chapter | Available |
| --- | --- | --- |
| 9 | Kinematics | 50-MCQ revision reader and 16-MCQ Word paper with solutions |
| 10 | Sound | 50-MCQ revision reader and 16-MCQ Word paper with solutions |
| 11 | Kinematics | Full notes, embedded cards and MCQs, 20-MCQ Word paper with solutions |
| 12 | First Law of Thermodynamics | Full notes, embedded cards and MCQs, 20-MCQ Word paper with solutions |

The library can filter by class, subject and resource type and search by chapter or topic. Filter links can be bookmarked. Practice pages run in an iframe or open separately. Notes and banks support printing. Test-paper downloads are explicitly labelled as containing solutions; print only their question pages when setting a classroom test. Existing progress stays local to the student's browser. No accounts, student uploads or server CMS are included.

## Folder layout

- `site/`: complete website and student resources, the only folder deployed.
- `content/resources.json`: resource metadata and original file references.
- `scripts/`: sync, validation, browser QA and publishing helpers.
- `portfolio-reference/`: local copy of selected public portfolio source and content, ignored by Git.
- `design.md`: theme, structure and accessibility decisions.
- `docs/`: content maintenance, provenance, publishing and validation notes.
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow.

## Updating resources

See `docs/content-guide.md`. Run `node scripts/sync-materials.cjs` on this computer after editing original teaching files or portfolio data. Run `node scripts/verify-static.cjs` after updates. The published site is self-contained; the original portfolio folder is not needed to view it.

## GitHub Pages

User-site repository: `shahzad-zad.github.io`. See `docs/github-pages.md` for publication and updates. Never upload `portfolio-reference`, `tmp`, textbook PDFs or credentials. The deployment workflow uploads only `site`, not the rest of the workspace.
