# Maintaining chapter content

Run `node scripts/sync-materials.cjs` to rebuild. `scripts/build-study.cjs` defines the four prepared chapters and produces Notes, Cards and MCQs for each. It generates both `content/resources.json` and `site/data/catalog.js`; change the builder for permanent catalogue changes.

Class 9 and 10 questions come from their original `physics-mcq-bank/chapter-2-mcq-bank.json` files. Cards use the same prompts, answers and solutions with options omitted. Edit `content/junior-notes.json` for their notes. Classes 11 and 12 use NOTES, QUESTIONS and TOPICS from their original `chapter-2-practice/content.js`. Non-MCQ questions become flip cards.

To add another chapter, extend the builder and study routing with its class, subject, chapter number, notes and question data. Each catalogue entry needs a unique ID, numeric class and chapter, subject, title, type, description, relative URL, format and detail. Overviews automatically group and sort the catalogue.

Run static validation and browser QA before publishing. Only `site` is published. Keep teacher test papers outside `site`. The portfolio adaptation is rebuilt by `scripts/build-portfolio.cjs`; original portfolio files remain untouched.
