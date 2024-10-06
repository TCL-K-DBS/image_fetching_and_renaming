
const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  swiftCode: { type: String, required: true },
  imgUrl: { type: String, required: true }
});

module.exports = mongoose.model('Bank', bankSchema);
