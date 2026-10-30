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

const layouts = ['flat', 'nested'];
const workloadCounts = { 'initialize-24': 16, imperative: 24, scroll: 24, resize: 24 };
const workloadNames = layouts.flatMap(layout => Object.keys(workloadCounts).map(name => `${layout}/${name}`));

function assertSamples(report) {
  assert.equal(report.baseline, baseline, 'The comparison must use the pinned Floating UI implementation');
  assert.equal(report.metadata.activeEngineCount, 1, 'Only one engine may be mounted during a sample');
  assert.deepEqual(Object.keys(report.workloads).sort(), [...workloadNames].sort(), 'Unexpected benchmark workloads');
  for (const name of workloadNames) {
    const workload = report.workloads[name];
    const expectedCount = workloadCounts[name.split('/')[1]];
    for (const engine of ['oracle', 'replacement']) {
      const samples = workload.samples[engine];
      assert.equal(samples.length, expectedCount, `${name}/${engine}: expected every measured sample`);
      for (const sample of samples) {
        const duration = sample.batchMs;
        assert(Number.isFinite(duration) && duration > 0, `${name}/${engine}: invalid timing sample ${duration}`);
        assert.equal(sample.instanceMs.length, 24, `${name}/${engine}: every instance must finish`);
        assert(
          sample.instanceMs.every(value => Number.isFinite(value) && value > 0),
          `${name}/${engine}: invalid instance timing`,
        );
      }
    }
    assert.deepEqual(
      workload.samples.oracle.map(sample => sample.round),
      workload.samples.replacement.map(sample => sample.round),
      `${name}: mismatched paired rounds`,
    );
  }
}

function summarize(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const percentile = fraction => sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * fraction) - 1)];
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  return {
    count: values.length,
    medianMs: percentile(0.5),
    p95Ms: percentile(0.95),
    p10Ms: percentile(0.1),
    p90Ms: percentile(0.9),
    coefficientOfVariation: mean ? Math.sqrt(variance) / mean : 0,
  };
}

const geometricMean = values => Math.exp(values.reduce((sum, value) => sum + Math.log(value), 0) / values.length);

/**
 * Paired replacement/oracle ratios: the geometric mean is the typical relative cost, the seeded percentile
 * bootstrap gives its 95% confidence interval. An interval entirely below 1 means the replacement is faster.
 */
function summarizeRatios(ratios) {
  let state = seed;
  const random = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  const resamples = Array.from({ length: 2000 }, () =>
    geometricMean(ratios.map(() => ratios[Math.floor(random() * ratios.length)])),
  ).sort((a, b) => a - b);
  return {
    ...summarize(ratios),
    geometricMean: geometricMean(ratios),
    ci95: [resamples[Math.floor(resamples.length * 0.025)], resamples[Math.ceil(resamples.length * 0.975) - 1]],
  };
}

function analyze(report) {
  for (const [name, workload] of Object.entries(report.workloads)) {
    const { oracle, replacement } = workload.samples;
    const ratios = replacement.map((sample, index) => sample.batchMs / oracle[index].batchMs);
    Object.assign(workload, {
      oracle: {
        batch: summarize(oracle.map(s => s.batchMs)),
        perInstance: summarize(oracle.flatMap(s => s.instanceMs)),
      },
      replacement: {
        batch: summarize(replacement.map(s => s.batchMs)),
        perInstance: summarize(replacement.flatMap(s => s.instanceMs)),
      },
      pairedReplacementOverOracle: summarizeRatios(ratios),
    });
    workload.samples.replacementOverOracle = ratios;
    assert(
      ratios.every(value => Number.isFinite(value) && value > 0),
      `${name}: invalid paired ratios`,
    );
  }
}

function markdownSummary(report) {
  const ms = value => value.toFixed(2);
  const rows = Object.entries(report.workloads).map(([name, { oracle, replacement, pairedReplacementOverOracle }]) => {
    const { geometricMean: ratio, ci95 } = pairedReplacementOverOracle;
    return (
      `| ${name} | ${ms(oracle.batch.medianMs)} / ${ms(oracle.batch.p95Ms)} | ` +
      `${ms(replacement.batch.medianMs)} / ${ms(replacement.batch.p95Ms)} | ` +
      `${ratio.toFixed(3)}× (${ci95[0].toFixed(3)}–${ci95[1].toFixed(3)}) |`
    );
  });
  const { runner, metadata } = report;
  return [
    '| Workload (24 instances) | Floating UI median / p95 (ms) | Replacement median / p95 (ms) | Paired ratio, geomean (95% CI) |',
    '| --- | ---: | ---: | ---: |',
    ...rows,
    '',
    `${runner.cpu} (${runner.logicalCpuCount} threads), ${runner.platform}, ${
      metadata.userAgent.match(/Electron\/[\d.]+/)?.[0]
    } ` +
      `(${metadata.userAgent.match(/Chrome\/[\d.]+/)?.[0]}), seed ${report.seed}, ` +
      `engine ${runner.engineHead.slice(0, 10)}${runner.engineDirty ? ' (uncommitted changes)' : ''}, ` +
      `oracle ${report.baseline.slice(0, 10)}.`,
  ].join('\n');
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
    // Uncommitted engine changes are measured too, so flag them instead of attributing the run to HEAD
    engineDirty: !!execFileSync('git', ['status', '--porcelain', '--untracked-files=no', '--', sourcePath], {
      cwd: root,
      encoding: 'utf8',
    }).trim(),
    seed,
    warmupRounds: 5,
    measuredRounds: 24,
    initializationWarmups: 3,
    measuredInitializations: 16,
    concurrentInstancesPerEngine: 24,
    activeEngineCount: 1,
    timing: 'Browser performance.now(); batch completion requires all 24 positioning-end callbacks',
  };

  analyze(report);
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
  const summary = markdownSummary(report);
  await writeFile(path.join(path.dirname(output), 'summary.md'), `${summary}\n`);
  console.log(`\n${summary}`);
  console.log(`\nFull samples, statistics and browser/machine metadata: ${path.relative(root, output)}`);
} finally {
  await rm(oracleSource, { recursive: true, force: true });
  delete process.env.FLUENT_POSITIONING_ORACLE_SOURCE;
  delete process.env.FLUENT_POSITIONING_BENCHMARK;
}
