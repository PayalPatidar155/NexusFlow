const connectDB = require('../config/db');
const mongoose = require('mongoose');

const testConnection = async () => {
    await connectDB();
    await mongoose.disconnect();
    console.log('Database connection test completed');
};

testConnection();