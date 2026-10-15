# Adding and updating student resources

1. Put the final student file in `site/materials/class-9`, `class-10`, `class-11` or `class-12`. Prefer lowercase filenames with hyphens and no spaces. For an HTML page, copy all its required images, CSS and scripts beside it, or use a verified standalone HTML file.
2. Add an entry to `content/resources.json` with a unique `id`, numeric `class`, `subject`, numeric `chapter`, `title`, `description`, `type`, `url`, `format` and `detail`. Supported student resource types are `notes`, `practice` and `bank`. Test-paper documents remain in the original class folders for teacher use. The URL is relative to `site`. Optional `source` is a file path relative to F:/Teaching/Educator which the sync helper copies to `url`.
3. Run `node scripts/sync-materials.cjs`. Resources are grouped within the selected class. Each resource displays its subject; class search matches subject, chapter, title and description.
4. Run `node scripts/verify-static.cjs`, preview at phone and laptop widths, then commit and push. GitHub Actions validates and publishes the update.

Example entry:

```json
{
  "id": "x-maths-chapter-2-notes",
  "class": 10,
  "subject": "Mathematics",
  "chapter": 2,
  "title": "Chapter 2 Notes",
  "description": "Worked examples and chapter revision.",
  "type": "notes",
  "url": "materials/class-10/maths-chapter-2-notes.pdf",
  "format": "PDF",
  "detail": "Notes and examples"
}
```

For practice entries, the hub automatically links to the embedded viewer. Any HTML file added as a practice resource must work independently at its copied path. For notes, use HTML or PDF to read in the browser. Do not add test-paper files to the published directory.

The generated `site/data/catalog.js` is output; edit the source JSON. The homepage has class links only, and search lives on `class.html`. The generated Class 11 and 12 note readers are extracted from each original `content.js` and will be replaced on sync. Keep permanent chapter-content edits in the original class folder. The hub intentionally includes only the reviewed Chapter 2 materials, not every unrelated draft or assessment in the workspace.

## Chapter cards

Navigation is Class card → numerically ordered chapter cards → resource cards for notes, practice and MCQ banks. Each class has its own search, and each chapter shows only its relevant resources. Chapters are grouped by subject and chapter number and sorted by chapter number, so future catalogue additions appear in the correct order automatically. Only prepared chapters are shown; currently Chapter 2 is available in each class.
