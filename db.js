
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://dbs:l0cA40lH0S7@192.168.10.38:27017/Mobile-Banking?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectToMongoDB;
