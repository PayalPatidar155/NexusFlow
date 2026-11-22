const mongoose = require('mongoose');
const connectDB = require('../config/db');
const assert = require('assert');

async function testIndexPerformance() {
    try {
        await connectDB();

        const telemetry = mongoose.connection.collection('telemetry');

        // Find an existing sensor record
        const sample = await telemetry.findOne({
            sensorId: { $exists: true }
        });

        assert.ok(sample, 'No telemetry data found');

        const result = await telemetry.find({
            sensorId: sample.sensorId,
            timestamp: {
                $gte: new Date('2020-01-01'),
                $lte: new Date()
            }
        }).explain('executionStats');

        const winningPlan =
            result.stages[0].$cursor.queryPlanner.winningPlan;

        const executionStats =
            result.stages[0].$cursor.executionStats;

        const plan = JSON.stringify(winningPlan);

        assert.ok(
            plan.includes('IXSCAN'),
            'Expected index scan was not used'
        );

        assert.ok(
            executionStats.nReturned > 0,
            'No matching telemetry records found'
        );

        console.log('PASS: Actual sensor query verified');
        console.log('Sensor ID:', sample.sensorId);
        console.log('PASS: MongoDB index scan verified');
        console.log('Index used:', winningPlan.inputStage.indexName);
        console.log(
            'Execution time:',
            executionStats.executionTimeMillis,
            'ms'
        );
        console.log('Records returned:', executionStats.nReturned);
        console.log('Keys examined:', executionStats.totalKeysExamined);
        console.log('Documents examined:', executionStats.totalDocsExamined);

    } catch (error) {
        console.error('Index performance test failed:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

testIndexPerformance();