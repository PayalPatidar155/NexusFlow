import mongoose from "mongoose";

const workflowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    nodes: {
      type: Array,
      required: true
    },

    edges: {
      type: Array,
      required: true
    },

    isActive: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["draft", "active", "inactive", "error"],
      default: "draft"
    }
  },
  {
    timestamps: true
  }
);

const Workflow = mongoose.model("Workflow", workflowSchema);

export default Workflow;