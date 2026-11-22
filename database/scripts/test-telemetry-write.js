const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Telemetry = require('../models/Telemetry');
const assert = require('assert');

async function testMultipleSensorData() {
    try {
        await connectDB();

        const uniqueId = Date.now();
        const startTime = new Date();

        const testData = [
            {
                sensorId: `TEMP_SENSOR_${uniqueId}`,
                temperature: 85,
                pressure: 40,
                humidity: 55,
                timestamp: new Date()
            },
            {
                sensorId: `PRESSURE_SENSOR_${uniqueId}`,
                temperature: 30,
                pressure: 120,
                humidity: 60,
                timestamp: new Date()
            },
            {
                sensorId: `HUMIDITY_SENSOR_${uniqueId}`,
                temperature: 28,
                pressure: 45,
                humidity: 75,
                timestamp: new Date()
            }
        ];

        const savedData = await Telemetry.insertMany(testData);

        assert.strictEqual(savedData.length, 3);
        console.log('PASS: Multiple sensor data inserted');

        const sensorIds = testData.map(data => data.sensorId);

        const retrievedData = await Telemetry.find({
            sensorId: { $in: sensorIds }
        });

        assert.strictEqual(retrievedData.length, 3);
        console.log('PASS: Multiple sensor data retrieved');

        for (const expected of testData) {
            const actual = retrievedData.find(
                data => data.sensorId === expected.sensorId
            );

            assert.ok(actual, `Sensor ${expected.sensorId} not found`);
            assert.strictEqual(actual.temperature, expected.temperature);
            assert.strictEqual(actual.pressure, expected.pressure);
            assert.strictEqual(actual.humidity, expected.humidity);
        }

        console.log('PASS: Individual sensor values verified');

        for (const data of retrievedData) {
            assert.ok(data.timestamp instanceof Date);
        }

        console.log('PASS: Sensor timestamps verified');

        // Timestamp-based retrieval
        const endTime = new Date();

        const timeRangeData = await Telemetry.find({
            sensorId: { $in: sensorIds },
            timestamp: {
                $gte: startTime,
                $lte: endTime
            }
        });

        assert.strictEqual(timeRangeData.length, 3);
        console.log('PASS: Timestamp-based retrieval verified');

    } catch (error) {
        console.error('Multiple sensor test failed:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

testMultipleSensorData();