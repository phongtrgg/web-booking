const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: String, required: true },
  photos: { type: Array, required: true },
  desc: { type: String, required: true },
  rating: { type: Number, required: true },
  featured: { type: String, required: true },
  rooms: { type: Array, required: true },
  cheapestPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Hotel", hotelSchema);
