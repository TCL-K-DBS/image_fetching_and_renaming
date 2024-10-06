
const express = require('express');
const connectToMongoDB = require('./db');
const bankRoutes = require('./routes/bank');
const billerRoutes = require('./routes/billers');

const app = express();


connectToMongoDB();

app.use(express.json());


app.use('/api', bankRoutes);
app.use('/api2', billerRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
