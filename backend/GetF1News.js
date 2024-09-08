const puppeteer = require("puppeteer");
//const url = "https://www.motorsport.com/f1/news/two-mercedes-collisions-behind-verstappens-hamilton-penalty-call-early-in-italian-gp/10650707/";
const FetchF1NewsLinks = require("./FetchF1NewsLinks");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const GetF1News = async () => {
  // getting a random url
  const fetchAllUrls = await FetchF1NewsLinks();
  const allUrls = fetchAllUrls.map(item => item.href);
  
  const browser = await puppeteer.launch(); // Launch in headless mode
  const page = await browser.newPage();

  await page.goto(allUrls[getRandomNumber(0, allUrls.length - 1)], { waitUntil: "domcontentloaded" }); // Wait until network is idle to ensure page is fully loaded

  const data = await page.evaluate(() => {
    const title = document.querySelector("h1").innerText.trim();

    const paragraphElements = document.querySelectorAll(".ms-article__body p");
    const paragraphs = Array.from(paragraphElements).map(paragraph => paragraph.innerText.trim());

    const imageElements = document.querySelectorAll("img");
    const images = Array.from(imageElements).map(img => img.src.trim()).filter(src => src.toLowerCase().endsWith('.jpg'));
    return { title, paragraphs, images };
  });

  await browser.close(); // Ensure the browser is closed
  return data; // Return data
};

module.exports = {GetF1News, getRandomNumber};
