import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Cpu, Activity, Workflow, Bell, Settings,
} from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/devices', label: 'Devices', icon: Cpu },
  { to: '/telemetry', label: 'Live Telemetry', icon: Activity },
  { to: '/workflows', label: 'Workflows', icon: Workflow },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-slate-950 border-r border-slate-800 p-4">
      <h1 className="text-2xl font-bold text-cyan-400 mb-8 px-2">NexusFlow</h1>
      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar