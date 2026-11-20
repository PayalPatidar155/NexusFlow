
const mongoose = require('mongoose');

const telemetrySchema = new mongoose.Schema({
    sensorId: {
        type: String,
        required: true,
        trim: true
    },
    temperature: {
        type: Number,
        required: true,
        min: -50,
        max: 200
    },
    pressure: {
        type: Number,
        required: true,
        min: 0,
        max: 1000
    },
    humidity: {
        type: Number,
        required: true,
        min: 0,
        max: 100
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
