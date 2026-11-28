export const compileWorkflow = (workflow) => {

  const { nodes, edges } = workflow;

  const inDegree = {};
  const graph = {};

  nodes.forEach((node) => {
    inDegree[node.id] = 0;
    graph[node.id] = [];
  });

  edges.forEach((edge) => {

    graph[edge.source].push(edge.target);

    inDegree[edge.target]++;
  });

  const queue = [];

  for (const nodeId in inDegree) {
    if (inDegree[nodeId] === 0) {
      queue.push(nodeId);
    }
  }

  const executionOrder = [];

  while (queue.length > 0) {

    const current = queue.shift();

    executionOrder.push(current);

    for (const neighbor of graph[current]) {

      inDegree[neighbor]--;

      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  if (executionOrder.length !== nodes.length) {
    throw new Error("Cycle detected in workflow");
  }

  return executionOrder;
};