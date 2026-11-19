const mongoose = require('mongoose');

const telemetrySchema = new mongoose.Schema({
    sensorId: {
        type: String,
        required: true
    },
    temperature: {
        type: Number
    },
    pressure: {
        type: Number
    },
    humidity: {
        type: Number
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model(
    'Telemetry',
    telemetrySchema,
    'telemetry'
);