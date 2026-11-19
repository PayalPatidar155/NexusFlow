const connectDB = require('../config/db');
const mongoose = require('mongoose');

async function createTimeSeriesCollection() {
    try {
        await connectDB();

        const db = mongoose.connection.db;
        const collectionName = 'telemetry';

        const existing = await db
            .listCollections({ name: collectionName })
            .toArray();

        if (existing.length > 0) {
            console.log('Telemetry collection already exists');
        } else {
            await db.createCollection(collectionName, {
                timeseries: {
                    timeField: 'timestamp',
                    metaField: 'sensorId',
                    granularity: 'seconds'
                }
            });

            console.log('Telemetry Time-Series collection created');
        }
    } catch (error) {
        console.error(error.message);
    } finally {
        await mongoose.disconnect();
    }
}

createTimeSeriesCollection();