const mongoose = require("mongoose");
require("dotenv").config();

const ConnectToDatabase = require("./ConnectToDatabase");
const MONGO_URI = process.env.MONGO_URI;
// Models
const { Drivers } = require("../models/drivers");
const { Constructors } = require("../models/constructors");

// Data Scrap
const GetDriverStanding = require("../GetDriverStanding");
const GetConstructorStanding = require("../GetConstructorStanding");

ConnectToDatabase(MONGO_URI)
  .then(async () => {
    const driverDataScraped = await GetDriverStanding();
    const constructorDataScraped = await GetConstructorStanding();
    const saveDataToDB = async (data, model) => {
      try {
        // Clear existing data
        await model.deleteMany({});
        // Insert new data
        await model.insertMany(data);
        console.log(`Data saved successfully.`);
      } catch (error) {
        console.error("Error saving driver data:", error);
      }
    };
    await saveDataToDB(driverDataScraped, Drivers);
    await saveDataToDB(constructorDataScraped, Constructors);

    await mongoose.connection.close();
    console.log("Mongoose connection closed.");
    process.exit(0); // Exit the program
  })
  .catch((err) => console.log(err));