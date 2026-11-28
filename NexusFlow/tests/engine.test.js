import test from "node:test";
import assert from "node:assert/strict";

import { evaluateCondition } from "../engine/condition.js";

test("Temperature greater than 80 should return true", () => {

  const result = evaluateCondition(
    85,
    "greaterThan",
    80
  );

  assert.equal(result, true);

});

test("Temperature less than 80 should return false", () => {

  const result = evaluateCondition(
    85,
    "lessThan",
    80
  );

  assert.equal(result, false);

});