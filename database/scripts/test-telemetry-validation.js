
const mongoose = require('mongoose');
const Telemetry = require('../models/Telemetry');
const connectDB = require('../config/db');

async function testValidation() {
    try {
        await connectDB();

        const validData = new Telemetry({
            sensorId: 'SENSOR_01',
            temperature: 85,
            pressure: 40,
            humidity: 55
        });

        await validData.validate();
        console.log('PASS: Valid telemetry data accepted');

        const invalidData = new Telemetry({
            sensorId: 'SENSOR_02',
            temperature: 250,
            pressure: -10,
            humidity: 120
        });

        await invalidData.validate();
        console.log('FAIL: Invalid data was accepted');

    } catch (error) {
        if (error.name === 'ValidationError') {
            console.log('PASS: Invalid telemetry data rejected');
            console.log(error.message);
        } else {
            console.error('Test error:', error.message);
        }
    } finally {
        await mongoose.disconnect();
    }
}

testValidation();
