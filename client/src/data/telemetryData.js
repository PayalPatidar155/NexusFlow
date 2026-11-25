// List of sensors shown on the Live Telemetry page
export const sensors = [
  { id: "temp-01", name: "Temperature", unit: "°C", min: 20, max: 45, warnAbove: 38, color: "#ef4444" },
  { id: "press-01", name: "Pressure", unit: "kPa", min: 90, max: 130, warnAbove: 120, color: "#3b82f6" },
  { id: "hum-01", name: "Humidity", unit: "%", min: 30, max: 80, warnAbove: 70, color: "#10b981" },
  { id: "vib-01", name: "Vibration", unit: "mm/s", min: 0, max: 10, warnAbove: 8, color: "#f59e0b" },
];

// Random number between sensor min and max
export function generateValue(sensor) {
  const value = sensor.min + Math.random() * (sensor.max - sensor.min);
  return Number(value.toFixed(1));
}

// Decide status based on value
export function getStatus(sensor, value) {
  if (value > sensor.warnAbove) return "Critical";
  if (value > sensor.warnAbove - 5) return "Warning";
  return "Normal";
}

// Current time as a label, e.g. "10:42:15 AM"
export function nowLabel() {
  return new Date().toLocaleTimeString();
}