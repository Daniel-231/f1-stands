const mongoose = require("mongoose");

const ConstructorScheme = new mongoose.Schema({
  position: {
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

const Constructors = mongoose.model("Constructors", ConstructorScheme);
module.exports = { Constructors };
