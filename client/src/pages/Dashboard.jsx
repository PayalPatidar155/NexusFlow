import { Cpu, Wifi, Workflow, AlertTriangle } from 'lucide-react'
import KpiCard from '../components/KpiCard'
import TemperatureChart from '../components/TemperatureChart'
import PressureChart from '../components/PressureChart'
import RecentAlerts from '../components/RecentAlerts'
import DeviceTable from '../components/DeviceTable'
import { kpiData } from '../data/dummyData'

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard title="Total Sensors" value={kpiData.totalSensors} icon={Cpu} color="bg-cyan-500/20 text-cyan-400" />
        <KpiCard title="Active Sensors" value={kpiData.activeSensors} icon={Wifi} color="bg-green-500/20 text-green-400" />
        <KpiCard title="Active Rules" value={kpiData.activeRules} icon={Workflow} color="bg-purple-500/20 text-purple-400" />
        <KpiCard title="Critical Alerts" value={kpiData.criticalAlerts} icon={AlertTriangle} color="bg-red-500/20 text-red-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TemperatureChart />
        <PressureChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-1"><RecentAlerts /></div>
        <div className="xl:col-span-2"><DeviceTable /></div>
      </div>
    </div>
  )
}

export default Dashboard