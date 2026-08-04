// @ts-check
/**
 * Asserts that no bundle-size fixture in this package bundles a runtime the headless API is
 * meant to stay free of.
 *
 * Runs against the built `lib/` output (never `src/`) because tree shaking depends on
 * `/*#__PURE__*\/` annotations that swc only adds at build time.
 *
 * Usage: node scripts/verify-bundle-isolation/cli.js
 */
const { existsSync, readdirSync, readFileSync } = require('node:fs');
const { dirname, isAbsolute, join, resolve, sep } = require('node:path');
const { parseArgs } = require('node:util');

const Ajv = /** @type {typeof import('ajv').default} */ (/** @type {unknown} */ (require('ajv')));
const esbuild = require('esbuild');

/** @typedef {{fixturesRoot: string, externals: string[], forbiddenPackages: string[], knownViolations: Record<string, string[]>}} Config */
/** @typedef {{configPath: string, config: Config, fixturesRoot: string, packageRoot: string, workspaceRoot: string}} RuntimeOptions */

const schemaPath = join(__dirname, 'schema.json');

main(processArgs()).catch(error => {
  console.error(error);
  process.exit(1);
});

/** @param {{configPath: string}} options */
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
    },
    allowPositionals: false,
  });

  return { configPath: resolve(process.cwd(), values.config) };
}

/**
 * @param {string} fixture
 * @param {RuntimeOptions} options
 */
async function verifyFixture(fixture, options) {
  /** @type {{fixture: string, found: string[], rootCauses: string[], chains: Record<string, string[]>, sourceResolved: string[], error?: string}} */
  const result = { fixture, found: [], rootCauses: [], chains: {}, sourceResolved: [] };

  let metafile;
  try {
    ({ metafile } = await esbuild.build({
      entryPoints: [join(options.fixturesRoot, fixture)],
      bundle: true,
      write: false,
      metafile: true,
      format: 'esm',
      platform: 'browser',
      external: options.config.externals,
      absWorkingDir: options.workspaceRoot,
      logLevel: 'silent',
      // `tsconfig.base.json` maps every `@fluentui/*` specifier to `library/src/index.ts`, and esbuild
      // honours those paths - which would verify sources instead of the published output. An inline
      // empty config disables tsconfig discovery so resolution goes through `exports` only.
      tsconfigRaw: {},
      conditions: ['import'],
    }));
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
    return result;
  }

  const output = Object.values(metafile.outputs)[0];
  const kept = new Set(Object.keys(output.inputs));
  const entry = output.entryPoint;
  const ownerOf = createForbiddenOwnerResolver(options);

  if (!entry) {
    result.error = 'esbuild did not report an entry point for the fixture output';
    return result;
  }

  result.sourceResolved = [...kept].filter(modulePath => /[/\\]library[/\\]src[/\\]/.test(modulePath));

  // The output's module list is authoritative for *what* leaked.
  result.found = [...new Set([...kept].map(ownerOf).filter(Boolean))].sort();

  // Chains are best effort: prefer a path made only of retained modules, but esbuild records
  // import edges from the pre-shaking graph, so a retained module's only recorded importer may
  // itself have been eliminated. Fall back to the full graph so every leak still gets a chain.
  const keptChains = traceForbiddenPackages(metafile, entry, ownerOf, modulePath => kept.has(modulePath));
  const allChains = result.found.every(name => name in keptChains)
    ? keptChains
    : traceForbiddenPackages(metafile, entry, ownerOf, () => true);
  result.chains = Object.fromEntries(result.found.map(name => [name, keptChains[name] ?? allChains[name] ?? []]));

  // A package reached *through* another forbidden package is a symptom, not a cause.
  result.rootCauses = result.found.filter(name =>
    result.chains[name].slice(0, -1).every(step => {
      const owner = ownerOf(step);
      return owner === null || owner === name;
    }),
  );

  return result;
}

/**
 * Breadth-first walk of the module graph, recording the shortest import chain from the
 * entry to the first module of every forbidden package it reaches.
 *
 * One traversal (rather than a search per package) guarantees each reported chain is
 * genuinely reachable and is the shortest one.
 *
 * @param {import('esbuild').Metafile} metafile
 * @param {string} entry
 * @param {(modulePath: string) => string | null} ownerOf
 * @param {(modulePath: string) => boolean} allowEdge
 * @returns {Record<string, string[]>}
 */
function traceForbiddenPackages(metafile, entry, ownerOf, allowEdge) {
  /** @type {Map<string, string | null>} */
  const previous = new Map([[entry, null]]);
  const queue = [entry];
  /** @type {Record<string, string[]>} */
  const chains = {};

  while (queue.length > 0) {
    const current = /** @type {string} */ (queue.shift());
    const owner = current === entry ? null : ownerOf(current);

    if (owner && !(owner in chains)) {
      const chain = [];
      for (let node = /** @type {string | null} */ (current); node; node = previous.get(node) ?? null) {
        chain.unshift(node);
      }
      chains[owner] = chain.slice(1); // drop the synthetic entry module
    }

    for (const imported of metafile.inputs[current]?.imports ?? []) {
      if (!allowEdge(imported.path) || previous.has(imported.path)) {
        continue;
      }
      previous.set(imported.path, current);
      queue.push(imported.path);
    }
  }

  return chains;
}

/**
 * Maps a module path to the forbidden package owning it, or `null`.
 *
 * Ownership is resolved by walking up to the nearest `package.json`, which handles both
 * `node_modules` dependencies and workspace packages (esbuild resolves symlinked workspace
 * packages to their real path, so there is no `node_modules` segment to match on).
 */
/** @param {RuntimeOptions} options */
function createForbiddenOwnerResolver(options) {
  const exact = new Set(options.config.forbiddenPackages.filter(pattern => !pattern.endsWith('/*')));
  const scopes = options.config.forbiddenPackages
    .filter(pattern => pattern.endsWith('/*'))
    .map(pattern => pattern.slice(0, -1));
  /** @type {Map<string, string | null>} */
  const cache = new Map();

  /** @param {string} modulePath */
  return function ownerOf(modulePath) {
    let dir = dirname(isAbsolute(modulePath) ? modulePath : join(options.workspaceRoot, modulePath));
    const visited = [];

    while (dir && dir !== dirname(dir)) {
      if (cache.has(dir)) {
        const cached = cache.get(dir) ?? null;
        visited.forEach(seen => cache.set(seen, cached));
        return cached;
      }
      visited.push(dir);

      const manifest = join(dir, 'package.json');
      if (existsSync(manifest)) {
        const name = readJson(manifest).name;
        // Nested manifests without a name (e.g. `{ "type": "module" }` markers) are not package roots.
        if (name) {
          const owner = exact.has(name) || scopes.some(scope => name.startsWith(scope)) ? name : null;
          visited.forEach(seen => cache.set(seen, owner));
          return owner;
        }
      }

      dir = dirname(dir);
    }

    visited.forEach(seen => cache.set(seen, null));
    return null;
  };
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
      const causes = regressions.filter(name => result.rootCauses.includes(name));
      const symptoms = regressions.filter(name => !causes.includes(name));
      const details = (causes.length > 0 ? causes : regressions)
        .map(name => {
          const chain = result.chains[name].map(
            (step, index) => `${'  '.repeat(index + 3)}|- ${relativeToWorkspace(step, options.workspaceRoot)}`,
          );
          return `    ${name}\n${chain.join('\n')}`;
        })
        .join('\n');
      const trailer = symptoms.length > 0 ? `\n    ...which also pulls in ${symptoms.join(', ')}` : '';
      failures.push(`${result.fixture} pulls in forbidden runtime:\n${details}${trailer}`);
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
