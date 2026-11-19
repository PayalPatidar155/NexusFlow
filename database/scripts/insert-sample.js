const connectDB = require('../config/db');
const mongoose = require('mongoose');

async function insertSample() {
    try {
        await connectDB();

        const telemetry = mongoose.connection.collection('telemetry');

        await telemetry.insertOne({
            sensorId: 'TURBINE_01',
            temperature: 85,
            pressure: 40,
            humidity: 55,
            timestamp: new Date()
        });

        console.log('Sample sensor data inserted successfully');
    } catch (error) {
        console.error(error.message);
    } finally {
        await mongoose.disconnect();
    }
}

insertSample();