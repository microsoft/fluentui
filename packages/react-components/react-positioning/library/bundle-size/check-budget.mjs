import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

/** Absolute limit for the minified `usePositioning` fixture, gzip is reported separately */
export const BUDGET = 12000;

export function checkBudget(report, actualBytes) {
  const entries = report.filter(entry => entry.name === 'usePositioning');
  assert.equal(entries.length, 1, 'Expected exactly one usePositioning monosize result');
  const [entry] = entries;
  assert.equal(entry.path, 'bundle-size/usePopper.fixture.js');
  assert.equal(entry.minifiedSize, actualBytes, 'Monosize result must match the emitted fixture');
  assert(Number.isSafeInteger(actualBytes) && actualBytes > 0, 'Expected a nonempty minified bundle');
  assert(actualBytes <= BUDGET, `usePositioning: ${actualBytes} minified bytes exceeds the ${BUDGET}-byte budget`);
  return actualBytes;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const report = JSON.parse(await readFile(new URL('../dist/bundle-size/monosize.json', import.meta.url), 'utf8'));
  const { size } = await stat(new URL('../dist/bundle-size/usePopper.output/index.js', import.meta.url));
  console.log(`usePositioning: ${checkBudget(report, size)} / ${BUDGET} minified bytes`);
}
