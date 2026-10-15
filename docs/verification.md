# Website verification

## Current student resource policy

On 15 October 2026, all four downloadable test papers were removed from the published directory and catalogue, along with the Test papers filter and homepage metadata reference. The original teacher documents remain in their class folders. The current site has 6 resources and 17 published files: notes, interactive practice and MCQ revision banks. Static validation rejects test-paper catalogue entries and Word files in the published directory. Browser checks passed again at all four viewport sizes after removal. Updates are published to both the root-site repository and the earlier project-site repository so old direct links also stop serving papers.

The checks below document the earlier initial publication; their 10-resource and 21-file counts predate test-paper removal.

Static validation passed for all 10 catalogue resources and 21 published files. All relative links resolve, and resource metadata has valid class/type values. The site has no root-absolute asset paths, making it suitable for a GitHub Pages repository subpath.

Browser checks passed at 1440 × 1000, 768 × 1024, 390 × 844 and 320 × 900. Home and filtered library have no horizontal overflow. All logo/portrait images load. Class shortcuts, combined type filters, search, empty state, clearing filters and bookmarked filter URLs work. Class shortcuts also move keyboard focus to the resource heading.

Both MCQ readers have exactly 50 questions and can reveal/hide solutions. Both full notes readers have 16 sections, support collapse/expand and expand for printing while restoring the previous state afterwards. Their 320px layouts fit the viewport.

Both embedded chapter pages load their logos and respond to Test, Cards and card flipping; Next remains available after flipping. Invalid resource/bank IDs show an unavailable message. No JavaScript exceptions were recorded. Test paper files are copied from the final solutions-bearing originals. The original standalone chapter files are copied without altering their content or progress storage.

Screenshots were inspected for laptop home, laptop library, mobile home and mobile embedded practice. Internal screenshots and browser logs are retained under `tmp/browser-qa`, excluded from Git. Automated validation is available in `scripts/verify-static.cjs` and `scripts/browser-qa.cjs`.

## Live publication

Published on 15 October 2026 at https://shahzad-zad.github.io/shahzad-learning-hub/ from https://github.com/shahzad-zad/shahzad-learning-hub. GitHub Actions deployment run 38695950993 completed successfully. All 21 published files returned HTTP 200 and matched the reviewed local files, comparing text with normalised line endings and binary files byte for byte. This includes all four Word downloads, both complete embedded chapters and both full note readers.

The browser checks above were also repeated successfully against the live GitHub Pages repository subpath, including all four viewport sizes and embedded card interactions. No further site changes were needed after these checks.

## Short website address

On 15 October 2026, the same website was published at https://shahzad-zad.github.io/ from the new repository https://github.com/shahzad-zad/shahzad-zad.github.io. GitHub Actions deployment run 38699788223 completed successfully. All browser interaction checks were repeated successfully at this root address, including laptop, tablet, mobile, note readers, banks and both embedded chapter pages. Future updates push to the new repository through the `origin` remote; the previous project repository is retained as `legacy`.

Run `node scripts/verify-live.cjs` to verify the current website files and `node scripts/browser-qa.cjs https://shahzad-zad.github.io/` for live browser checks.

## Personal branding and class pages

The personal logo replaces the school crest throughout the website and copied chapter pages. Homepage school attribution, teacher caption, Start here label, global resource library and global search have been removed. Four class links open class-specific sections and search. A separate portfolio presents all nine original projects. The portrait links to the portfolio and reveals About your teacher on hover and keyboard focus, with a visible touch-device label. Browser checks cover all class pages at laptop, tablet, mobile and 320px widths; class-scoped search, bookmarks, empty states, portfolio details, notes and both embedded chapter pages pass. Current site files total 19, with six student resources.

## Chapter cards

Navigation is Class card → numerically ordered chapter cards → resource cards for notes, practice and MCQ banks. Each class has its own search, and each chapter shows only its relevant resources. Chapters are grouped by subject and chapter number and sorted by chapter number, so future catalogue additions appear in the correct order automatically. Only prepared chapters are shown; currently Chapter 2 is available in each class.
