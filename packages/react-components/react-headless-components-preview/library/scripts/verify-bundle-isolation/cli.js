// @ts-check
/**
 * Asserts that no bundle-size fixture in this package bundles a runtime the headless API is
 * meant to stay free of.
 *
 * Bundles with webpack so the verdict comes from the same bundler that produces the bundle-size
 * numbers, and so `usedExports` can name the exact symbols that survived tree shaking.
 *
 * Usage: node scripts/verify-bundle-isolation/cli.js [--config <path>] [--analyze] [--strict]
 */
const { mkdirSync, rmSync, writeFileSync } = require('node:fs');
const { dirname, join, resolve } = require('node:path');
const { parseArgs } = require('node:util');

const webpack = require('webpack');

const { BundleIsolationPlugin } = require('./bundle-isolation-plugin');
const { findFixtures, findWorkspaceRoot, fixtureOutputPath, loadConfig, outputRoot, readJson } = require('./config');
const { createReport, createSummary, formatReport } = require('./report');

/** @typedef {import('./report').Report} Report */
/** @typedef {import('./report').RuntimeOptions} RuntimeOptions */
/** @typedef {import('./report').FixtureResult} FixtureResult */
/** @typedef {import('./bundle-isolation-plugin').BundleIsolationReport} BundleIsolationReport */

main(processArgs()).catch(error => {
  console.error(error);
  process.exit(1);
});

/** @param {{configPath: string, analyze: boolean, strict: boolean}} args */
async function main(args) {
  const packageRoot = dirname(args.configPath);
  const workspaceRoot = findWorkspaceRoot(packageRoot);
  const config = loadConfig(args.configPath, workspaceRoot);
  const packageJson = readJson(join(packageRoot, 'package.json'));
  const fixturesRoot = resolve(packageRoot, config.fixturesRoot);
  const fixtures = findFixtures(fixturesRoot);

  if (fixtures.length === 0) {
    console.error(`No bundle-size fixtures found in ${packageJson.name} - nothing to verify.`);
    process.exit(1);
  }

  /** @type {RuntimeOptions} */
  const options = { ...args, config, fixturesRoot, packageRoot, workspaceRoot };

  // Fixtures come and go; a stale output directory would otherwise be mistaken for a fresh report.
  rmSync(outputRoot(packageRoot), { recursive: true, force: true });

  const results = await Promise.all(fixtures.map(fixture => verifyFixture(fixture, options)));
  const report = createReport({ packageName: packageJson.name, results, fixtures, options });
  const summaryPath = writeSummary(report);

  // One stream for the whole report - splitting it would let the shell interleave the verdict.
  (report.failed ? console.error : console.log)(formatReport(report, summaryPath));

  if (report.failed) {
    process.exit(1);
  }
}

function processArgs() {
  const { values } = parseArgs({
    options: {
      config: { type: 'string', default: 'bundle-isolation.config.json' },
      analyze: { type: 'boolean', default: false },
      strict: { type: 'boolean', default: false },
    },
    allowPositionals: false,
  });

  return { configPath: resolve(process.cwd(), values.config), analyze: values.analyze, strict: values.strict };
}

/**
 * @param {string} fixture
 * @param {RuntimeOptions} options
 * @returns {Promise<FixtureResult>}
 */
async function verifyFixture(fixture, options) {
  /** @type {FixtureResult} */
  const result = { fixture, found: [], leaks: {}, sourceResolved: [] };

  /** @type {BundleIsolationReport | undefined} */
  let analysis;
  let stats;

  try {
    stats = await bundleFixture(fixture, options, report => {
      analysis = report;
    });
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
    return result;
  }

  if (stats.hasErrors()) {
    result.error = (stats.toJson({ all: false, errors: true }).errors ?? []).map(error => error.message).join('\n    ');
    return result;
  }

  if (!analysis) {
    result.error = 'the bundle isolation plugin did not report on this build';
    return result;
  }

  result.leaks = analysis.leaks;
  result.sourceResolved = analysis.sourceResolved;
  result.found = Object.keys(analysis.leaks).sort();

  return result;
}

/**
 * @param {string} fixture
 * @param {RuntimeOptions} options
 * @param {(report: BundleIsolationReport) => void} onReport
 * @returns {Promise<import('webpack').Stats>}
 */
function bundleFixture(fixture, options, onReport) {
  const compiler = webpack(createWebpackConfig(fixture, options, onReport));

  return new Promise((resolveStats, rejectStats) => {
    compiler.run((error, stats) => {
      compiler.close(() => {
        if (error || !stats) {
          rejectStats(error ?? new Error('webpack finished without producing stats'));
          return;
        }
        resolveStats(stats);
      });
    });
  });
}

/**
 * @param {string} fixture
 * @param {RuntimeOptions} options
 * @param {(report: BundleIsolationReport) => void} onReport
 * @returns {import('webpack').Configuration}
 */
function createWebpackConfig(fixture, options, onReport) {
  const outputPath = fixtureOutputPath(fixture, options.packageRoot);

  return {
    name: 'bundle-isolation',
    target: 'web',
    mode: 'production',
    context: options.workspaceRoot,
    entry: join(options.fixturesRoot, fixture),
    externals: Object.fromEntries(options.config.externals.map(name => [name, name])),
    output: { path: outputPath, filename: 'index.js' },
    performance: { hints: false },
    // Scope hoisting and minification change how code is emitted, not which modules and exports
    // survive tree shaking, so both stay off to keep the module graph 1:1 for attribution.
    optimization: { concatenateModules: false, minimize: false },
    plugins: [
      new BundleIsolationPlugin({
        forbiddenPackages: options.config.forbiddenPackages,
        workspaceRoot: options.workspaceRoot,
        packageRoot: options.packageRoot,
        onReport,
      }),
      ...(options.analyze ? createAnalyzerPlugins(outputPath) : []),
    ],
  };
}

/**
 * One instance per output format - `analyzerMode` is single valued, so the treemap and its
 * underlying data need separate plugins.
 *
 * @param {string} outputPath
 */
function createAnalyzerPlugins(outputPath) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

  return [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: join(outputPath, 'report.html'),
      openAnalyzer: false,
      logLevel: 'silent',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'json',
      reportFilename: join(outputPath, 'report.json'),
      logLevel: 'silent',
    }),
  ];
}

/** @param {Report} report */
function writeSummary(report) {
  const summaryPath = join(outputRoot(report.options.packageRoot), 'summary.json');

  mkdirSync(dirname(summaryPath), { recursive: true });
  writeFileSync(summaryPath, JSON.stringify(createSummary(report), null, 2) + '\n');

  return summaryPath;
}
