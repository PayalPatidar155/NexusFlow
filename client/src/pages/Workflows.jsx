import { useState } from "react";
import { Plus, ArrowRight, ArrowDown } from "lucide-react";
import { initialWorkflows } from "../data/workflowsData";

const nodeColors = {
  Trigger: "border-blue-500 bg-blue-500/10 text-blue-300",
  Condition: "border-yellow-500 bg-yellow-500/10 text-yellow-300",
  Action: "border-green-500 bg-green-500/10 text-green-300",
};

function Workflows() {
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const [selectedId, setSelectedId] = useState(initialWorkflows[0].id);

  const toggleWorkflow = (id) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
    );
  };

  const selected = workflows.find((w) => w.id === selectedId);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Workflows</h1>
          <p className="text-sm text-slate-400">Automation rules for your sensors</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
          <Plus size={16} /> New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: workflow list */}
        <div className="space-y-3">
          {workflows.map((w) => (
            <div
              key={w.id}
              onClick={() => setSelectedId(w.id)}
              className={`bg-slate-800/60 rounded-xl p-4 cursor-pointer border-2 transition ${
                w.id === selectedId ? "border-blue-500" : "border-transparent hover:border-slate-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-white font-medium">{w.name}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWorkflow(w.id);
                  }}
                  className={`text-xs px-2 py-1 rounded-full ${
                    w.enabled ? "bg-green-500/20 text-green-400" : "bg-slate-600/40 text-slate-400"
                  }`}
                >
                  {w.enabled ? "Active" : "Paused"}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">Last run: {w.lastRun}</p>
            </div>
          ))}
        </div>

        {/* Right: canvas placeholder */}
        <div className="lg:col-span-2 bg-slate-800/60 rounded-xl p-4">
          <h2 className="text-white font-semibold mb-4">{selected.name}</h2>

          <div className="min-h-64 rounded-lg border border-dashed border-slate-600 p-6 flex flex-col md:flex-row items-center justify-center gap-3">
            {selected.nodes.map((node, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-3">
                <div className={`border-2 rounded-lg px-4 py-3 text-center w-44 ${nodeColors[node.type]}`}>
                  <p className="text-xs uppercase opacity-70">{node.type}</p>
                  <p className="text-sm font-medium">{node.label}</p>
                </div>
                {i < selected.nodes.length - 1 && (
                  <>
                    <ArrowRight className="hidden md:block text-slate-500" size={20} />
                    <ArrowDown className="md:hidden text-slate-500" size={20} />
                  </>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 mt-3">
            Visual builder (React Flow) will replace this area in Week 4.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Workflows;