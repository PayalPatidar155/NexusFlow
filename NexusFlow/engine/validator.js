const allowedNodeTypes = [
  "sensor",
  "movingAverage",
  "math",
  "condition",
  "alert",
  "webhook"
];

const allowedOperators = [
  "greaterThan",
  "lessThan",
  "equalTo",
  "greaterThanOrEqual",
  "lessThanOrEqual"
];

export const validateWorkflow = (workflow) => {

  if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
    throw new Error("Invalid nodes");
  }

  if (!workflow.edges || !Array.isArray(workflow.edges)) {
    throw new Error("Invalid edges");
  }

  const nodeIds = new Set();

  for (const node of workflow.nodes) {

    if (!node.id || nodeIds.has(node.id)) {
      throw new Error("Missing or duplicate node ID");
    }

    nodeIds.add(node.id);

    if (!allowedNodeTypes.includes(node.type)) {
      throw new Error("Invalid node type");
    }

    if (
      node.type === "condition" &&
      !allowedOperators.includes(node.data?.operator)
    ) {
      throw new Error("Invalid condition operator");
    }
  }

  for (const edge of workflow.edges) {

    if (
      !nodeIds.has(edge.source) ||
      !nodeIds.has(edge.target)
    ) {
      throw new Error("Invalid edge connection");
    }
  }

  return true;
};