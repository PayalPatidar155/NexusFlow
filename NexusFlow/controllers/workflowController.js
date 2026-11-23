import * as workflowService from "../services/workflowService.js";

// Create workflow
export const createWorkflow = async (req, res) => {
  try {
    const { name, description, nodes, edges } = req.body;

    if (!name || !Array.isArray(nodes) || !Array.isArray(edges)) {
      return res.status(400).json({
        success: false,
        message: "Name, nodes and edges are required"
      });
    }

    const workflow = await workflowService.createWorkflow({
      name,
      description,
      nodes,
      edges
    });

    res.status(201).json({
      success: true,
      message: "Workflow created successfully",
      data: workflow
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create workflow",
      error: error.message
    });
  }
};

// Get all workflows
export const getAllWorkflows = async (req, res) => {
  try {
    const workflows = await workflowService.getAllWorkflows();

    res.status(200).json({
      success: true,
      count: workflows.length,
      data: workflows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch workflows",
      error: error.message
    });
  }
};

// Get workflow by ID
export const getWorkflowById = async (req, res) => {
  try {
    const workflow = await workflowService.getWorkflowById(req.params.id);

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found"
      });
    }

    res.status(200).json({
      success: true,
      data: workflow
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch workflow",
      error: error.message
    });
  }
};

// Update workflow
export const updateWorkflow = async (req, res) => {
  try {
    const workflow = await workflowService.updateWorkflow(
      req.params.id,
      req.body
    );

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Workflow updated successfully",
      data: workflow
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update workflow",
      error: error.message
    });
  }
};

// Delete workflow
export const deleteWorkflow = async (req, res) => {
  try {
    const workflow = await workflowService.deleteWorkflow(req.params.id);

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Workflow deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete workflow",
      error: error.message
    });
  }
};

// Activate workflow
export const activateWorkflow = async (req, res) => {
  try {
    const workflow = await workflowService.activateWorkflow(req.params.id);

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Workflow activated successfully",
      data: workflow
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to activate workflow",
      error: error.message
    });
  }
};

// Deactivate workflow
export const deactivateWorkflow = async (req, res) => {
  try {
    const workflow = await workflowService.deactivateWorkflow(req.params.id);

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Workflow deactivated successfully",
      data: workflow
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to deactivate workflow",
      error: error.message
    });
  }
};