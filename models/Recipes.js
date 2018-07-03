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
  userName: {
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
  ingredients: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    userName: {
      type: String,
    },
    text: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now()
    }
  }]

});

module.exports = User = mongoose.model('recipes', RecipeSchema);
