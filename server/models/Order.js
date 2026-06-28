const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  user: {
    type: String,
    required: true
  },

  products: {
    type: Array,
    required: true
  },

  totalAmount: {
    type: Number,
    required: true
  },

  fullName: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  pincode: {
    type: String,
    required: true
  },

  paymentMethod: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  }

},{
  timestamps:true
});

module.exports =
mongoose.model("Order", orderSchema);