const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  category: {
    type: String,
    required: true
  },
  bestSeller: {
  type: Boolean,
  default: false
},

  ratings: [
    {
      user: String,
      rating: Number,
      comment: String
    }
  ]


  
}, {

  timestamps: true

});

module.exports = mongoose.model(
  "Plant",
  plantSchema
);