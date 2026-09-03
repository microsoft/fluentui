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
import { existsSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, sep } from 'node:path';

import type { ChunkGraph, Compilation, Compiler, Module, ModuleGraph } from 'webpack';

// webpack declares RuntimeSpec internally but does not export it, so recover it from a signature.
type RuntimeSpec = Parameters<ReturnType<ChunkGraph['getModuleRuntimes']>['add']>[0];

export interface Importer {
  module: string;
  via: string | null;
}

export interface Leak {
  modules: number;
  exports: Array<{ name: string; importers: Importer[] }>;
}

export interface BundleIsolationReport {
  leaks: Record<string, Leak>;
  sourceResolved: string[];
}

export interface AnalysisOptions {
  forbiddenPackages: string[];
  workspaceRoot: string;
  packageRoot?: string;
}

type ForbiddenOwnerResolver = (modulePath: string) => string | null;

/** `ExportInfo.getUsed()` returns this when nothing references the export. */
const UNUSED = 0;

const PLUGIN_NAME = 'BundleIsolationPlugin';

export class BundleIsolationPlugin {
  constructor(private options: AnalysisOptions & { onReport: (report: BundleIsolationReport) => void }) {}

  public apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tap(PLUGIN_NAME, compilation => {
      this.options.onReport(collectLeaks(compilation, this.options));
    });
  }
}

/**
 * webpack records import edges for modules whose imports were later eliminated, so edges alone
 * over-report. A package counts as leaked only when its modules are in a chunk, an export is
 * reported as used, and the importing module survived as well.
 */
export function collectLeaks(compilation: Compilation, options: AnalysisOptions): BundleIsolationReport {
  const { chunkGraph, moduleGraph } = compilation;
  const ownerOf = createForbiddenOwnerResolver(options);
  const collected: Record<
    string,
    { modules: number; exports: Map<string, { name: string; importers: Map<string, Importer> }> }
  > = {};
  const sourceResolved: string[] = [];

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
      const known = leak.exports.get(key) ?? { name, importers: new Map<string, Importer>() };

      for (const importer of importers) {
        const importerResource = resourceOf(importer) as string;
        known.importers.set(importerResource, {
          module: importerResource,
          via: packageOriginOf(moduleGraph, chunkGraph, importer, options.packageRoot),
        });
      }

      leak.exports.set(key, known);
    }
  }

  const leaks: Record<string, Leak> = {};
  for (const [name, leak] of Object.entries(collected)) {
    leaks[name] = {
      modules: leak.modules,
      exports: [...leak.exports.values()]
        .map(({ name: exportName, importers }) => ({
          name: exportName,
          importers: [...importers.values()].sort((left, right) => left.module.localeCompare(right.module)),
        }))
        .sort((left, right) => left.name.localeCompare(right.name)),
    };
  }

  return { leaks, sourceResolved };
}

function usedExportNames(moduleGraph: ModuleGraph, runtime: RuntimeSpec, module: Module): string[] {
  const names = [];

  for (const exportInfo of moduleGraph.getExportsInfo(module).orderedExports) {
    if (exportInfo.getUsed(runtime) !== UNUSED) {
      names.push(exportInfo.name);
    }
  }

  return names;
}

function externalImporters(
  moduleGraph: ModuleGraph,
  chunkGraph: ChunkGraph,
  runtime: RuntimeSpec,
  module: Module,
  exportName: string,
  ownerOf: ForbiddenOwnerResolver,
): Module[] {
  const importers = new Map<string, Module>();

  for (const connection of moduleGraph.getIncomingConnections(module)) {
    // An eliminated importer keeps an active connection, so its own retention decides.
    if (!connection.originModule || chunkGraph.getNumberOfModuleChunks(connection.originModule) === 0) {
      continue;
    }

    const origin = resourceOf(connection.originModule);
    if (!origin || ownerOf(origin) || connection.getActiveState(runtime) === false) {
      continue;
    }

    // Only the first id names the import. webpack emits one dependency per specifier, so
    // `import { a, b }` is already two connections, while `a.b` is a single one with ids
    // ["a", "b"] - matching any id would blame that module for importing `b`.
    if (importedIds(connection.dependency, moduleGraph)[0] === exportName) {
      importers.set(origin, connection.originModule);
    }
  }

  return [...importers.values()];
}

/**
 * Walks back over retained modules to the first one owned by the package under test, so a leak
 * reached through a dependency points at the code that pulled that dependency in.
 */
function packageOriginOf(
  moduleGraph: ModuleGraph,
  chunkGraph: ChunkGraph,
  module: Module,
  packageRoot: string | undefined,
): string | null {
  if (!packageRoot) {
    return null;
  }

  const owned = (candidate: Module) => {
    const resource = resourceOf(candidate);
    return Boolean(resource && resource.startsWith(packageRoot + sep));
  };

  if (owned(module)) {
    return null;
  }

  const visited = new Set([module]);
  const queue = [module];

  while (queue.length > 0) {
    const current = queue.shift() as Module;

    for (const connection of moduleGraph.getIncomingConnections(current)) {
      const origin = connection.originModule;
      if (!origin || visited.has(origin) || chunkGraph.getNumberOfModuleChunks(origin) === 0) {
        continue;
      }

      visited.add(origin);
      if (owned(origin)) {
        return relative(packageRoot, resourceOf(origin) as string);
      }

      queue.push(origin);
    }
  }

  return null;
}

function importedIds(dependency: unknown, moduleGraph: ModuleGraph): string[] {
  const candidate = dependency as { getIds?: (graph: ModuleGraph) => string[]; ids?: string[] };

  if (typeof candidate?.getIds === 'function') {
    return candidate.getIds(moduleGraph) ?? [];
  }

  return candidate?.ids ?? [];
}

function resourceOf(module: Module): string | null {
  return (module as unknown as { resource?: string }).resource ?? module.nameForCondition() ?? null;
}

/**
 * Maps a module path to the forbidden package owning it, or `null`.
 *
 * Ownership is resolved by walking up to the nearest `package.json`, which handles both
 * `node_modules` dependencies and workspace packages (webpack resolves symlinked workspace
 * packages to their real path, so there is no `node_modules` segment to match on).
 */
function createForbiddenOwnerResolver(options: AnalysisOptions): ForbiddenOwnerResolver {
  const exact = new Set(options.forbiddenPackages.filter(pattern => !pattern.endsWith('/*')));
  const scopes = options.forbiddenPackages
    .filter(pattern => pattern.endsWith('/*'))
    .map(pattern => pattern.slice(0, -1));
  const cache = new Map<string, string | null>();

  return function ownerOf(modulePath: string) {
    let dir = dirname(isAbsolute(modulePath) ? modulePath : join(options.workspaceRoot, modulePath));
    const visited: string[] = [];

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
