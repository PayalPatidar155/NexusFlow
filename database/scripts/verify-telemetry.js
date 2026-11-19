const connectDB = require('../config/db');
const mongoose = require('mongoose');

async function verifyTelemetry() {
    try {
        await connectDB();

        const data = await mongoose.connection
            .collection('telemetry')
            .find({ sensorId: 'TURBINE_01' })
            .toArray();

        console.log('Stored Telemetry Data:');
        console.log(data);
    } catch (error) {
        console.error(error.message);
    } finally {
        await mongoose.disconnect();
    }
}

verifyTelemetry();