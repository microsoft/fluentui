import * as path from 'node:path';

import { type ProjectConfiguration, type Tree, globAsync, joinPathFragments } from '@nx/devkit';

import type { PackageJson } from '../../../types';
import type { ExportMapConfig } from '../types';

export interface EntryPoint {
  /** Export map key, eg. `.`, `./color-picker` or `./items/*` */
  key: string;
  /** Path used for the dts rollup, eg. `index`, `color-picker`, `unstable`, `items/*\/index` */
  name: string;
  /** Compiled path relative to `lib`/`lib-commonjs`, mirroring the source layout, eg. `unstable/index` */
  outputPath: string;
}

const DEFAULT_CONFIG: ExportMapConfig = { root: true, subpathEntryPoints: [], subpathPatterns: [] };

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
  config: ExportMapConfig,
): Promise<EntryPoint[]> {
  const entryPoints: EntryPoint[] = config.root ? [{ key: '.', name: 'index', outputPath: 'index' }] : [];

  if (config.subpathEntryPoints.length > 0) {
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
  }

  // patterns are emitted verbatim rather than expanded, so consumers can resolve any matching subpath
  for (const pattern of [...config.subpathPatterns].sort()) {
    entryPoints.push(toPatternEntryPoint(pattern, projectRoot));
  }

  return entryPoints;
}

/**
 * `src/items/*\/index.ts` -> key `./items/*`, emitted as a wildcard entry.
 */
function toPatternEntryPoint(pattern: string, projectRoot: string): EntryPoint {
  const fail = (reason: string) => {
    throw new Error(
      `Invalid "metadata.exportMap.subpathPatterns" entry "${pattern}" in ${projectRoot}: ${reason}.\n` +
        `Expected a path like "src/items/*/index.ts".`,
    );
  };

  if (!pattern.startsWith('src/')) {
    fail('patterns must live under "src/"');
  }
  if (pattern.split('*').length !== 2) {
    fail('patterns must contain exactly one "*"');
  }
  if (!/\/index\.[jt]sx?$/.test(pattern)) {
    // generate-api expands wildcards by scanning sub-directories for `index.d.ts`
    fail('patterns must end in "/index.ts"');
  }

  const fromSrc = pattern.slice('src/'.length).replace(/\.[jt]sx?$/, '');

  return {
    key: `./${fromSrc.slice(0, fromSrc.indexOf('*') + 1)}`,
    name: fromSrc,
    outputPath: fromSrc,
  };
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
 */
export function buildExportMap(json: PackageJson, entryPoints: EntryPoint[]): PackageJson['exports'] {
  const style = json.style ? normalizeEntryPointPath(json.style) : null;
  const exports: NonNullable<PackageJson['exports']> = {};

  // Opt-in: a package becomes ESM-first by declaring `"type": "module"` in its package.json.
  if (json.type === 'module') {
    for (const { key, name, outputPath } of entryPoints) {
      // bare Node `import` resolves to valid ESM (`lib/`), `require` resolves to CommonJS
      // (`lib-commonjs/*.cjs`). Per-condition `types` point `require` at a `.d.cts` so `node16`/
      // `nodenext` CJS consumers get a CommonJS-flavoured declaration (keeps `@arethetypeswrong/cli` green).
      exports[key] = {
        ...(key === '.' && style ? { style } : null),
        import: { types: `./dist/${name}.d.ts`, default: `./lib/${outputPath}.js` },
        require: { types: `./dist/${name}.d.cts`, default: `./lib-commonjs/${outputPath}.cjs` },
      };
    }

    exports['./package.json'] = './package.json';

    return exports;
  }

  // node / CJS-first packages keep the module-condition shape (no `type: module`):
  // bundlers tree-shake via `module`, bare Node stays CommonJS via `default`.
  for (const { key, name, outputPath } of entryPoints) {
    const commonjs = `./lib-commonjs/${outputPath}.js`;
    const esm = json.module ? `./lib/${outputPath}.js` : null;

    exports[key] = {
      types: `./dist/${name}.d.ts`,
      ...(key === '.' && style ? { style } : null),
      node: esm ? { module: esm, default: commonjs } : commonjs,
      ...(esm ? { import: esm } : null),
      require: commonjs,
    };
  }

  exports['./package.json'] = './package.json';

  return exports;
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
