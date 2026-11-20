import * as path from 'node:path';

import { type ProjectConfiguration, type Tree, globAsync, joinPathFragments } from '@nx/devkit';

import type { PackageJson } from '../../../types';
import type { ExportMapConfig } from '../types';

export interface EntryPoint {
  /** Export map key, eg. `.` or `./color-picker` */
  key: string;
  /** Flattened basename used for the dts rollup, eg. `index`, `color-picker`, `unstable` */
  name: string;
  /** Compiled path relative to `lib`/`lib-commonjs`, mirroring the source layout, eg. `unstable/index` */
  outputPath: string;
}

const DEFAULT_CONFIG: ExportMapConfig = { root: true, subpathEntryPoints: [], staticSubpaths: [] };

const ROOT_KEY = '.';
const PACKAGE_JSON_KEY = './package.json';

export function readExportMapConfig(projectConfig: ProjectConfiguration): ExportMapConfig {
  const metadata = projectConfig.metadata as { exportMap?: Partial<ExportMapConfig> } | undefined;

  return { ...DEFAULT_CONFIG, ...metadata?.exportMap };
}

/**
 * Resolves declared entry point globs into deterministic, sorted export map entries.
 */
export async function resolveEntryPoints(
  tree: Tree,
  projectRoot: string,
  config: Pick<ExportMapConfig, 'root' | 'subpathEntryPoints'>,
): Promise<EntryPoint[]> {
  const entryPoints: EntryPoint[] = config.root ? [{ key: ROOT_KEY, name: 'index', outputPath: 'index' }] : [];

  if (config.subpathEntryPoints.length === 0) {
    return entryPoints;
  }

  const matches = await globAsync(
    tree,
    config.subpathEntryPoints.map(glob => joinPathFragments(projectRoot, glob)),
  );

  const byName = new Map<string, string>();
  for (const match of matches) {
    const outputPath = toOutputPath(path.posix.relative(joinPathFragments(projectRoot, 'src'), match));

    if (outputPath === null || outputPath === 'index') {
      continue;
    }

    // `unstable/index` -> `unstable`
    byName.set(outputPath.replace(/\/index$/, ''), outputPath);
  }

  for (const name of [...byName.keys()].sort()) {
    entryPoints.push({ key: `./${name}`, name, outputPath: byName.get(name)! });
  }

  return entryPoints;
}

/**
 * @returns `null` for files that can never be an entry point
 */
function toOutputPath(sourcePathFromSrc: string): string | null {
  if (/\.(d\.ts|spec\.[jt]sx?|test\.[jt]sx?|stories\.[jt]sx?)$/.test(sourcePathFromSrc)) {
    return null;
  }

  return sourcePathFromSrc.replace(/\.[jt]sx?$/, '');
}

/**
 * Builds the canonical export map for a package.
 *
 * ESM-first packages (opt-in via `"type": "module"`) get the conditional import/require shape with no
 * `node` condition; every other package keeps the CommonJS-first shape.
 *
 * `staticSubpaths` names the keys the generator does not own - their entries are read back verbatim
 * from `json.exports` instead of being derived from a source file.
 */
export function buildExportMap(
  json: PackageJson,
  entryPoints: EntryPoint[],
  staticSubpaths: string[] = [],
): PackageJson['exports'] {
  const style = json.style ? normalizeEntryPointPath(json.style) : null;
  const generated: NonNullable<PackageJson['exports']> = {};

  // Opt-in: a package becomes ESM-first by declaring `"type": "module"` in its package.json.
  if (json.type === 'module') {
    for (const { key, name, outputPath } of entryPoints) {
      // bare Node `import` resolves to valid ESM (`lib/`), `require` resolves to CommonJS
      // (`lib-commonjs/*.cjs`). Per-condition `types` point `require` at a `.d.cts` so `node16`/
      // `nodenext` CJS consumers get a CommonJS-flavoured declaration (keeps `@arethetypeswrong/cli` green).
      generated[key] = {
        ...(key === ROOT_KEY && style ? { style } : null),
        import: { types: `./dist/${name}.d.ts`, default: `./lib/${outputPath}.js` },
        require: { types: `./dist/${name}.d.cts`, default: `./lib-commonjs/${outputPath}.cjs` },
      };
    }
  } else {
    // node / CJS-first packages keep the module-condition shape (no `type: module`):
    // bundlers tree-shake via `module`, bare Node stays CommonJS via `default`.
    for (const { key, name, outputPath } of entryPoints) {
      const commonjs = `./lib-commonjs/${outputPath}.js`;
      const esm = json.module ? `./lib/${outputPath}.js` : null;

      generated[key] = {
        types: `./dist/${name}.d.ts`,
        ...(key === ROOT_KEY && style ? { style } : null),
        node: esm ? { module: esm, default: commonjs } : commonjs,
        ...(esm ? { import: esm } : null),
        require: commonjs,
      };
    }
  }

  return orderExportMap({ ...generated, ...readStaticEntries(json, staticSubpaths, generated) });
}

/**
 * Reads the declared static subpath entries back out of the package's current export map.
 *
 * Their values are authored in `package.json`, next to the `files` array that ships them, so the
 * declaration in `project.json` stays a list of keys rather than a second copy of the paths.
 */
function readStaticEntries(
  json: PackageJson,
  staticSubpaths: string[],
  generated: NonNullable<PackageJson['exports']>,
): NonNullable<PackageJson['exports']> {
  const entries: NonNullable<PackageJson['exports']> = {};

  for (const key of staticSubpaths) {
    if (key === PACKAGE_JSON_KEY || key in generated) {
      throw new Error(
        `${json.name}: metadata.exportMap.staticSubpaths declares "${key}", which the generator already derives from source. Drop it from the declaration.`,
      );
    }

    const entry = json.exports?.[key];

    if (entry === undefined) {
      throw new Error(
        `${json.name}: metadata.exportMap.staticSubpaths declares "${key}", but package.json has no exports["${key}"] entry to preserve. Author the entry in package.json first.`,
      );
    }

    entries[key] = entry;
  }

  return entries;
}

/**
 * Canonical key order: the root entry first, `./package.json` last, every other subpath in between
 * sorted alphabetically - so an added subpath lands in one predictable place no matter which
 * mechanism produced it.
 */
function orderExportMap(entries: NonNullable<PackageJson['exports']>): NonNullable<PackageJson['exports']> {
  const ordered: NonNullable<PackageJson['exports']> = {};

  if (ROOT_KEY in entries) {
    ordered[ROOT_KEY] = entries[ROOT_KEY];
  }

  for (const key of Object.keys(entries)
    .filter(key => key !== ROOT_KEY)
    .sort()) {
    ordered[key] = entries[key];
  }

  ordered[PACKAGE_JSON_KEY] = PACKAGE_JSON_KEY;

  return ordered;
}

/**
 * Package entry point fields that must stay in lockstep with the export map.
 */
export function buildEntryPointFields(json: PackageJson): Pick<PackageJson, 'main' | 'module' | 'typings'> {
  if (json.type === 'module') {
    return { main: 'lib-commonjs/index.cjs', module: 'lib/index.js', typings: './dist/index.d.ts' };
  }

  return {
    main: 'lib-commonjs/index.js',
    ...(json.module ? { module: 'lib/index.js' } : null),
    typings: './dist/index.d.ts',
  };
}

export function normalizeEntryPointPath(entryPath: string) {
  return './' + path.posix.normalize(entryPath);
}
