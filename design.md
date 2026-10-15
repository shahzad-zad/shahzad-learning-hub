# Shahzad's Learning Hub

## Purpose

A simple student library for classes 9 to 12, organised by class, subject, chapter and resource type. The first screen helps a student choose a class; the library opens notes, embedded chapter practice and downloadable test papers.

## Visual theme

Use the existing Educators dark palette: midnight background #080f1b, panels #101c2c, pale text #f4f7fc, muted text #b0bed2, mint #6ee7b7, Educators green #00866a and blue #073e91. Small yellow accents refer to the school crest. Use system fonts, large clear headings, generous spacing and simple borders. Portrait imagery identifies the teacher; no stock imagery or decorative animation is needed.

## Structure

- Home: student introduction, four class shortcuts and resource library.
- Library: search, class and subject filters, and resource-type filters; meaningful empty state and reset.
- Chapter viewer: embedded existing interactive HTML, with open separately and fullscreen controls.
- Notes and MCQ readers: readable HTML, expandable answers, print controls.
- Teacher: portrait, biography, qualifications and selected research descriptions from the supplied portfolio.

## Behaviour and accessibility

Use real buttons and links, visible keyboard focus, labelled search and selects, keyboard-accessible details and explicit file labels. Class shortcuts apply the library filter and scroll to it. Keep filter state in the URL so students can bookmark it; browser Back restores it. No student account is required. Existing chapter progress stays local to the student's browser. Respect reduced-motion preferences. Layouts adapt to phone, tablet and laptop; iframe content must remain usable with an alternative direct link.

## Packaging

`site` is the only published directory. All paths are relative so GitHub Pages project subpaths work. Keep original teaching files and the original portfolio untouched. A local reference copy of the public portfolio content is excluded from Git. Copy only selected student resources and portrait/logo into `site`. GitHub Actions validates the static site before deploying. No server, CMS, external font, analytics or API key is required.

## Personal branding and navigation update

Use the supplied Shahzad Learning Hub blue and gold logo throughout the published website, generated readers and copied chapter pages. School names and logos are removed from the student website. Keep the existing dark palette and mint action buttons. The homepage contains the hero and class cards only, with a hover and focus tooltip on the portrait linking to a separate portfolio page. Each class opens its own page with class-scoped search and relevant grouped resource sections. Portfolio.html presents all nine supplied portfolio projects with expandable details.

## Chapter cards

Navigation is Class card → numerically ordered chapter cards → resource cards for notes, practice and MCQ banks. Each class has its own search, and each chapter shows only its relevant resources. Chapters are grouped by subject and chapter number and sorted by chapter number, so future catalogue additions appear in the correct order automatically. Only prepared chapters are shown; currently Chapter 2 is available in each class.
