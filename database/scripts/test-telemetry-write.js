
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Telemetry = require('../models/Telemetry');
const assert = require('assert');

async function testTelemetryWrite() {
    try {
        await connectDB();

        const sensorId = `TEST_SENSOR_${Date.now()}`;
        const timestamp = new Date();

        const testData = {
            sensorId,
            temperature: 85,
            pressure: 40,
            humidity: 55,
            timestamp
        };

        const savedData = await Telemetry.create(testData);

        console.log('PASS: Telemetry data inserted');

        const retrievedData = await Telemetry.findOne({
            sensorId,
            timestamp
        });

        assert.ok(retrievedData, 'Stored telemetry not found');
        assert.strictEqual(retrievedData.temperature, 85);
        assert.strictEqual(retrievedData.pressure, 40);
        assert.strictEqual(retrievedData.humidity, 55);

        console.log('PASS: Telemetry data retrieved');
        console.log('PASS: Stored values verified');
        console.log('Inserted ID:', savedData._id);

    } catch (error) {
        console.error('Telemetry write test failed:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

testTelemetryWrite();
