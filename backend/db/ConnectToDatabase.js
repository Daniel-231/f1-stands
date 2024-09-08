const mongoose = require("mongoose");

async function ConnectToDatabase(mongoDBURI) {
  try {
    await mongoose.connect(mongoDBURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = ConnectToDatabase;
