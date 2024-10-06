
const express = require('express');
const Bank = require('../models/Bank');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();


const downloadImage = async (url, id) => {
  const filePath = path.join(__dirname, `../downloads/${id}.png`);
  const response = await axios({
    url,
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};


router.get('/banks', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const banks = await Bank.find().skip(skip).limit(limit);
    for (const bank of banks) {
      await downloadImage(bank.imgUrl, bank._id);
    }
    res.json(banks);
  } catch (error) {
    console.error('Error fetching banks:', error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
