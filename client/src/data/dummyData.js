export const kpiData = {
  totalSensors: 48,
  activeSensors: 41,
  activeRules: 12,
  criticalAlerts: 3,
}

export const temperatureData = [
  { time: '10:00', value: 24 },
  { time: '10:05', value: 26 },
  { time: '10:10', value: 25 },
  { time: '10:15', value: 29 },
  { time: '10:20', value: 31 },
  { time: '10:25', value: 28 },
  { time: '10:30', value: 27 },
]

export const pressureData = [
  { time: '10:00', value: 101 },
  { time: '10:05', value: 103 },
  { time: '10:10', value: 102 },
  { time: '10:15', value: 106 },
  { time: '10:20', value: 108 },
  { time: '10:25', value: 105 },
  { time: '10:30', value: 104 },
]

export const alertsData = [
  { id: 1, message: 'Temperature exceeded 30°C', device: 'Sensor-A1', severity: 'critical', time: '2 min ago' },
  { id: 2, message: 'Pressure rising fast', device: 'Sensor-B4', severity: 'warning', time: '10 min ago' },
  { id: 3, message: 'Device reconnected', device: 'Sensor-C2', severity: 'info', time: '25 min ago' },
  { id: 4, message: 'Humidity below threshold', device: 'Sensor-D7', severity: 'warning', time: '1 hr ago' },
]

export const devicesData = [
  { id: 'DEV-001', name: 'Sensor-A1', type: 'Temperature', status: 'online', lastSeen: '1 min ago' },
  { id: 'DEV-002', name: 'Sensor-B4', type: 'Pressure', status: 'online', lastSeen: '2 min ago' },
  { id: 'DEV-003', name: 'Sensor-C2', type: 'Humidity', status: 'offline', lastSeen: '3 hr ago' },
  { id: 'DEV-004', name: 'Sensor-D7', type: 'Temperature', status: 'online', lastSeen: '1 min ago' },
  { id: 'DEV-005', name: 'Sensor-E3', type: 'Pressure', status: 'offline', lastSeen: '1 day ago' },
]