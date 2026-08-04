// @ts-check
/**
 * Reports which forbidden packages survived tree shaking, the exports keeping them alive and the
 * modules importing those exports.
 *
 * Written as a plugin so the analysis can run inside any webpack build - a purpose-built bundle
 * like the one the CLI creates, or an existing one such as the monosize bundle-size build.
 *
 * Requires `optimization.concatenateModules: false`; scope hoisting merges modules into a
 * `ConcatenatedModule` with no per-module `resource`, which hides the packages being looked for.
 */
const { existsSync, readFileSync } = require('node:fs');
const { dirname, isAbsolute, join } = require('node:path');

/** @typedef {{modules: number, exports: Array<{name: string, importers: string[]}>}} Leak */
/** @typedef {{leaks: Record<string, Leak>, sourceResolved: string[]}} BundleIsolationReport */
/** @typedef {{forbiddenPackages: string[], workspaceRoot: string}} AnalysisOptions */

/** `ExportInfo.getUsed()` returns this when nothing references the export. */
const UNUSED = 0;

const PLUGIN_NAME = 'BundleIsolationPlugin';

class BundleIsolationPlugin {
  /** @param {AnalysisOptions & {onReport: (report: BundleIsolationReport) => void}} options */
  constructor(options) {
    this.options = options;
  }

  /** @param {import('webpack').Compiler} compiler */
  apply(compiler) {
    compiler.hooks.afterEmit.tap(PLUGIN_NAME, compilation => {
      this.options.onReport(collectLeaks(compilation, this.options));
    });
  }
}

/**
 * webpack records import edges for modules whose imports were later eliminated, so edges alone
 * over-report. A package counts as leaked only when its modules are in a chunk, an export is
 * reported as used, and the importing module survived as well.
 *
 * @param {import('webpack').Compilation} compilation
 * @param {AnalysisOptions} options
 * @returns {BundleIsolationReport}
 */
function collectLeaks(compilation, options) {
  const { chunkGraph, moduleGraph } = compilation;
  const ownerOf = createForbiddenOwnerResolver(options);
  /** @type {Record<string, {modules: number, exports: Map<string, {name: string, importers: Set<string>}>}>} */
  const collected = {};
  /** @type {string[]} */
  const sourceResolved = [];

  for (const module of compilation.modules) {
    const resource = resourceOf(module);
    if (!resource || chunkGraph.getNumberOfModuleChunks(module) === 0) {
      continue;
    }

    if (/[/\\]library[/\\]src[/\\]/.test(resource)) {
      sourceResolved.push(resource);
    }

    const owner = ownerOf(resource);
    if (!owner) {
      continue;
    }

    const leak = (collected[owner] ??= { modules: 0, exports: new Map() });
    leak.modules++;

    const [runtime] = chunkGraph.getModuleRuntimes(module);

    for (const name of usedExportNames(moduleGraph, runtime, module)) {
      const importers = externalImporters(moduleGraph, chunkGraph, runtime, module, name, ownerOf);
      // Exports only referenced inside the forbidden package are plumbing, not entry points.
      if (importers.length === 0) {
        continue;
      }
      // Keyed per module so two modules exporting the same name are not merged.
      const key = `${name}\u0000${resource}`;
      const known = leak.exports.get(key) ?? { name, importers: new Set() };
      importers.forEach(importer => known.importers.add(importer));
      leak.exports.set(key, known);
    }
  }

  /** @type {Record<string, Leak>} */
  const leaks = {};
  for (const [name, leak] of Object.entries(collected)) {
    leaks[name] = {
      modules: leak.modules,
      exports: [...leak.exports.values()]
        .map(({ name: exportName, importers }) => ({ name: exportName, importers: [...importers].sort() }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    };
  }

  return { leaks, sourceResolved };
}

/**
 * @param {import('webpack').ModuleGraph} moduleGraph
 * @param {import('webpack').RuntimeSpec} runtime
 * @param {import('webpack').Module} module
 * @returns {string[]}
 */
function usedExportNames(moduleGraph, runtime, module) {
  const names = [];

  for (const exportInfo of moduleGraph.getExportsInfo(module).orderedExports) {
    if (exportInfo.getUsed(runtime) !== UNUSED) {
      names.push(exportInfo.name);
    }
  }

  return names;
}

/**
 * @param {import('webpack').ModuleGraph} moduleGraph
 * @param {import('webpack').ChunkGraph} chunkGraph
 * @param {import('webpack').RuntimeSpec} runtime
 * @param {import('webpack').Module} module
 * @param {string} exportName
 * @param {(modulePath: string) => string | null} ownerOf
 * @returns {string[]}
 */
function externalImporters(moduleGraph, chunkGraph, runtime, module, exportName, ownerOf) {
  /** @type {Set<string>} */
  const importers = new Set();

  for (const connection of moduleGraph.getIncomingConnections(module)) {
    // An eliminated importer keeps an active connection, so its own retention decides.
    if (!connection.originModule || chunkGraph.getNumberOfModuleChunks(connection.originModule) === 0) {
      continue;
    }
    const origin = resourceOf(connection.originModule);
    if (!origin || ownerOf(origin) || connection.getActiveState(runtime) === false) {
      continue;
    }
    if (importedIds(connection.dependency, moduleGraph)[0] === exportName) {
      importers.add(origin);
    }
  }

  return [...importers];
}

/**
 * @param {unknown} dependency
 * @param {import('webpack').ModuleGraph} moduleGraph
 * @returns {string[]}
 */
function importedIds(dependency, moduleGraph) {
  const candidate = /** @type {{getIds?: (graph: import('webpack').ModuleGraph) => string[], ids?: string[]}} */ (
    dependency
  );

  if (typeof candidate?.getIds === 'function') {
    return candidate.getIds(moduleGraph) ?? [];
  }

  return candidate?.ids ?? [];
}

/**
 * @param {import('webpack').Module} module
 * @returns {string | null}
 */
function resourceOf(module) {
  const candidate = /** @type {{resource?: string}} */ (/** @type {unknown} */ (module));
  return candidate.resource ?? module.nameForCondition() ?? null;
}

/**
 * Maps a module path to the forbidden package owning it, or `null`.
 *
 * Ownership is resolved by walking up to the nearest `package.json`, which handles both
 * `node_modules` dependencies and workspace packages (webpack resolves symlinked workspace
 * packages to their real path, so there is no `node_modules` segment to match on).
 *
 * @param {AnalysisOptions} options
 */
function createForbiddenOwnerResolver(options) {
  const exact = new Set(options.forbiddenPackages.filter(pattern => !pattern.endsWith('/*')));
  const scopes = options.forbiddenPackages
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
        const { name } = JSON.parse(readFileSync(manifest, 'utf-8'));
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

module.exports = { BundleIsolationPlugin };
