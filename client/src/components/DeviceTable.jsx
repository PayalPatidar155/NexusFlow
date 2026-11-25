import { devicesData } from '../data/dummyData'

function DeviceTable() {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <h3 className="font-semibold mb-4">Device Status</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-slate-400 border-b border-slate-700">
            <tr>
              <th className="py-2 pr-4">ID</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {devicesData.map((d) => (
              <tr key={d.id} className="border-b border-slate-700 last:border-0">
                <td className="py-3 pr-4">{d.id}</td>
                <td className="py-3 pr-4">{d.name}</td>
                <td className="py-3 pr-4">{d.type}</td>
                <td className="py-3 pr-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    d.status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {d.status}
                  </span>
                </td>
                <td className="py-3 text-slate-400">{d.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DeviceTable