const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const ConnectToDatabase = require("./db/ConnectToDatabase");

const {GetF1News, getRandomNumber }= require("./GetF1News");
const FetchF1NewsLinks = require("./FetchF1NewsLinks");

const { Drivers } = require("./models/drivers");
const { Constructors } = require("./models/constructors");

app.use(express.json());

app.listen(PORT, async () => {
  console.log("Server Online on PORT:", PORT);
  ConnectToDatabase(MONGO_URI);
}); 

// Sending The Data To MongoDB
app.get("/drivers", async (req, res) => {
  try {
    // Fetch data from MongoDB using Mongoose
    const drivers = await Drivers.find({}).sort({ pts: 1 });
    if (drivers.length > 0) {
      res.status(200).json(drivers);
      console.log(drivers);
    } else {
      res.status(404).send("No drivers found.");
    }
  } catch (error) {
    console.error("Error fetching driver data:", error);
    res.status(500).send("Error fetching driver data");
  }
});

app.get("/constructors", async (req, res) => {
  try {
    // Fetch data from MongoDB using Mongoose
    const constructors = await Constructors.find({}).sort({ pts: 1 });
    if (constructors.length > 0) {
      res.status(200).json(constructors);
    } else {
      res.status(404).send("No drivers found.");
    }
  } catch (error) {
    console.error("Error fetching driver data:", error);
    res.status(500).send("Error fetching driver data");
  }
});

app.get("/a", async (req, res) => {
  try {
    const data = await GetF1News();
    const i = getRandomNumber(1, data.images.length - 1 );
    const randomImage = data.images;
    console.log(randomImage[i]);    
    res.status(200).send(data);
  } catch (error) {
    res.json(400).send(error);
  } 
});

app.get("/news", async (req, res) => {
  try {
    const data = await FetchF1NewsLinks();
    res.status(200).send(data);
  } catch (error) {
    res.json(400).send(error);
  }
}); 
  
