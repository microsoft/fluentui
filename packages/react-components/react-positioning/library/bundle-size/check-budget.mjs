import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export function checkBudget(report, actualBytes) {
  const entries = report.filter(entry => entry.name === 'usePositioning');
  assert.equal(entries.length, 1, 'Expected exactly one usePositioning monosize result');
  const [entry] = entries;
  assert.equal(entry.path, 'bundle-size/usePopper.fixture.js');
  assert.equal(entry.minifiedSize, actualBytes, 'Monosize result must match the emitted fixture');
  assert(Number.isSafeInteger(actualBytes) && actualBytes > 0, 'Expected a nonempty minified bundle');
  assert(actualBytes <= 15000, `usePositioning: ${actualBytes} minified bytes exceeds the 15000-byte budget`);
  return actualBytes;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const report = JSON.parse(await readFile(new URL('../dist/bundle-size/monosize.json', import.meta.url), 'utf8'));
  const { size } = await stat(new URL('../dist/bundle-size/usePopper.output/index.js', import.meta.url));
  console.log(`usePositioning: ${checkBudget(report, size)} / 15000 minified bytes`);
}
