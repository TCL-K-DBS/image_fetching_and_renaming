// routes/bank.js
const express = require('express');
const Bank = require('../models/Bank');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Helper function to download and save image
const downloadImage = async (url, id) => {
  const filePath = path.join(__dirname, `../downloads/${id}.png`);
  
  try {
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
  } catch (error) {
    // If there's an error (e.g., image not found), log the ID and return an error
    console.error(`Failed to download image for bank with ID: ${id}`);
  }
};

// Pagination route for banks
router.get('/banks', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const banks = await Bank.find().skip(skip).limit(limit);
    for (const bank of banks) {
      // Attempt to download the image, but don't halt if it fails
      await downloadImage(bank.imgUrl, bank._id);
    }
    res.json(banks);
  } catch (error) {
    console.error('Error fetching banks:', error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
