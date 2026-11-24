import { createHash } from 'node:crypto';
import { createWriteStream, existsSync, globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const here = dirname(fileURLToPath(import.meta.url));
const { values } = parseArgs({
  options: {
    request: { type: 'string' },
    output: { type: 'string' },
    node: { type: 'string', default: process.execPath },
    'timeout-seconds': { type: 'string', default: '300' },
    'heap-profile': { type: 'boolean', default: false },
  },
});
if (!values.request || !values.output) {
  throw new Error('--request and --output are required; all corpus and profile data stays in that directory');
}
const request = JSON.parse(readFileSync(resolve(values.request), 'utf8'));
assert.equal(typeof request.cwd, 'string');
assert.ok(Array.isArray(request.roots) && request.roots.length > 0);
assert.ok(request.command === 'analyze' || request.command === 'lint');
const timeout = Number(values['timeout-seconds']);
assert.ok(Number.isFinite(timeout) && timeout > 0);
const output = resolve(values.output);
mkdirSync(output, { recursive: true });
const config = request.config;
assert.ok(config && typeof config === 'object');
assert.ok(!config.annotate && !config.fix && !config.protectSuppressions, 'Profiling must remain read-only');
assert.ok(
  Array.isArray(request.args ?? []) &&
    (request.args ?? []).every(
      arg => arg === '--verbose' || (request.command === 'lint' && arg === '--revalidate-justified'),
    ),
  'Only --verbose or lint --revalidate-justified may be supplied as additional profiling arguments',
);
const paths = [
  ...new Set(
    request.roots.flatMap(root => {
      assert.ok(existsSync(root), `Missing source root: ${root}`);
      return globSync('**/*.{ts,tsx}', { cwd: root, exclude: config.exclude ?? [] }).map(file => resolve(root, file));
    }),
  ),
].sort();
const manifest = paths.map(file => ({
  file: relative(request.cwd, file),
  sha256: createHash('sha256').update(readFileSync(file)).digest('hex'),
}));
const serialized = JSON.stringify(manifest);
const manifestHash = createHash('sha256').update(serialized).digest('hex');
writeFileSync(join(output, 'manifest.json'), serialized);
const serializedConfig = JSON.stringify(config);
writeFileSync(join(output, 'config.json'), serializedConfig);
const cli = resolve(request.cli ?? join(here, '../bin/react-compiler-analyzer.js'));
const bundle = resolve(dirname(cli), '../dist/cli.js');
const entryHash = createHash('sha256').update(readFileSync(cli)).digest('hex');
const bundleHash = existsSync(bundle) ? createHash('sha256').update(readFileSync(bundle)).digest('hex') : null;
const samplesPath = join(output, 'memory.jsonl');
writeFileSync(samplesPath, '');
const stdout = createWriteStream(join(output, 'report.json'));
const stderr = createWriteStream(join(output, 'stderr.log'));
const node = resolve(values.node);
const args = [
  ...(values['heap-profile'] ? ['--heap-prof', `--heap-prof-dir=${output}`, '--heap-prof-interval=262144'] : []),
  '--require',
  join(here, 'profile-preload.cjs'),
  cli,
  request.command,
  ...request.roots,
  '--config',
  join(output, 'config.json'),
  '--format',
  'json',
  '--concurrency',
  '1',
  ...(request.args ?? []),
];
const env = { ...process.env, RCA_PROFILE_SAMPLES: samplesPath };
delete env.NODE_OPTIONS;
const start = performance.now();
const child = spawn(node, args, { cwd: request.cwd, env, stdio: ['ignore', 'pipe', 'pipe'] });
child.stdout.pipe(stdout);
child.stderr.pipe(stderr);
let timedOut = false;
const watchdog = setTimeout(() => {
  timedOut = true;
  child.kill('SIGTERM');
}, timeout * 1000);
let force;
child.on('exit', () => clearTimeout(force));
child.on('spawn', () => {
  force = setTimeout(() => child.kill('SIGKILL'), (timeout + 10) * 1000);
});
const status = await new Promise((accept, reject) => {
  child.once('error', reject);
  child.once('close', (code, signal) => accept({ code, signal }));
});
clearTimeout(watchdog);
clearTimeout(force);
await Promise.all([new Promise(done => stdout.end(done)), new Promise(done => stderr.end(done))]);
const samples = readFileSync(samplesPath, 'utf8')
  .trim()
  .split('\n')
  .filter(Boolean)
  .map(line => JSON.parse(line));
const peak = Object.fromEntries(
  ['heapUsed', 'heapTotal', 'external', 'arrayBuffers', 'rss'].map(key => [
    key,
    Math.max(0, ...samples.map(sample => sample[key])),
  ]),
);
const changed = manifest.filter(
  item =>
    createHash('sha256')
      .update(readFileSync(resolve(request.cwd, item.file)))
      .digest('hex') !== item.sha256,
);
assert.equal(changed.length, 0, 'Read-only profile changed source inputs');
let document;
let reportError;
try {
  document = JSON.parse(readFileSync(join(output, 'report.json'), 'utf8'));
} catch (error) {
  reportError = error.message;
}
const summary = {
  ...status,
  timedOut,
  elapsedMs: performance.now() - start,
  files: paths.length,
  manifestHash,
  node,
  cli,
  roots: request.roots.length,
  entryHash,
  bundleHash,
  configHash: createHash('sha256').update(serializedConfig).digest('hex'),
  peak,
  samples: samples.length,
  lastSample: samples.at(-1),
  ...(document
    ? {
        schemaVersion: document.schemaVersion,
        completeness: document.completeness,
        coverage: document.coverage,
        profile: document.profile,
        summary: document.summary,
        resultsHash: createHash('sha256')
          .update(
            JSON.stringify({
              functions: document.functions,
              findings: document.findings,
              directives: document.directives,
              fileDiagnostics: document.fileDiagnostics,
            }),
          )
          .digest('hex'),
      }
    : { reportError }),
};
writeFileSync(join(output, 'metrics.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary));
if (timedOut || status.signal || !document) {
  process.exitCode = 1;
}
