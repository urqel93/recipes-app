const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const RecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  shortText: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: [{
    ingredient: {
      type: Schema.Types.ObjectId,
      ref: 'ingredients'
    },
    quantity: {
      type: String,
    }
  }],
  date: {
    type: Date,
    default: Date.now()
  }

});

module.exports = User = mongoose.model('recipes', RecipeSchema);
