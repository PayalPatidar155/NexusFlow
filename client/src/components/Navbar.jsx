import { useLocation } from 'react-router-dom'
import { Search, Bell, User, Menu } from 'lucide-react'

const titles = {
  '/': 'Dashboard',
  '/devices': 'Devices',
  '/telemetry': 'Live Telemetry',
  '/workflows': 'Workflows',
  '/alerts': 'Alerts',
  '/settings': 'Settings',
}

function Navbar({ onMenuClick }) {
  const { pathname } = useLocation()

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-slate-950 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden text-slate-300">
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-semibold">{titles[pathname]}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2">
          <Search size={16} className="text-slate-400" />
          <input placeholder="Search..." className="bg-transparent outline-none text-sm w-40" />
        </div>
        <Bell size={20} className="text-slate-400" />
        <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center">
          <User size={18} className="text-slate-950" />
        </div>
      </div>
    </header>
  )
}

export default Navbar