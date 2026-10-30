import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BUDGET, checkBudget } from './check-budget.mjs';

const entry = bytes => ({
  name: 'usePositioning',
  path: 'bundle-size/usePopper.fixture.js',
  minifiedSize: bytes,
  gzippedSize: 1,
});

test('uses an inclusive absolute minified-byte limit, not gzip or a relative threshold', () => {
  assert.equal(BUDGET, 12000);
  assert.equal(checkBudget([entry(BUDGET)], BUDGET), BUDGET);
  assert.throws(() => checkBudget([entry(BUDGET + 1)], BUDGET + 1), /exceeds/);
});

test('rejects absent, duplicate, mislabelled, stale and empty measurements', () => {
  assert.throws(() => checkBudget([], 1));
  assert.throws(() => checkBudget([entry(1), entry(1)], 1));
  assert.throws(() => checkBudget([{ ...entry(1), path: 'other.fixture.js' }], 1));
  assert.throws(() => checkBudget([entry(1)], 2));
  assert.throws(() => checkBudget([entry(0)], 0));
});
