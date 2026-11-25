import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { sensors, generateValue, getStatus, nowLabel } from "../data/telemetryData";
import LiveReadingCard from "../components/telemetry/LiveReadingCard";
import LiveChart from "../components/telemetry/LiveChart";

const MAX_POINTS = 20; // keep only the last 20 readings

// Build starting history so the chart is not empty on first load
 function createInitialHistory() {
  const history = {};
  const now = Date.now();
  sensors.forEach((sensor) => {
    history[sensor.id] = Array.from({ length: 10 }, (_, i) => ({
      time: new Date(now - (10 - i) * 2000).toLocaleTimeString(),
      value: generateValue(sensor),
    }));
  });
  return history;
}

function LiveTelemetry() {
  const [history, setHistory] = useState(createInitialHistory);
  const [selectedId, setSelectedId] = useState(sensors[0].id);
  const [isLive, setIsLive] = useState(true);

  // Runs every 2 seconds while isLive is true
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setHistory((prev) => {
        const updated = {};
        sensors.forEach((sensor) => {
          const newPoint = { time: nowLabel(), value: generateValue(sensor) };
          updated[sensor.id] = [...prev[sensor.id], newPoint].slice(-MAX_POINTS);
        });
        return updated;
      });
    }, 2000);

    // Cleanup: stop the timer when paused or when page closes
    return () => clearInterval(interval);
  }, [isLive]);

  const selectedSensor = sensors.find((s) => s.id === selectedId);
  const selectedData = history[selectedId];

  // Last 8 readings of the selected sensor, newest first
  const recentLog = [...selectedData].reverse().slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Live Telemetry</h1>
          <p className="text-sm text-gray-500">Real-time sensor readings</p>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {isLive ? <Pause size={16} /> : <Play size={16} />}
          {isLive ? "Pause" : "Resume"}
        </button>
      </div>

      {/* Reading cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {sensors.map((sensor) => {
          const latest = history[sensor.id].at(-1).value;
          return (
            <LiveReadingCard
              key={sensor.id}
              sensor={sensor}
              value={latest}
              status={getStatus(sensor, latest)}
              isSelected={sensor.id === selectedId}
              onClick={() => setSelectedId(sensor.id)}
            />
          );
        })}
      </div>

      {/* Chart + log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveChart data={selectedData} sensor={selectedSensor} />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-gray-800 mb-3">Recent Readings</h2>
          <ul className="divide-y text-sm">
            {recentLog.map((row, i) => (
              <li key={i} className="flex justify-between py-2">
                <span className="text-gray-500">{row.time}</span>
                <span className="font-medium text-white">
                  {row.value} {selectedSensor.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LiveTelemetry;