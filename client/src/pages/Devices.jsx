import { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { devicesData } from "../data/devices";

const statusStyles = {
  Online: "bg-green-100 text-green-700",
  Offline: "bg-gray-200 text-gray-600",
  Warning: "bg-yellow-100 text-yellow-700",
};

function Devices() {
  const [devices, setDevices] = useState(devicesData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", type: "Temperature", location: "" });

  const filteredDevices = devices.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddDevice = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim()) return;

    const newDevice = {
      id: `DEV-${String(devices.length + 1).padStart(3, "0")}`,
      name: form.name,
      type: form.type,
      location: form.location,
      status: "Online",
      lastSeen: "just now",
    };

    setDevices([newDevice, ...devices]);
    setForm({ name: "", type: "Temperature", location: "" });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Devices</h1>
          <p className="text-sm text-gray-400">Manage all your IoT sensors</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Add Device
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option className="bg-slate-800 text-slate-100">All</option>
  <option className="bg-slate-800 text-slate-100">Online</option>
  <option className="bg-slate-800 text-slate-100">Offline</option>
  <option className="bg-slate-800 text-slate-100">Warning</option>
</select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-slate-800 text-slate-100 shadow">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{d.id}</td>
                <td className="px-4 py-3">{d.name}</td>
                <td className="px-4 py-3">{d.type}</td>
                <td className="px-4 py-3">{d.location}</td>
                <td className="px-4 py-3">
                  <span className={'rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[d.status]}'}>
                    {d.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{d.lastSeen}</td>
              </tr>
            ))}
            {filteredDevices.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                  No devices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Device Modal */}
      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <form
      onSubmit={handleAddDevice}
      className="w-full max-w-md space-y-4 rounded-xl bg-slate-800 p-6 text-slate-100"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Add New Device</h2>
        <button type="button" onClick={() => setShowModal(false)}>
          <X size={20} />
        </button>
      </div>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Device name"
        className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>Temperature</option>
        <option>Pressure</option>
        <option>Humidity</option>
        <option>Vibration</option>
      </select>

      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        Save Device
      </button>
    </form>
  </div>
)}
    </div>
  );
}

export default Devices;