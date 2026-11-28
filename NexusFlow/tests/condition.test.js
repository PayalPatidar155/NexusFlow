import test from "node:test";
import assert from "node:assert/strict";

import { evaluateCondition } from "../engine/condition.js";

test("85 greater than 80 should return true", () => {

  const result = evaluateCondition(
    85,
    "greaterThan",
    80
  );

  assert.equal(result, true);

});

test("70 greater than 80 should return false", () => {

  const result = evaluateCondition(
    70,
    "greaterThan",
    80
  );

  assert.equal(result, false);

});