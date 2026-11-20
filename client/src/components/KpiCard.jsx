function KpiCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 flex items-center justify-between border border-slate-700">
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  )
}

export default KpiCard