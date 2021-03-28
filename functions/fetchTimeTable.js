const puppeteer = require("puppeteer");
const fbDatabse = require("./firebase");

const fetchTimeTable = async (day, month, year, batchID) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(
    `http://time-table.sicsr.ac.in/day.php?year=${year}&month=${month}&day=${day}`
  );
  const result = await page.evaluate((batchID) => {
    let types = document.querySelectorAll(".row_labels");
    const lists = [...types];
    retObj = {};
    lists.map((row) => {
      if (row.parentElement.querySelector(`.${batchID}`)) {
        retObj[row.innerText] = row.parentElement.querySelector(
          `.${batchID}`
        ).innerText;
      }
    });
    return retObj;
  }, batchID);
  await browser.close();
  await fbDatabse.ref(`batch/${batchID}/${day}-${month}-${year}`).set(result);
  return result;
};

module.exports = fetchTimeTable;
