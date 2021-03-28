const puppeteer = require("puppeteer");

const f = async (day, month, year, batchID) => {
  var ti = +new Date();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `http://time-table.sicsr.ac.in/day.php?year=${year}&month=${month}&day=${day}`
  );

  const result = await page.evaluate((batchID) => {
    let types = document.querySelectorAll(".row_labels");
    const lists = [...types];
    retObj = {};
    lists.map((row) => {
      if (row.parentNode.querySelector(`.${batchID}`)) {
        retObj[batchID] = row.parentNode.querySelector(`.${batchID}`).innerText;
      }
    });
    return retObj;
  }, batchID);
  console.log(result);
  await browser.close();
  console.log(+new Date() - ti);
};

f(26, 3, 2021, "A");
