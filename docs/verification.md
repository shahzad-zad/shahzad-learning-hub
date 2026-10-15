# Verification

The current site has 12 resources across four Chapter 2 pages: 16 note sections per class; 50 MCQs and 50 cards for Classes 9 and 10; 60 MCQs and 36 cards for Classes 11 and 12. Test papers are excluded.

`node scripts/verify-static.cjs` validates paths, metadata and catalogue entries and rejects teacher papers in the published directory.

`node scripts/browser-qa.cjs` checks local navigation, scoped searches, notes, portfolio and viewport fit at 1440, 768, 390 and 320 pixels. It checks card flips with Next available, correct and incorrect MCQ feedback, topic filtering and JavaScript exceptions. Screenshots and results are saved under ignored `tmp/browser-qa`.

`node scripts/verify-live.cjs` compares published files with local files, normalising text line endings and comparing binary assets byte for byte. Run `node scripts/browser-qa.cjs https://shahzadgullabbhatti.github.io/` for published browser checks.

Validation covers the prepared Chapter 2 materials; other textbook chapters are not yet available.
