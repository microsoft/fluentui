import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    'generator-root': { type: 'string' },
    'package-root': { type: 'string' },
    'output-root': { type: 'string' },
    child: { type: 'boolean', default: false },
  },
});
for (const name of ['generator-root', 'package-root', 'output-root']) {
  assert.ok(values[name], `--${name} is required`);
}
const generatorRoot = fs.realpathSync(path.resolve(values['generator-root']));
const packageRoot = fs.realpathSync(path.resolve(values['package-root']));
const outputRoot = path.resolve(values['output-root']);

if (!values.child) {
  assert.ok(!fs.existsSync(outputRoot), 'Benchmark output must be a new directory');
  const result = spawnSync(
    process.execPath,
    [
      fileURLToPath(import.meta.url),
      '--child',
      '--generator-root',
      generatorRoot,
      '--package-root',
      packageRoot,
      '--output-root',
      outputRoot,
    ],
    { encoding: 'utf8', env: { ...process.env, NODE_OPTIONS: '' }, maxBuffer: 8 * 1024 * 1024 },
  );
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  assert.equal(result.status, 0, `Benchmark child failed: ${result.signal ?? result.error?.message ?? result.status}`);
} else {
  const started = performance.now();
  const checkpoints = [];
  const checkpoint = phase =>
    checkpoints.push({
      phase,
      elapsedMs: Math.round(performance.now() - started),
      heapUsedBytes: process.memoryUsage().heapUsed,
      rssBytes: process.memoryUsage().rss,
    });
  checkpoint('startup');
  const requireGenerator = createRequire(path.join(generatorRoot, 'package.json'));
  const { generateApiMetadata, writeGeneratedMetadata } = requireGenerator(
    path.join(generatorRoot, 'dist/src/generator.js'),
  );
  checkpoint('generator-loaded');
  const generationStarted = performance.now();
  const result = await generateApiMetadata({ packageRoot });
  const generatedMs = Math.round(performance.now() - generationStarted);
  checkpoint('generated');
  const writeStarted = performance.now();
  const written = writeGeneratedMetadata(result, path.join(outputRoot, 'catalog'));
  const writtenMs = Math.round(performance.now() - writeStarted);
  checkpoint('written');
  const files = {};
  let bytes = 0;
  for (const filename of [written.indexPath, ...written.recordPaths]) {
    const content = fs.readFileSync(filename);
    bytes += content.length;
    files[path.relative(path.join(outputRoot, 'catalog'), filename)] = createHash('sha256')
      .update(content)
      .digest('hex');
  }
  checkpoint('verified');
  const manifest = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));
  const metrics = {
    schemaVersion: 1,
    node: process.version,
    package: { name: manifest.name, version: manifest.version },
    generatorRoot,
    generatedMs,
    writtenMs,
    totalMs: Math.round(performance.now() - started),
    peakRssBytes: process.resourceUsage().maxRSS * 1024,
    maxCheckpointHeapBytes: Math.max(...checkpoints.map(point => point.heapUsedBytes)),
    checkpoints,
    records: result.records.length,
    routes: result.index.exports.length,
    outputBytes: bytes,
    files,
  };
  fs.writeFileSync(path.join(outputRoot, 'metrics.json'), `${JSON.stringify(metrics, null, 2)}\n`);
  const { files: fileHashes, ...summary } = metrics;
  console.log(JSON.stringify(summary, null, 2));
}
