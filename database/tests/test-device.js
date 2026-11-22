const mongoose = require('mongoose');
const Device = require('../models/Device');
const connectDB = require('../config/db');
const assert = require('assert');

async function testDevice() {
    try {
        await connectDB();

        const deviceId = `TEST_DEVICE_${Date.now()}`;

        const deviceData = {
            deviceId,
            deviceName: 'Temperature Sensor',
            status: 'online',
            lastSeen: new Date()
        };

        // Test 1: Create device
        const savedDevice = await Device.create(deviceData);

        console.log('PASS: Device created successfully');

        // Test 2: Retrieve device
        const retrievedDevice = await Device.findOne({ deviceId });

        assert.ok(retrievedDevice, 'Device not found');
        assert.strictEqual(
            retrievedDevice.deviceName,
            'Temperature Sensor'
        );
        assert.strictEqual(retrievedDevice.status, 'online');

        console.log('PASS: Device retrieved successfully');
        console.log('PASS: Device values verified');

        // Test 3: Reject duplicate deviceId
        try {
            await Device.create(deviceData);
            throw new Error('Duplicate deviceId was accepted');
        } catch (error) {
            if (error.code === 11000) {
                console.log('PASS: Duplicate deviceId rejected');
            } else {
                throw error;
            }
        }

    } catch (error) {
        console.error('Device test failed:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

testDevice();