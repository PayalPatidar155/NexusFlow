import test from "node:test";
import assert from "node:assert/strict";
import { of, toArray, lastValueFrom } from "rxjs";

import { movingAverage } from "../engine/operators.js";

test("Moving average should calculate correctly", async () => {
  const result = await lastValueFrom(
    of(60, 70, 80).pipe(
      movingAverage(3),
      toArray()
    )
  );

  assert.deepEqual(result, [70]);
});