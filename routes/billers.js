// routes/biller.js
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Biller = require('../models/Biller');

const getFileExtension = (url) => {
  return url.split('.').pop();
};


const downloadImage = async (url, id, folder, type = 'original') => {
  const extension = getFileExtension(url);
  const fileName = type === 'sample' ? `sample_${id}.${extension}` : `${id}.${extension}`;
  const filePath = path.join(__dirname, `../${folder}/${fileName}`);

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
   
    console.error(`Failed to download ${type} image for biller with ID: ${id}`);
  }
};


router.get('/billers', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const billers = await Biller.find().skip(skip).limit(limit);
    for (const biller of billers) {
    
      await downloadImage(biller.imgUrl, biller._id, 'billers', 'original');

      
      await downloadImage(biller.sampleUrl, biller._id, 'billers', 'sample');
    }
    res.json(billers);
  } catch (error) {
    console.error('Error fetching billers:', error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
