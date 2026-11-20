import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Cpu, Activity, Workflow, Bell, Settings, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/devices', label: 'Devices', icon: Cpu },
  { to: '/telemetry', label: 'Live Telemetry', icon: Activity },
  { to: '/workflows', label: 'Workflows', icon: Workflow },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800 p-4 transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <h1 className="text-2xl font-bold text-cyan-400">NexusFlow</h1>
          <button onClick={onClose} className="lg:hidden text-slate-400">
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
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
    </>
  )
}

export default Sidebar