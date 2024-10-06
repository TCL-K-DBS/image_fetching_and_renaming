// models/Biller.js
const mongoose = require('mongoose');

const billerSchema = new mongoose.Schema({
  billerType: { type: String, required: true },
  customerType: { type: String, required: true },
  billerService: { type: mongoose.Schema.Types.ObjectId, ref: 'BillerService', required: true },
  externalId: { type: String, required: true },
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  inputs: { type: Array, default: [] },
  params: { type: Array, default: [] },
  imgUrl: { type: String, required: true },
  sampleUrl: { type: String, required: true },
  accountingRuleId: { type: Number, required: true },
  savingsAccountId: { type: Number, required: true },
  paymentTypeId: { type: Number, required: true }
});

module.exports = mongoose.model('Biller', billerSchema);
