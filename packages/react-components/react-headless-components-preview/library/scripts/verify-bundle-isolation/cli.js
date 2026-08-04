// @ts-check
/**
 * Asserts that no bundle-size fixture in this package bundles a runtime the headless API is
 * meant to stay free of.
 *
 * Bundles with webpack so the verdict comes from the same bundler that produces the bundle-size
 * numbers, and so `usedExports` can name the exact symbols that survived tree shaking.
 *
 * Usage: node scripts/verify-bundle-isolation/cli.js [--config <path>] [--analyze]
 */
const { existsSync, readdirSync, readFileSync } = require('node:fs');
const { dirname, isAbsolute, join, resolve, sep } = require('node:path');
const { parseArgs } = require('node:util');

const Ajv = /** @type {typeof import('ajv').default} */ (/** @type {unknown} */ (require('ajv')));
const webpack = require('webpack');

const { BundleIsolationPlugin } = require('./bundle-isolation-plugin');

/** @typedef {{fixturesRoot: string, externals: string[], forbiddenPackages: string[], knownViolations: Record<string, string[]>}} Config */
/** @typedef {{configPath: string, analyze: boolean, config: Config, fixturesRoot: string, packageRoot: string, workspaceRoot: string}} RuntimeOptions */
/** @typedef {import('./bundle-isolation-plugin').Leak} Leak */
/** @typedef {import('./bundle-isolation-plugin').BundleIsolationReport} BundleIsolationReport */

const schemaPath = join(__dirname, 'schema.json');

main(processArgs()).catch(error => {
  console.error(error);
  process.exit(1);
});

/** @param {{configPath: string, analyze: boolean}} options */
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
  const results = await Promise.all(fixtures.map(fixture => verifyFixture(fixture, runtimeOptions)));

  const failures = collectFailures(results, runtimeOptions);

  if (options.analyze) {
    const reports = join(packageRoot, 'dist', 'bundle-isolation');
    console.log(`Analyzer reports written to ${relativeToWorkspace(reports, workspaceRoot)}`);
  }

  if (failures.length === 0) {
    console.log(
      `OK ${packageJson.name}: ${fixtures.length} bundle-size fixtures free of ${config.forbiddenPackages.join(', ')}`,
    );
    return;
  }

  console.error(`Bundle isolation check failed for ${packageJson.name}:\n`);
  failures.forEach(failure => console.error(`  ${failure}\n`));
  process.exit(1);
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
    },
    allowPositionals: false,
  });

  return { configPath: resolve(process.cwd(), values.config), analyze: values.analyze };
}

/**
 * @param {string} fixture
 * @param {RuntimeOptions} options
 */
async function verifyFixture(fixture, options) {
  /** @type {{fixture: string, found: string[], leaks: Record<string, Leak>, sourceResolved: string[], error?: string}} */
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
  const outputPath = join(options.packageRoot, 'dist', 'bundle-isolation', fixture.replace(/\.fixture\.js$/, ''));

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
      ...(options.analyze ? [createAnalyzerPlugin(outputPath)] : []),
    ],
  };
}

/** @param {string} outputPath */
function createAnalyzerPlugin(outputPath) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

  return new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: join(outputPath, 'report.html'),
    openAnalyzer: false,
    logLevel: 'silent',
  });
}

/**
 * @param {Array<ReturnType<typeof verifyFixture> extends Promise<infer T> ? T : never>} results
 * @param {RuntimeOptions} options
 */
function collectFailures(results, options) {
  const failures = [];

  for (const result of results) {
    if (result.error) {
      failures.push(`${result.fixture} could not be bundled - is the package built?\n    ${result.error}`);
      continue;
    }

    if (result.sourceResolved.length > 0) {
      failures.push(
        `${result.fixture} resolved to package sources instead of built output, so the result is meaningless.\n` +
          `    e.g. ${result.sourceResolved[0]}`,
      );
      continue;
    }

    const allowed = options.config.knownViolations[result.fixture] ?? [];
    const regressions = result.found.filter(name => !allowed.includes(name));
    const fixed = allowed.filter(name => !result.found.includes(name));

    if (regressions.length > 0) {
      const details = regressions.map(name => describeLeak(name, result.leaks[name], options)).join('\n');
      failures.push(`${result.fixture} pulls in forbidden runtime:\n${details}`);
    }

    if (fixed.length > 0) {
      failures.push(
        `${result.fixture} no longer pulls in ${fixed.join(', ')} - ` +
          `remove it from config.knownViolations in ${relativeToWorkspace(
            options.configPath,
            options.workspaceRoot,
          )} to lock the fix in.`,
      );
    }
  }

  const verified = new Set(results.map(result => result.fixture));
  for (const [fixture, packages] of Object.entries(options.config.knownViolations)) {
    if (!verified.has(fixture)) {
      failures.push(
        `config.knownViolations lists "${fixture}" (${packages.join(', ')}) which is not a bundle-size fixture.`,
      );
    }
  }

  return failures;
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
