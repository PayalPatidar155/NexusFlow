
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Telemetry = require('../models/Telemetry');

function generateSensorData() {
    return {
        sensorId: 'MOCK_SENSOR_01',
        temperature: Number((20 + Math.random() * 60).toFixed(2)),
        pressure: Number((20 + Math.random() * 130).toFixed(2)),
        humidity: Number((30 + Math.random() * 60).toFixed(2)),
        timestamp: new Date()
    };
}

async function generateMockData() {
    try {
        await connectDB();

        const sensorData = Array.from(
            { length: 10 },
            () => generateSensorData()
        );

        const savedData = await Telemetry.insertMany(sensorData);

        console.log('PASS: Mock sensor data generated');
        console.log('PASS: Temperature, pressure and humidity generated');
        console.log('PASS: Data saved to MongoDB');
        console.log('Total records inserted:', savedData.length);

        console.log('Sample record:', savedData[0].toObject());

    } catch (error) {
        console.error('Mock sensor generation failed:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

generateMockData();
