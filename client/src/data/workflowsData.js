export const initialWorkflows = [
  {
    id: 1,
    name: "High Temperature Alert",
    enabled: true,
    lastRun: "2 min ago",
    nodes: [
      { type: "Trigger", label: "Temperature sensor" },
      { type: "Condition", label: "Value > 40°C" },
      { type: "Action", label: "Send critical alert" },
    ],
  },
  {
    id: 2,
    name: "Pressure Monitor",
    enabled: true,
    lastRun: "10 min ago",
    nodes: [
      { type: "Trigger", label: "Pressure sensor" },
      { type: "Condition", label: "Value > 120 kPa" },
      { type: "Action", label: "Send warning" },
    ],
  },
  {
    id: 3,
    name: "Vibration Shutdown",
    enabled: false,
    lastRun: "Never",
    nodes: [
      { type: "Trigger", label: "Vibration sensor" },
      { type: "Condition", label: "Value > 8 mm/s" },
      { type: "Action", label: "Stop machine" },
    ],
  },
];