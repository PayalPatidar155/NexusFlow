
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Telemetry = require('../models/Telemetry');
const assert = require('assert');

async function testBulkInsertion() {
    const batchId = `BULK_TEST_${Date.now()}`;

    try {
        await connectDB();

        const totalRecords = 1000;

        const telemetryData = Array.from(
            { length: totalRecords },
            (_, index) => ({
                sensorId: `${batchId}_SENSOR_${index % 10}`,
                temperature: Number(
                    (20 + Math.random() * 60).toFixed(2)
                ),
                pressure: Number(
                    (20 + Math.random() * 130).toFixed(2)
                ),
                humidity: Number(
                    (30 + Math.random() * 60).toFixed(2)
                ),
                timestamp: new Date()
            })
        );

        console.log('Generated records:', telemetryData.length);

        const startTime = Date.now();

        const insertedData = await Telemetry.insertMany(
            telemetryData,
            { ordered: true }
        );

        const endTime = Date.now();
        const executionTime = endTime - startTime;

        assert.strictEqual(insertedData.length, totalRecords);

        console.log('PASS: Bulk insertion completed');

        const storedCount = await Telemetry.countDocuments({
            sensorId: { $regex: `^${batchId}_SENSOR_` }
        });

        assert.strictEqual(storedCount, totalRecords);

        console.log('PASS: All inserted records verified');
        console.log('Total records:', storedCount);
        console.log('Insertion time:', executionTime, 'ms');

        const recordsPerSecond = executionTime > 0
            ? Math.round(totalRecords / (executionTime / 1000))
            : 'N/A';

        console.log('Insertion throughput:', recordsPerSecond, 'records/sec');

    } catch (error) {
        console.error('Bulk insertion test failed:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

testBulkInsertion();
