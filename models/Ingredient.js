const mongoose = require("mongoose");
const Schema =mongoose.Schema;

//Create Schema
const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
});

module.exports = User = mongoose.model('ingredients', IngredientSchema);
