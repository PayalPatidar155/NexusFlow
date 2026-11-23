import express from "express";

import {
  createWorkflow,
  getAllWorkflows,
  getWorkflowById,
  updateWorkflow,
  deleteWorkflow,
  activateWorkflow,
  deactivateWorkflow
} from "../controllers/workflowController.js";

const router = express.Router();

// Create workflow
router.post("/", createWorkflow);

// Get all workflows
router.get("/", getAllWorkflows);

// Get workflow by ID
router.get("/:id", getWorkflowById);

// Update workflow
router.put("/:id", updateWorkflow);

// Delete workflow
router.delete("/:id", deleteWorkflow);

// Activate workflow
router.post("/:id/activate", activateWorkflow);

// Deactivate workflow
router.post("/:id/deactivate", deactivateWorkflow);

export default router;