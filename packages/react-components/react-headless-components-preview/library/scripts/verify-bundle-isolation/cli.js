// @ts-check
/**
 * Asserts that no entry point of this package bundles a runtime the headless API is
 * meant to stay free of.
 *
 * Runs against the built `lib/` output (never `src/`) because tree shaking depends on
 * `/*#__PURE__*\/` annotations that swc only adds at build time.
 *
 * Usage: node scripts/verify-bundle-isolation/cli.js
 */
const { existsSync, readFileSync } = require('node:fs');
const { dirname, isAbsolute, join, resolve, sep } = require('node:path');

const esbuild = require('esbuild');

/** Packages that must never survive tree shaking. `@scope/*` matches the whole scope. */
const FORBIDDEN = ['tabster', '@griffel/*', '@fluentui/react-icons'];

/**
 * Entry point -> forbidden packages that are tolerated for now.
 *
 * This baseline may only shrink. Removing a leak without deleting its entry here
 * fails the check, so a fix cannot silently regress later.
 *
 * @type {Record<string, string[]>}
 */
const KNOWN_VIOLATIONS = {
  // https://github.com/microsoft/fluentui/pull/36503
  './tag-picker': ['@fluentui/react-icons', '@griffel/core', '@griffel/react'],
  // https://github.com/microsoft/fluentui/pull/36504
  './teaching-popover': ['@fluentui/react-icons', '@griffel/core', '@griffel/react'],
};

/** Host-provided modules - including them would drown the signal. */
const EXTERNALS = ['react', 'react-dom', 'react/jsx-runtime', 'react/compiler-runtime'];

const ENTRY_SOURCEFILE = 'bundle-isolation-entry.js';

const packageRoot = resolve(__dirname, '../..');
const workspaceRoot = findWorkspaceRoot(packageRoot);

main().catch(error => {
  console.error(error);
  process.exit(1);
});

async function main() {
  const packageJson = readJson(join(packageRoot, 'package.json'));
  const entryPoints = Object.keys(packageJson.exports ?? {}).filter(
    subpath => subpath.startsWith('.') && !subpath.endsWith('package.json') && !subpath.includes('*'),
  );

  if (entryPoints.length === 0) {
    console.error(`No entry points found in ${packageJson.name} "exports" - nothing to verify.`);
    process.exit(1);
  }

  const results = await Promise.all(entryPoints.sort().map(subpath => verifyEntryPoint(subpath, packageJson.name)));

  const failures = collectFailures(results);

  if (failures.length === 0) {
    console.log(`OK ${packageJson.name}: ${entryPoints.length} entry points free of ${FORBIDDEN.join(', ')}`);
    return;
  }

  console.error(`Bundle isolation check failed for ${packageJson.name}:\n`);
  failures.forEach(failure => console.error(`  ${failure}\n`));
  process.exit(1);
}

/**
 * @param {string} subpath
 * @param {string} packageName
 */
async function verifyEntryPoint(subpath, packageName) {
  const specifier = packageName + subpath.slice(1);
  /** @type {{subpath: string, found: string[], rootCauses: string[], chains: Record<string, string[]>, sourceResolved: string[], error?: string}} */
  const result = { subpath, found: [], rootCauses: [], chains: {}, sourceResolved: [] };

  let metafile;
  try {
    ({ metafile } = await esbuild.build({
      stdin: {
        contents: `export * from '${specifier}';\n`,
        resolveDir: workspaceRoot,
        sourcefile: ENTRY_SOURCEFILE,
        loader: 'js',
      },
      bundle: true,
      write: false,
      metafile: true,
      format: 'esm',
      platform: 'browser',
      external: EXTERNALS,
      absWorkingDir: workspaceRoot,
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
  const entry = output.entryPoint ?? ENTRY_SOURCEFILE;
  const ownerOf = createForbiddenOwnerResolver();

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
  const previous = new Map([[entry, null]]);
  const queue = [entry];
  /** @type {Record<string, string[]>} */
  const chains = {};

  while (queue.length > 0) {
    const current = /** @type {string} */ (queue.shift());
    const owner = current === entry ? null : ownerOf(current);

    if (owner && !(owner in chains)) {
      const chain = [];
      for (let node = current; node; node = previous.get(node) ?? null) {
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
function createForbiddenOwnerResolver() {
  const exact = new Set(FORBIDDEN.filter(pattern => !pattern.endsWith('/*')));
  const scopes = FORBIDDEN.filter(pattern => pattern.endsWith('/*')).map(pattern => pattern.slice(0, -1));
  /** @type {Map<string, string | null>} */
  const cache = new Map();

  return function ownerOf(modulePath) {
    let dir = dirname(isAbsolute(modulePath) ? modulePath : join(workspaceRoot, modulePath));
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

/** @param {Array<ReturnType<typeof verifyEntryPoint> extends Promise<infer T> ? T : never>} results */
function collectFailures(results) {
  const failures = [];

  for (const result of results) {
    if (result.error) {
      failures.push(`${result.subpath} could not be bundled - is the package built?\n    ${result.error}`);
      continue;
    }

    if (result.sourceResolved.length > 0) {
      failures.push(
        `${result.subpath} resolved to package sources instead of built output, so the result is meaningless.\n` +
          `    e.g. ${result.sourceResolved[0]}`,
      );
      continue;
    }

    const allowed = KNOWN_VIOLATIONS[result.subpath] ?? [];
    const regressions = result.found.filter(name => !allowed.includes(name));
    const fixed = allowed.filter(name => !result.found.includes(name));

    if (regressions.length > 0) {
      const causes = regressions.filter(name => result.rootCauses.includes(name));
      const symptoms = regressions.filter(name => !causes.includes(name));
      const details = (causes.length > 0 ? causes : regressions)
        .map(name => {
          const chain = result.chains[name].map(
            (step, index) => `${'  '.repeat(index + 3)}|- ${relativeToWorkspace(step)}`,
          );
          return `    ${name}\n${chain.join('\n')}`;
        })
        .join('\n');
      const trailer = symptoms.length > 0 ? `\n    ...which also pulls in ${symptoms.join(', ')}` : '';
      failures.push(`${result.subpath} pulls in forbidden runtime:\n${details}${trailer}`);
    }

    if (fixed.length > 0) {
      failures.push(
        `${result.subpath} no longer pulls in ${fixed.join(', ')} - ` +
          `remove it from KNOWN_VIOLATIONS in ${__filename.replace(workspaceRoot + sep, '')} to lock the fix in.`,
      );
    }
  }

  const verified = new Set(results.map(result => result.subpath));
  for (const [subpath, packages] of Object.entries(KNOWN_VIOLATIONS)) {
    if (!verified.has(subpath)) {
      failures.push(`KNOWN_VIOLATIONS lists "${subpath}" (${packages.join(', ')}) which is not an entry point.`);
    }
  }

  return failures;
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

/** @param {string} modulePath */
function relativeToWorkspace(modulePath) {
  const absolute = isAbsolute(modulePath) ? modulePath : resolve(workspaceRoot, modulePath);
  return absolute.startsWith(workspaceRoot + sep) ? absolute.slice(workspaceRoot.length + 1) : modulePath;
}
