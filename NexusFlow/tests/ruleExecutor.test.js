
import { test } from "node:test";
import assert from "node:assert/strict";
import { executeWorkflow } from "../engine/ruleExecutor.js";

// Test 1: Alert above 80
test("Should generate alert when temperature is above 80", async () => {
  const workflow = {
    nodes: [
      { id: "sensor-1", type: "sensor", data: {} },
      {
        id: "condition-1",
        type: "condition",
        data: { operator: "greaterThan", value: 80 }
      },
      {
        id: "alert-1",
        type: "alert",
        data: { message: "High temperature", severity: "critical" }
      }
    ],
    edges: [
      { source: "sensor-1", target: "condition-1" },
      { source: "condition-1", target: "alert-1" }
    ]
  };

  const result = await executeWorkflow(workflow, { value: 90 });

  assert.equal(result.success, true);
  assert.equal(result.results.length, 2);
  assert.equal(result.results[0].passed, true);
  assert.equal(result.results[1].severity, "critical");
});

// Test 2: No alert below 80
test("Should not generate alert when temperature is below 80", async () => {
  const workflow = {
    nodes: [
      { id: "sensor-1", type: "sensor", data: {} },
      {
        id: "condition-1",
        type: "condition",
        data: { operator: "greaterThan", value: 80 }
      },
      {
        id: "alert-1",
        type: "alert",
        data: { message: "High temperature", severity: "critical" }
      }
    ],
    edges: [
      { source: "sensor-1", target: "condition-1" },
      { source: "condition-1", target: "alert-1" }
    ]
  };

  const result = await executeWorkflow(workflow, { value: 60 });

  assert.equal(result.success, true);
  assert.equal(result.results.length, 1);
  assert.equal(result.results[0].passed, false);
});

// Test 3: Moving Average
test("Should calculate moving average before condition", async () => {
  const workflow = {
    nodes: [
      { id: "sensor-1", type: "sensor", data: {} },
      {
        id: "average-1",
        type: "movingAverage",
        data: { windowSize: 3 }
      },
      {
        id: "condition-1",
        type: "condition",
        data: { operator: "greaterThan", value: 65 }
      },
      {
        id: "alert-1",
        type: "alert",
        data: { message: "High average", severity: "critical" }
      }
    ],
    edges: [
      { source: "sensor-1", target: "average-1" },
      { source: "average-1", target: "condition-1" },
      { source: "condition-1", target: "alert-1" }
    ]
  };

  const result = await executeWorkflow(workflow, {
    values: [60, 70, 80]
  });

  assert.equal(result.success, true);
  assert.equal(result.results[0].value, 70);
  assert.equal(result.results[1].passed, true);
  assert.equal(result.results[2].type, "alert");
});

// Test 4: Math Node
test("Should execute math node correctly", async () => {
  const workflow = {
    nodes: [
      { id: "sensor-1", type: "sensor", data: {} },
      {
        id: "math-1",
        type: "math",
        data: { operation: "multiply", value: 2 }
      },
      {
        id: "condition-1",
        type: "condition",
        data: { operator: "greaterThan", value: 150 }
      },
      {
        id: "alert-1",
        type: "alert",
        data: { message: "High temperature", severity: "critical" }
      }
    ],
    edges: [
      { source: "sensor-1", target: "math-1" },
      { source: "math-1", target: "condition-1" },
      { source: "condition-1", target: "alert-1" }
    ]
  };

  const result = await executeWorkflow(workflow, { value: 90 });

  assert.equal(result.success, true);
  assert.equal(
    result.results.find(item => item.type === "math").value,
    180
  );
  assert.equal(
    result.results.find(item => item.type === "condition").passed,
    true
  );
  assert.equal(
    result.results.find(item => item.type === "alert").type,
    "alert"
  );
});

// Test 5: Webhook with missing URL (no real network request)
test("Should report webhook failure when URL is missing", async () => {
  const workflow = {
    nodes: [
      { id: "sensor-1", type: "sensor", data: {} },
      {
        id: "webhook-1",
        type: "webhook",
        data: {}
      }
    ],
    edges: [
      { source: "sensor-1", target: "webhook-1" }
    ]
  };

  const result = await executeWorkflow(workflow, { value: 90 });

  const webhookResult = result.results.find(
    item => item.type === "webhook"
  );

  assert.equal(result.success, true);
  assert.equal(webhookResult.status, "failed");
  assert.equal(webhookResult.message, "Webhook URL is required");
});
