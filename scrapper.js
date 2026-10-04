console.log("Script started");

const { chromium } = require("playwright");
const fs = require("fs"); //file system

async function scrapingData() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // 1. Open Canvas (it sends you to the login page)
  await page.goto("https://alueducation.instructure.com/courses");

  // 2. Wait until you are back on Canvas after logging in
  await page.waitForURL(
    (url) =>
      url.hostname === "alueducation.instructure.com" &&
      url.pathname.startsWith("/courses"),
    { timeout: 0 },
  );
  console.log("Canvas has been accessed");

  // 3. Go straight to the assignments page of your course (3130)
  await page.goto(
    "https://alueducation.instructure.com/courses/3130/assignments",
    { waitUntil: "domcontentloaded", timeout: 60000 },
  );
  console.log("Assignments page has been opened");

  // 4. Wait for the list, then read it
  await page.waitForSelector(".assignment-list", { timeout: 60000 });
  await page.waitForTimeout(3000);

  const assignments = await page.locator(".assignment-list .ig-row").all();
  const scrappedAssignments = [];

  for (const assignment of assignments) {
    const assignmentTitle = await assignment.locator(".ig-title").innerText();

    const status =
      (await assignment.locator(".default-dates").count()) > 0
        ? await assignment.locator(".default-dates").innerText()
        : "No status";

    const dueDate =
      (await assignment.locator(".assignment-date-due").count()) > 0
        ? await assignment.locator(".assignment-date-due").innerText()
        : "No due date";

    const marks =
      (await assignment.locator(".score-display").count()) > 0
        ? await assignment.locator(".score-display").innerText()
        : "No marks";

    scrappedAssignments.push({ assignmentTitle, status, dueDate, marks });
  }

  // 5. Show the results and save them
  console.table(scrappedAssignments);
  console.log("Total assignments:", scrappedAssignments.length);

  fs.writeFileSync(
    "assignments.json",
    JSON.stringify(scrappedAssignments, null, 2),
  );
  console.log("All assignments have been scraped...");

  await browser.close();
}

scrapingData();