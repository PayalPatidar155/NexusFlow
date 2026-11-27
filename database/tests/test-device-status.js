
const mongoose = require('mongoose');
const Device = require('../models/Device');
const connectDB = require('../config/db');
const assert = require('assert');

async function testDeviceStatus() {
    let deviceId;

    try {
        await connectDB();

        deviceId = `STATUS_TEST_${Date.now()}`;

        // Test 1: Create an offline device
        await Device.create({
            deviceId,
            deviceName: 'Status Test Sensor',
            status: 'offline'
        });

        console.log('PASS: Offline device created');

        // Test 2: Update device to online
        const lastSeen = new Date();

        const onlineDevice = await Device.findOneAndUpdate(
            { deviceId },
            { status: 'online', lastSeen },
            { returnDocument: 'after' }
        );

        assert.ok(onlineDevice);
        assert.strictEqual(onlineDevice.status, 'online');
        assert.ok(onlineDevice.lastSeen);
        assert.strictEqual(
            onlineDevice.lastSeen.getTime(),
            lastSeen.getTime()
        );

        console.log('PASS: Device online status updated');
        console.log('PASS: Last seen timestamp updated');

        // Test 3: Update device to offline
        const offlineDevice = await Device.findOneAndUpdate(
            { deviceId },
            { status: 'offline' },
            { returnDocument: 'after' }
        );

        assert.ok(offlineDevice);
        assert.strictEqual(offlineDevice.status, 'offline');

        console.log('PASS: Device offline status updated');

    } catch (error) {
        console.error('Device status test failed:', error.message);
        process.exitCode = 1;
    } finally {
        if (deviceId) {
            await Device.deleteOne({ deviceId });
        }

        await mongoose.disconnect();
    }
}

testDeviceStatus();
