# Shahzad Learning Hub

Personal student website by Sir Shahzad Gullab Bhatti.

Website: https://shahzad-zad.github.io/

Repository: https://github.com/shahzad-zad/shahzad-zad.github.io

## Student flow

The homepage shows four class cards. Each opens `class.html?class=9` (or 10, 11, 12), with search restricted to that class and separate sections for its available notes, practice and MCQ banks. There is no global resource library or homepage search. Test-paper files are not published.

The Portfolio navigation link and homepage picture open `portfolio.html`, containing the biography, qualifications and all nine projects from the supplied portfolio. Hovering or focusing the picture reveals About your teacher; this label stays available on touch devices. The homepage has no teacher caption, Start here label or school branding.

## Resources

| Class | Chapter | Available |
| --- | --- | --- |
| 9 | Kinematics | 50-question MCQ revision bank |
| 10 | Sound | 50-question MCQ revision bank |
| 11 | Kinematics | Full notes and embedded cards and MCQs |
| 12 | First Law of Thermodynamics | Full notes and embedded cards and MCQs |

## Maintain

`site` is the only published folder. `content/resources.json` defines class resources. `scripts/sync-materials.cjs` refreshes the teaching copies, new personal logo, generated notes and separate portfolio. The original class files and portfolio remain untouched. School branding in the copied chapter headers is replaced during syncing; scientific content and progress keys are preserved. Personal logo source: `../Educators-Master/assets/Shahzad-logo.png`.

Preview with `python -m http.server 8767 --bind 127.0.0.1 --directory site`. Run `node scripts/verify-static.cjs` and the browser checks after changing navigation or content. Commit and push to `origin/main` to publish at the root address; `legacy` retains the previous project-site repository. Publishing requires no application build or package installation.

The local `portfolio-reference` and `tmp` folders are excluded from Git. The original teacher test documents remain in their class folders. Student progress is stored only in the student's browser.

## Chapter cards

Navigation is Class card → numerically ordered chapter cards → resource cards for notes, practice and MCQ banks. Each class has its own search, and each chapter shows only its relevant resources. Chapters are grouped by subject and chapter number and sorted by chapter number, so future catalogue additions appear in the correct order automatically. Only prepared chapters are shown; currently Chapter 2 is available in each class.
