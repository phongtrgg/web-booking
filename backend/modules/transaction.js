const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userName: { type: String, required: true },
  user: { type: Object, required: true },
  hotel: { type: Schema.Types.ObjectId, required: true },
  room: { type: Array, required: true },
  dateStart: { type: String, required: true },
  dateEnd: { type: String, required: true },
  price: { type: Number, required: true },
  payment: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
