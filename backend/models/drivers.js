const mongoose = require("mongoose");

const DriverScheme = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,         
  },
});

const Drivers = mongoose.model("Drivers", DriverScheme);
module.exports = { Drivers };
