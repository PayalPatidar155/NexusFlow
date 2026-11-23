import Workflow from "../models/Workflow.js";

// Create a new workflow
export const createWorkflow = async (workflowData) => {
  const workflow = await Workflow.create(workflowData);
  return workflow;
};

// Get all workflows
export const getAllWorkflows = async () => {
  return await Workflow.find().sort({ createdAt: -1 });
};

// Get workflow by ID
export const getWorkflowById = async (id) => {
  return await Workflow.findById(id);
};

// Update workflow
export const updateWorkflow = async (id, updateData) => {
  return await Workflow.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true
    }
  );
};

// Delete workflow
export const deleteWorkflow = async (id) => {
  return await Workflow.findByIdAndDelete(id);
};

// Activate workflow
export const activateWorkflow = async (id) => {
  return await Workflow.findByIdAndUpdate(
    id,
    {
      isActive: true,
      status: "active"
    },
    { new: true }
  );
};

// Deactivate workflow
export const deactivateWorkflow = async (id) => {
  return await Workflow.findByIdAndUpdate(
    id,
    {
      isActive: false,
      status: "inactive"
    },
    { new: true }
  );
};