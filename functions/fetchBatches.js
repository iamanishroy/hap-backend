const puppeteer = require("puppeteer");
const fbDatabse = require("./firebase");

const fetchBatches = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(
    "http://time-table.sicsr.ac.in/day.php?year=2021&month=3&day=23"
  );
  const result = await page.evaluate(() => {
    var types = document.querySelectorAll("#type option");
    const lists = [...types];
    var batch = {};
    lists.map((b) => {
      batch[b.value] = b.innerText;
    });
    return batch;
  });
  await browser.close();
  await fbDatabse.ref(`batchList`).set(result);

  return result;
};

module.exports = fetchBatches;
