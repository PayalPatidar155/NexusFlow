import test from "node:test";
import assert from "node:assert/strict";

import { validateWorkflow } from "../engine/validator.js";

test("Valid workflow should be accepted", () => {

  const workflow = {
    nodes: [
      {
        id: "sensor-1",
        type: "sensor",
        data: {
          sensorId: "TURBINE_01",
          field: "temperature"
        }
      },
      {
        id: "condition-1",
        type: "condition",
        data: {
          operator: "greaterThan",
          value: 80
        }
      }
    ],
    edges: [
      {
        source: "sensor-1",
        target: "condition-1"
      }
    ]
  };

  assert.equal(validateWorkflow(workflow), true);
});