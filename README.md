# Canvas Assignments Scraper

A small JavaScript program that logs in to Canvas, opens the assignments page of my Frontend Web Development course, and saves each assignment's title, status, due date and marks to a JSON file.

## What it uses
- JavaScript (Node.js)
- Playwright (controls a real browser)

## How to run it
1. Install Node.js from nodejs.org
2. Download this project and open it in VS Code
3. In the terminal, run:
```
   npm install
   npx playwright install chromium
   node scrapper.js
```
4. A browser opens. Log in to Canvas and approve the verification on your phone.
5. The program reads the assignments, prints a table with the total, and saves the results in `assignments.json`.

## Notes
- You log in yourself, so the program never sees or stores your password.
- `assignments.json` is not uploaded to GitHub because it contains my marks.
- The course link inside `scrapper.js` is for my own course, so change it to use yours.