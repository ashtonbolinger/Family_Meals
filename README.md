# Family Meals website files

This folder is the working source for the public weekly meal-planning website.

Files:
- index.html: page content
- styles.css: visual design
- script.js: grocery checklist behavior
- .nojekyll: tells GitHub Pages to serve these files as plain static files

Public-site rule: do not place private family information, addresses, account data, private OneDrive links, or other sensitive information in these files.

Weekly updates are governed by `.codex/automations/sunday-meal-plan.md`. The
scheduled Codex automation reads that file, updates the site and recipe PDFs,
validates the result, and publishes the repository.
