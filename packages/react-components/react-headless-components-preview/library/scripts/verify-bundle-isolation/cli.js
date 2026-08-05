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
const { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } = require('node:fs');
const { dirname, isAbsolute, join, resolve, sep } = require('node:path');
const { parseArgs } = require('node:util');

const Ajv = /** @type {typeof import('ajv').default} */ (/** @type {unknown} */ (require('ajv')));
const webpack = require('webpack');

const { BundleIsolationPlugin } = require('./bundle-isolation-plugin');

/** @typedef {{fixturesRoot: string, externals: string[], forbiddenPackages: string[], allowedViolations: Record<string, string[]>}} Config */
/** @typedef {{configPath: string, analyze: boolean, strict: boolean, config: Config, fixturesRoot: string, packageRoot: string, workspaceRoot: string}} RuntimeOptions */
/** @typedef {import('./bundle-isolation-plugin').Leak} Leak */
/** @typedef {import('./bundle-isolation-plugin').BundleIsolationReport} BundleIsolationReport */
/** @typedef {{fixture: string, found: string[], leaks: Record<string, Leak>, sourceResolved: string[], error?: string}} FixtureResult */
/** @typedef {FixtureResult & {status: 'error' | 'regression' | 'stale' | 'allowed' | 'clean', allowed: string[], tolerated: string[], regressions: string[], stale: string[]}} Outcome */

const schemaPath = join(__dirname, 'schema.json');

main(processArgs()).catch(error => {
  console.error(error);
  process.exit(1);
});

/** @param {{configPath: string, analyze: boolean, strict: boolean}} options */
async function main(options) {
  const packageRoot = dirname(options.configPath);
  const workspaceRoot = findWorkspaceRoot(packageRoot);
  const config = loadConfig({ ...options, workspaceRoot });
  const fixturesRoot = resolve(packageRoot, config.fixturesRoot);
  const packageJson = readJson(join(packageRoot, 'package.json'));
  const fixtures = findFixtures(fixturesRoot);

  if (fixtures.length === 0) {
    console.error(`No bundle-size fixtures found in ${packageJson.name} - nothing to verify.`);
    process.exit(1);
  }

  /** @type {RuntimeOptions} */
  const runtimeOptions = { ...options, config, fixturesRoot, packageRoot, workspaceRoot };

  // Fixtures come and go; a stale output directory would otherwise be mistaken for a fresh report.
  rmSync(outputRoot(runtimeOptions), { recursive: true, force: true });

  const results = await Promise.all(fixtures.map(fixture => verifyFixture(fixture, runtimeOptions)));
  const outcomes = results.map(result => classify(result, runtimeOptions));
  const orphans = orphanedAllowlistEntries(fixtures, runtimeOptions);
  const failed = hasFailed(outcomes, orphans, runtimeOptions);

  const summaryPath = writeSummary(outcomes, orphans, packageJson.name, runtimeOptions);
  const report = formatReport(outcomes, orphans, packageJson.name, runtimeOptions, summaryPath);

  // One stream for the whole report - splitting it would let the shell interleave the verdict.
  (failed ? console.error : console.log)(report);

  if (failed) {
    process.exit(1);
  }
}

function processArgs() {
  const { values } = parseArgs({
    options: {
      config: {
        type: 'string',
        default: 'bundle-isolation.config.json',
      },
      analyze: {
        type: 'boolean',
        default: false,
      },
      strict: {
        type: 'boolean',
        default: false,
      },
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

  let stats;
  /** @type {BundleIsolationReport | undefined} */
  let report;

  try {
    stats = await bundleFixture(fixture, options, value => {
      report = value;
    });
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
    return result;
  }

  if (stats.hasErrors()) {
    result.error = (stats.toJson({ all: false, errors: true }).errors ?? []).map(error => error.message).join('\n    ');
    return result;
  }

  if (!report) {
    result.error = 'the bundle isolation plugin did not report on this build';
    return result;
  }

  result.leaks = report.leaks;
  result.sourceResolved = report.sourceResolved;
  result.found = Object.keys(report.leaks).sort();

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
  const outputPath = fixtureOutputPath(fixture, options);

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

/**
 * @param {FixtureResult} result
 * @param {RuntimeOptions} options
 * @returns {Outcome}
 */
function classify(result, options) {
  const allowed = options.config.allowedViolations[result.fixture] ?? [];
  const regressions = result.found.filter(name => !allowed.includes(name));
  const stale = allowed.filter(name => !result.found.includes(name));
  const tolerated = allowed.filter(name => result.found.includes(name));

  const status =
    result.error || result.sourceResolved.length > 0
      ? 'error'
      : regressions.length > 0
      ? 'regression'
      : stale.length > 0
      ? 'stale'
      : tolerated.length > 0
      ? 'allowed'
      : 'clean';

  return { ...result, status, allowed, tolerated, regressions, stale };
}

/**
 * @param {string[]} fixtures
 * @param {RuntimeOptions} options
 */
function orphanedAllowlistEntries(fixtures, options) {
  return Object.entries(options.config.allowedViolations)
    .filter(([fixture]) => !fixtures.includes(fixture))
    .map(([fixture, packages]) => ({ fixture, packages }));
}

/**
 * @param {Outcome[]} outcomes
 * @param {ReturnType<typeof orphanedAllowlistEntries>} orphans
 * @param {RuntimeOptions} options
 */
function hasFailed(outcomes, orphans, options) {
  return (
    orphans.length > 0 ||
    outcomes.some(
      outcome =>
        outcome.status === 'error' ||
        outcome.regressions.length > 0 ||
        outcome.stale.length > 0 ||
        (options.strict && outcome.tolerated.length > 0),
    )
  );
}

/**
 * @param {Outcome[]} outcomes
 * @param {ReturnType<typeof orphanedAllowlistEntries>} orphans
 * @param {string} packageName
 * @param {RuntimeOptions} options
 * @param {string} summaryPath
 */
function formatReport(outcomes, orphans, packageName, options, summaryPath) {
  const lines = [`Bundle isolation · ${packageName}`, `forbidden: ${options.config.forbiddenPackages.join(', ')}`, ''];

  for (const outcome of outcomes) {
    lines.push(...formatFixture(outcome, options), '');
  }

  for (const orphan of orphans) {
    lines.push(
      `  ORPHAN      ${orphan.fixture} - allowlisted (${orphan.packages.join(', ')}) but not a bundle-size fixture`,
      `    remove the entry from allowedViolations in ${configPathLabel(options)}`,
      '',
    );
  }

  lines.push(...formatVerdict(outcomes, orphans, options), '', ...formatArtifacts(options, summaryPath));

  return lines.join('\n');
}

/**
 * @param {Outcome} outcome
 * @param {RuntimeOptions} options
 */
function formatFixture(outcome, options) {
  if (outcome.status === 'error') {
    return [`  ERROR       ${outcome.fixture}`, ...formatError(outcome, options)];
  }

  if (outcome.status === 'clean') {
    return [`  CLEAN       ${outcome.fixture}`];
  }

  const lines = [];

  if (outcome.regressions.length > 0) {
    lines.push(
      `  REGRESSION  ${outcome.fixture} - ${count(
        outcome.regressions.length,
        'forbidden package',
      )} not on the allowlist`,
      ...outcome.regressions.map(name => describeLeak(name, outcome.leaks[name], options)),
    );
  }

  if (outcome.stale.length > 0) {
    lines.push(
      `  STALE       ${outcome.fixture} - no longer pulls in ${outcome.stale.join(', ')}`,
      `    remove it from allowedViolations in ${configPathLabel(options)} to lock the fix in`,
    );
  }

  if (outcome.tolerated.length > 0) {
    const modules = outcome.tolerated.reduce((total, name) => total + outcome.leaks[name].modules, 0);
    lines.push(
      `  ALLOWED     ${outcome.fixture} - ${count(outcome.tolerated.length, 'forbidden package')}, ${count(
        modules,
        'module',
      )}`,
      ...formatTolerated(outcome, options),
    );
  }

  return lines;
}

/**
 * @param {Outcome} outcome
 * @param {RuntimeOptions} options
 */
function formatError(outcome, options) {
  if (outcome.error) {
    return [
      `    could not be bundled - is the package built?`,
      ...outcome.error.split('\n').map(line => `      ${line.trim()}`),
    ];
  }

  return [
    `    resolved to package sources instead of built output, so the result is meaningless`,
    `      e.g. ${relativeToWorkspace(outcome.sourceResolved[0], options.workspaceRoot)}`,
  ];
}

/**
 * Ordered by module count so the most expensive debt to pay down is listed first.
 *
 * @param {Outcome} outcome
 * @param {RuntimeOptions} options
 */
function formatTolerated(outcome, options) {
  const rows = outcome.tolerated
    .map(name => ({ name, leak: outcome.leaks[name] }))
    .sort((a, b) => b.leak.modules - a.leak.modules || a.name.localeCompare(b.name));

  const nameWidth = Math.max(...rows.map(row => row.name.length));
  const moduleWidth = Math.max(...rows.map(row => count(row.leak.modules, 'module').length));

  return rows.flatMap(({ name, leak }) => [
    `    ${name.padEnd(nameWidth)}  ${count(leak.modules, 'module').padStart(moduleWidth)}  ${count(
      leak.exports.length,
      'export',
    )}`,
    ...originsOf(leak, options).map(origin => `      via ${origin}`),
  ]);
}

/**
 * @param {Leak} leak
 * @param {RuntimeOptions} options
 */
function originsOf(leak, options) {
  const origins = new Set(
    leak.exports.flatMap(({ importers }) =>
      importers.map(importer => importer.via ?? relativeToWorkspace(importer.module, options.workspaceRoot)),
    ),
  );
  const listed = [...origins].sort().slice(0, 3);
  const hidden = origins.size - listed.length;

  return hidden > 0 ? [...listed, `+${count(hidden, 'more entry point')}`] : listed;
}

/**
 * @param {Outcome[]} outcomes
 * @param {ReturnType<typeof orphanedAllowlistEntries>} orphans
 * @param {RuntimeOptions} options
 */
function formatVerdict(outcomes, orphans, options) {
  const totals = {
    errors: outcomes.filter(outcome => outcome.status === 'error').length,
    regressions: outcomes.reduce((total, outcome) => total + outcome.regressions.length, 0),
    stale: outcomes.reduce((total, outcome) => total + outcome.stale.length, 0),
    tolerated: outcomes.reduce((total, outcome) => total + outcome.tolerated.length, 0),
  };
  const fixtures = count(outcomes.length, 'fixture');

  if (hasFailed(outcomes, orphans, options)) {
    const parts = [
      totals.errors > 0 && count(totals.errors, 'fixture') + ' failed to bundle',
      totals.regressions > 0 && count(totals.regressions, 'regression'),
      totals.stale > 0 && count(totals.stale, 'stale allowlist entry', 'stale allowlist entries'),
      orphans.length > 0 && count(orphans.length, 'orphaned allowlist entry', 'orphaned allowlist entries'),
      options.strict && totals.tolerated > 0 && count(totals.tolerated, 'allowed violation') + ' rejected by --strict',
    ].filter(Boolean);

    return [`FAIL - ${fixtures}: ${parts.join(', ')}`];
  }

  if (totals.tolerated === 0) {
    return [`PASS - ${fixtures} free of ${options.config.forbiddenPackages.join(', ')}`];
  }

  const leaked = [...new Set(outcomes.flatMap(outcome => outcome.tolerated))].sort();
  const keptOut = options.config.forbiddenPackages.filter(
    pattern => !leaked.some(name => matchesPackagePattern(pattern, name)),
  );

  return [
    `PASS WITH DEBT - ${fixtures}, 0 regressions, ${count(totals.tolerated, 'allowed violation')}`,
    ...(keptOut.length > 0 ? [`  kept out:  ${keptOut.join(', ')}`] : []),
    `  allowlist: ${leaked.join(', ')}`,
    `             tracked in ${configPathLabel(options)} - deleting an entry is the goal, adding one is a regression`,
  ];
}

/**
 * @param {RuntimeOptions} options
 * @param {string} summaryPath
 */
function formatArtifacts(options, summaryPath) {
  const lines = [`summary:  ${relativeToWorkspace(summaryPath, options.workspaceRoot)}`];

  if (options.analyze) {
    lines.push(
      `analyzer: ${relativeToWorkspace(
        outputRoot(options),
        options.workspaceRoot,
      )}/<fixture>/report.html + report.json`,
    );
  } else {
    lines.push(`analyzer: rerun with --analyze for per-fixture treemaps`);
  }

  return lines;
}

/**
 * @param {string} pattern
 * @param {string} name
 */
function matchesPackagePattern(pattern, name) {
  return pattern.endsWith('/*') ? name.startsWith(pattern.slice(0, -1)) : name === pattern;
}

/**
 * @param {number} value
 * @param {string} singular
 * @param {string} [plural]
 */
function count(value, singular, plural) {
  return `${value} ${value === 1 ? singular : plural ?? `${singular}s`}`;
}

/** @param {RuntimeOptions} options */
function configPathLabel(options) {
  return relativeToWorkspace(options.configPath, options.workspaceRoot);
}

/**
 * Companion to the analyzer treemap: the same verdict as the console output, but structured so it
 * can be diffed between runs or handed to another tool. Always written - it is the cheap artifact.
 *
 * @param {Outcome[]} outcomes
 * @param {ReturnType<typeof orphanedAllowlistEntries>} orphans
 * @param {string} packageName
 * @param {RuntimeOptions} options
 */
function writeSummary(outcomes, orphans, packageName, options) {
  const toWorkspacePath = (/** @type {string} */ path) => relativeToWorkspace(path, options.workspaceRoot);

  const summary = {
    package: packageName,
    config: toWorkspacePath(options.configPath),
    strict: options.strict,
    status: hasFailed(outcomes, orphans, options)
      ? 'failed'
      : outcomes.some(outcome => outcome.tolerated.length > 0)
      ? 'passed-with-debt'
      : 'passed',
    forbiddenPackages: options.config.forbiddenPackages,
    orphanedAllowlistEntries: orphans,
    fixtures: outcomes.map(outcome => ({
      fixture: outcome.fixture,
      status: outcome.status,
      analyzerReport: options.analyze
        ? toWorkspacePath(join(fixtureOutputPath(outcome.fixture, options), 'report.json'))
        : null,
      error: outcome.error ?? null,
      sourceResolved: outcome.sourceResolved.map(toWorkspacePath),
      allowedViolations: outcome.allowed,
      tolerated: outcome.tolerated,
      regressions: outcome.regressions,
      stale: outcome.stale,
      leaks: Object.fromEntries(
        Object.entries(outcome.leaks).map(([name, leak]) => [
          name,
          {
            modules: leak.modules,
            exports: leak.exports.map(({ name: exportName, importers }) => ({
              name: exportName,
              importers: importers.map(importer => ({ module: toWorkspacePath(importer.module), via: importer.via })),
            })),
          },
        ]),
      ),
    })),
  };

  const summaryPath = join(outputRoot(options), 'summary.json');
  mkdirSync(dirname(summaryPath), { recursive: true });
  writeFileSync(summaryPath, JSON.stringify(summary, null, 2) + '\n');

  return summaryPath;
}

/** @param {Pick<RuntimeOptions, 'packageRoot'>} options */
function outputRoot(options) {
  return join(options.packageRoot, 'dist', 'bundle-isolation');
}

/**
 * @param {string} fixture
 * @param {Pick<RuntimeOptions, 'packageRoot'>} options
 */
function fixtureOutputPath(fixture, options) {
  return join(outputRoot(options), fixture.replace(/\.fixture\.js$/, ''));
}

/**
 * @param {string} name
 * @param {Leak} leak
 * @param {RuntimeOptions} options
 */
function describeLeak(name, leak, options) {
  const header = `    ${name} - ${leak.modules} module${leak.modules === 1 ? '' : 's'} retained`;

  if (leak.exports.length === 0) {
    return `${header}\n      no importing symbol identified - rerun with --analyze to inspect the bundle`;
  }

  const listed = leak.exports.slice(0, 5).map(({ name: exportName, importers }) => {
    const lines = importers.slice(0, 2).map(importer => {
      const module = relativeToWorkspace(importer.module, options.workspaceRoot);
      return `        <- ${module}${importer.via ? ` (via ${importer.via})` : ''}`;
    });
    const hidden = importers.length - lines.length;
    if (hidden > 0) {
      lines.push(`        <- +${hidden} more`);
    }
    return `      ${exportName}\n${lines.join('\n')}`;
  });
  const rest = leak.exports.length - listed.length;

  return `${header}\n${listed.join('\n')}${
    rest > 0 ? `\n      ...and ${rest} more export${rest === 1 ? '' : 's'}` : ''
  }`;
}

/** @param {string} root */
function findFixtures(root) {
  if (!existsSync(root)) {
    return [];
  }

  return readdirSync(root, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.fixture.js'))
    .map(entry => {
      const path = join(entry.parentPath, entry.name);
      return path.slice(root.length + 1);
    })
    .sort();
}

/**
 * @param {{configPath: string, workspaceRoot: string}} options
 * @returns {Config}
 */
function loadConfig(options) {
  const config = readJson(options.configPath);
  const schema = /** @type {object} */ (readJson(schemaPath));
  const validate = new Ajv({ allErrors: true }).compile(schema);

  if (!validate(config)) {
    const errors = (validate.errors ?? [])
      .map(/** @param {import('ajv').ErrorObject} error */ error => `${error.instancePath || '/'} ${error.message}`)
      .join('\n    ');
    throw new Error(
      `Invalid bundle isolation configuration at ${relativeToWorkspace(
        options.configPath,
        options.workspaceRoot,
      )}:\n    ${errors}`,
    );
  }

  return /** @type {Config} */ (config);
}

/** @param {string} startDir */
function findWorkspaceRoot(startDir) {
  let dir = startDir;
  while (dir !== dirname(dir)) {
    if (existsSync(join(dir, 'nx.json'))) {
      return dir;
    }
    dir = dirname(dir);
  }
  throw new Error(`Could not locate the workspace root above ${startDir}`);
}

/** @param {string} filePath */
function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

/**
 * @param {string} modulePath
 * @param {string} workspaceRoot
 */
function relativeToWorkspace(modulePath, workspaceRoot) {
  const absolute = isAbsolute(modulePath) ? modulePath : resolve(workspaceRoot, modulePath);
  return absolute.startsWith(workspaceRoot + sep) ? absolute.slice(workspaceRoot.length + 1) : modulePath;
}
