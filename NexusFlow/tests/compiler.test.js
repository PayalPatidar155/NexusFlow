
import test from "node:test";
import assert from "node:assert/strict";

import { compileWorkflow } from "../engine/compiler.js";

test("Should compile workflow in correct order", () => {
  const workflow = {
    nodes: [
      { id: "sensor", type: "sensor" },
      { id: "average", type: "movingAverage" },
      { id: "condition", type: "condition" },
      { id: "alert", type: "alert" }
    ],
    edges: [
      { source: "sensor", target: "average" },
      { source: "average", target: "condition" },
      { source: "condition", target: "alert" }
    ]
  };

  const result = compileWorkflow(workflow);

  assert.deepEqual(result, [
    "sensor",
    "average",
    "condition",
    "alert"
  ]);
});

test("Should detect cycle in workflow", () => {
  const workflow = {
    nodes: [
      { id: "A" },
      { id: "B" },
      { id: "C" }
    ],
    edges: [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
      { source: "C", target: "A" }
    ]
  };

  assert.throws(
    () => compileWorkflow(workflow),
    /Cycle detected/
  );
});
