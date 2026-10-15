# Website verification

Static validation passed for all 10 catalogue resources and 21 published files. All relative links resolve, and resource metadata has valid class/type values. The site has no root-absolute asset paths, making it suitable for a GitHub Pages repository subpath.

Browser checks passed at 1440 × 1000, 768 × 1024, 390 × 844 and 320 × 900. Home and filtered library have no horizontal overflow. All logo/portrait images load. Class shortcuts, combined type filters, search, empty state, clearing filters and bookmarked filter URLs work. Class shortcuts also move keyboard focus to the resource heading.

Both MCQ readers have exactly 50 questions and can reveal/hide solutions. Both full notes readers have 16 sections, support collapse/expand and expand for printing while restoring the previous state afterwards. Their 320px layouts fit the viewport.

Both embedded chapter pages load their logos and respond to Test, Cards and card flipping; Next remains available after flipping. Invalid resource/bank IDs show an unavailable message. No JavaScript exceptions were recorded. Test paper files are copied from the final solutions-bearing originals. The original standalone chapter files are copied without altering their content or progress storage.

Screenshots were inspected for laptop home, laptop library, mobile home and mobile embedded practice. Internal screenshots and browser logs are retained under `tmp/browser-qa`, excluded from Git. Automated validation is available in `scripts/verify-static.cjs` and `scripts/browser-qa.cjs`.

Live GitHub Pages publication is a separate check and requires an authenticated GitHub account. A successful local preview does not establish a live deployment.
