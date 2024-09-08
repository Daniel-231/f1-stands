const puppeteer = require("puppeteer");
const url = "https://www.motorsport.com/f1/news/";

const FetchF1NewsLinks = async () => {
  const browser = await puppeteer.launch(); // Launch in headless mode
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" }); // Wait until network is idle to ensure page is fully loaded

  const data = await page.evaluate(() => {
    const aLinksElements = document.querySelectorAll(
      ".ms-grid.ms-grid-hor-d.ms-grid-hor-t.ms-grid-hor-m a"
    );
    const aLinks = Array.from(aLinksElements).map((a) => ({
      href: a.href.trim(),    
    }));
    return aLinks;
  });

  await browser.close(); // Ensure the browser is closed
  return data; // Return data
};

module.exports = FetchF1NewsLinks;