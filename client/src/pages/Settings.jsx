import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import ToggleSwitch from "../components/ui/ToggleSwitch";

const defaultSettings = {
  profile: { name: "Aanchal", email: "aanchal@example.com", role: "Admin" },
  thresholds: { temperature: 40, pressure: 120, humidity: 70 },
  preferences: {
    emailAlerts: true,
    soundAlerts: false,
    autoRefresh: true,
    refreshInterval: "2",
  },
};

const thresholdFields = [
  { key: "temperature", label: "Temperature", unit: "°C", min: 20, max: 60 },
  { key: "pressure", label: "Pressure", unit: "kPa", min: 90, max: 150 },
  { key: "humidity", label: "Humidity", unit: "%", min: 30, max: 100 },
];

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500";

function Section({ title, description, children }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-5">
      <h2 className="text-white font-semibold">{title}</h2>
      <p className="text-sm text-slate-400 mb-4">{description}</p>
      {children}
    </div>
  );
}

function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  // Update one field inside one section
  const updateField = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
    setSaved(false);
  };

  const handleSave = () => {
    // Week 3: yahan backend API call aayegi
    console.log("Saved settings:", settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setSaved(false);
  };

  const { profile, thresholds, preferences } = settings;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-400">Manage your profile and system preferences</p>
      </div>

      {/* Profile */}
      <Section title="Profile" description="Your account details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Name</label>
            <input
              className={inputClass}
              value={profile.name}
              onChange={(e) => updateField("profile", "name", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input
              type="email"
              className={inputClass}
              value={profile.email}
              onChange={(e) => updateField("profile", "email", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Role</label>
            <select
              className={inputClass}
              value={profile.role}
              onChange={(e) => updateField("profile", "role", e.target.value)}
            >
              <option>Admin</option>
              <option>Operator</option>
              <option>Viewer</option>
            </select>
          </div>
        </div>
      </Section>

      {/* Thresholds */}
      <Section
        title="Alert Thresholds"
        description="Alert is raised when a sensor goes above these limits"
      >
        <div className="space-y-5">
          {thresholdFields.map((f) => (
            <div key={f.key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">{f.label}</span>
                <span className="text-white font-medium">
                  {thresholds[f.key]} {f.unit}
                </span>
              </div>
              <input
                type="range"
                min={f.min}
                max={f.max}
                value={thresholds[f.key]}
                onChange={(e) => updateField("thresholds", f.key, Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Preferences */}
      <Section title="Preferences" description="Notifications and data refresh">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-200">Email alerts</span>
            <ToggleSwitch
              label="Email alerts"
              checked={preferences.emailAlerts}
              onChange={(v) => updateField("preferences", "emailAlerts", v)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-200">Sound alerts</span>
            <ToggleSwitch
              label="Sound alerts"
              checked={preferences.soundAlerts}
              onChange={(v) => updateField("preferences", "soundAlerts", v)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-200">Auto-refresh data</span>
            <ToggleSwitch
              label="Auto-refresh data"
              checked={preferences.autoRefresh}
              onChange={(v) => updateField("preferences", "autoRefresh", v)}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-200">Refresh interval</span>
            <select
              className={`${inputClass} w-32`}
              disabled={!preferences.autoRefresh}
              value={preferences.refreshInterval}
              onChange={(e) => updateField("preferences", "refreshInterval", e.target.value)}
            >
              <option value="2">2 seconds</option>
              <option value="5">5 seconds</option>
              <option value="10">10 seconds</option>
            </select>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Save size={16} /> Save changes
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600"
        >
          <RotateCcw size={16} /> Reset
        </button>
        {saved && <span className="text-green-400 text-sm">Settings saved!</span>}
      </div>
    </div>
  );
}

export default Settings;