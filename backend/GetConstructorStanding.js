const puppeteer = require("puppeteer");
const url = "https://www.formula1.com/en/results/2024/team";

const GetConstructorStanding = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true }); // Launch in headless mode
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" }); // Wait until network is idle to ensure page is fully loaded

    const getElements = await page.evaluate(() => {
      const table = document.querySelector("table");
      //if (!table) return []; // Ensure table exists
      const rows = Array.from(table.querySelectorAll("tr"));

      return rows.map((index) => {
          const driverData = Array.from(index.querySelectorAll("td"));
          const finalDriverData = driverData.map(index => index.innerText.trim());
          return finalDriverData;
        }).filter((index) => index.length > 0); // Filter out empty rows
    });
    await browser.close();

    // Transform extracted data into desired format
      const modifiedData = getElements.map((index) => {
        const [position, team, points] = index; 
        return {
          position: position,
          team: team,
          points: points,
        };
      });
    return modifiedData; // Return the modified data for use in Express route
   
  } 
  catch (error) {
    console.error("Error fetching driver standings:", error);
    return []; // Return an empty array in case of error
  }
};  
module.exports = GetConstructorStanding;                             