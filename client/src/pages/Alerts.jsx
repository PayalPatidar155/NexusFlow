import { useState } from "react";
import { AlertOctagon, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { initialAlerts } from "../data/alertsData";

const severityStyles = {
  Critical: { badge: "bg-red-500/20 text-red-400", Icon: AlertOctagon },
  Warning: { badge: "bg-yellow-500/20 text-yellow-400", Icon: AlertTriangle },
  Info: { badge: "bg-blue-500/20 text-blue-400", Icon: Info },
};

const filters = ["All", "Critical", "Warning", "Info"];

function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState("All");

  const resolveAlert = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Resolved" } : a))
    );
  };

  const visibleAlerts =
    filter === "All" ? alerts : alerts.filter((a) => a.severity === filter);

  const activeCount = alerts.filter((a) => a.status === "Active").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Alerts</h1>
        <p className="text-sm text-slate-400">{activeCount} active alerts</p>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {visibleAlerts.length === 0 && (
          <p className="text-slate-400 text-sm">No alerts found.</p>
        )}

        {visibleAlerts.map((alert) => {
          const { badge, Icon } = severityStyles[alert.severity];
          const isResolved = alert.status === "Resolved";
          return (
            <div
              key={alert.id}
              className={`bg-slate-800/60 rounded-xl p-4 flex flex-wrap items-center gap-3 justify-between ${
                isResolved ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`p-2 rounded-lg ${badge}`}>
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-white font-medium">{alert.message}</p>
                  <p className="text-xs text-slate-400">
                    {alert.device} • {alert.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full ${badge}`}>
                  {alert.severity}
                </span>
                {isResolved ? (
                  <span className="flex items-center gap-1 text-sm text-green-400">
                    <CheckCircle size={16} /> Resolved
                  </span>
                ) : (
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className="text-sm px-3 py-1 rounded-lg bg-slate-700 text-white hover:bg-slate-600"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Alerts;