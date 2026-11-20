import { alertsData } from '../data/dummyData'

const badgeStyles = {
  critical: 'bg-red-500/20 text-red-400',
  warning: 'bg-yellow-500/20 text-yellow-400',
  info: 'bg-blue-500/20 text-blue-400',
}

function RecentAlerts() {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <h3 className="font-semibold mb-4">Recent Alerts</h3>
      <ul className="space-y-3">
        {alertsData.map((alert) => (
          <li key={alert.id} className="flex items-start justify-between gap-3 border-b border-slate-700 pb-3 last:border-0">
            <div>
              <p className="text-sm">{alert.message}</p>
              <p className="text-xs text-slate-400 mt-1">{alert.device} · {alert.time}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full capitalize ${badgeStyles[alert.severity]}`}>
              {alert.severity}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentAlerts