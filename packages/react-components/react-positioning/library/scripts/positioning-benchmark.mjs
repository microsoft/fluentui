import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpus, hostname, platform, release, totalmem } from 'node:os';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cypress from 'cypress';

const project = fileURLToPath(new URL('..', import.meta.url));
const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: project, encoding: 'utf8' }).trim();
const baseline = 'fca219991ed9e907b01274bd89ac1431e51c573a';
const sourcePath = 'packages/react-components/react-positioning/library/src';
const output = path.join(project, 'dist/positioning-perf/benchmark.json');
const seed = Number(process.env.POSITIONING_BENCH_SEED || 36870);
assert(Number.isSafeInteger(seed) && seed > 0, 'POSITIONING_BENCH_SEED must be a positive safe integer');

await mkdir(path.dirname(output), { recursive: true });
await rm(output, { force: true });
const oracleSource = await mkdtemp(path.join(project, 'src/positioning-oracle-'));

function assertSamples(report) {
  assert.equal(report.baseline, baseline, 'The comparison must use the pinned Floating UI implementation');
  for (const [name, expectedCount] of [
    ['initialize-24', 8],
    ['imperative', 24],
    ['scroll', 24],
    ['resize', 24],
  ]) {
    const workload = report.workloads[name];
    assert(workload, `${name}: benchmark results are missing`);
    for (const engine of ['oracle', 'replacement']) {
      const samples = workload.samples[engine];
      assert.equal(samples.length, expectedCount, `${name}/${engine}: expected every measured sample`);
      for (const sample of samples) {
        const duration = typeof sample === 'number' ? sample : sample.batchMs;
        assert(Number.isFinite(duration) && duration > 0, `${name}/${engine}: invalid timing sample ${duration}`);
      }
    }
    assert.equal(workload.samples.replacementOverOracle.length, expectedCount, `${name}: paired ratios missing`);
    assert(
      workload.samples.replacementOverOracle.every(value => Number.isFinite(value) && value > 0),
      `${name}: invalid paired ratios`,
    );
  }
}

try {
  const archive = execFileSync('git', ['archive', baseline, sourcePath], { cwd: root });
  execFileSync('tar', ['-x', '--strip-components=5', '-C', oracleSource], { input: archive });
  process.env.FLUENT_POSITIONING_ORACLE_SOURCE = oracleSource;
  process.env.FLUENT_POSITIONING_BENCHMARK = '1';

  console.log(`Comparing replacement with immutable Floating UI baseline ${baseline}; seed=${seed}`);
  const result = await cypress.run({
    project,
    component: true,
    browser: 'electron',
    spec: 'src/usePositioning.performance.cy.tsx',
    config: {
      component: { specPattern: 'src/usePositioning.performance.cy.tsx', excludeSpecPattern: [] },
      retries: 0,
      env: { positioningBenchSeed: seed, positioningBenchBaseline: baseline },
    },
  });
  assert('totalFailed' in result, 'Cypress did not finish the positioning performance run');
  assert.equal(result.totalFailed, 0, 'The browser workload failed or emitted incomplete samples');
  assert.equal(result.totalTests, 1, 'Expected the single complete paired benchmark workload');

  const report = JSON.parse(await readFile(output, 'utf8'));
  assertSamples(report);
  report.runner = {
    hostname: hostname(),
    platform: `${platform()} ${release()}`,
    architecture: process.arch,
    cpu: cpus()[0]?.model,
    logicalCpuCount: cpus().length,
    totalMemoryBytes: totalmem(),
    node: process.version,
    cypress: cypress.version,
    engineHead: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
    seed,
    warmupRounds: 5,
    measuredRounds: 24,
    initializationWarmups: 2,
    measuredInitializations: 8,
    concurrentInstancesPerEngine: 24,
    timing: 'Browser performance.now(); batch completion requires all 24 positioning-end callbacks',
  };
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);

  console.log(
    '\nWorkload         | Oracle median/p95 | Replacement median/p95 | Median paired ratio | P95 paired ratio | CV oracle/replacement',
  );
  for (const [name, workload] of Object.entries(report.workloads)) {
    const { oracle, replacement, pairedReplacementOverOracle: ratio } = workload;
    console.log(
      `${name.padEnd(16)} | ${`${oracle.batch.medianMs.toFixed(3)}/${oracle.batch.p95Ms.toFixed(3)} ms`.padEnd(
        18,
      )} | ` +
        `${`${replacement.batch.medianMs.toFixed(3)}/${replacement.batch.p95Ms.toFixed(3)} ms`.padEnd(22)} | ` +
        `${`${ratio.medianMs.toFixed(3)}x`.padEnd(19)} | ${`${ratio.p95Ms.toFixed(3)}x`.padEnd(16)} | ` +
        `${oracle.batch.coefficientOfVariation.toFixed(2)}/${replacement.batch.coefficientOfVariation.toFixed(2)}`,
    );
  }
  console.log(`\nFull samples and browser/machine metadata: ${path.relative(root, output)}`);
} finally {
  await rm(oracleSource, { recursive: true, force: true });
  delete process.env.FLUENT_POSITIONING_ORACLE_SOURCE;
  delete process.env.FLUENT_POSITIONING_BENCHMARK;
}
