import { readFile, writeFile, rm, readdir, access, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

import { logger } from '@nx/devkit';

import { type NormalizedOptions } from './shared';
import { type Transform } from './swc';

// rewrite only RELATIVE specifiers (./ or ../) ending in .js -> .cjs
const RELATIVE_REQUIRE = /(require\(\s*["'])(\.[^"']+?)\.js(["']\s*\))/g;
const RELATIVE_DYNAMIC_IMPORT = /(import\(\s*["'])(\.[^"']+?)\.js(["']\s*\))/g;

async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(p);
    } else {
      yield p;
    }
  }
}

/**
 * When a package ships as `"type": "module"`, the CommonJS output (`lib-commonjs`) must use the
 * `.cjs` extension - otherwise Node would parse those `.js` files as ESM and fail.
 *
 * Wired in as an SWC `Transform` (see `cjsRenameTransforms`) so each `commonjs` file is renamed
 * right after it's written, instead of a separate postprocessing pass over the whole output dir.
 * Renames `*.js` -> `*.cjs` (incl. `*.styles.raw.js`), rewrites relative `require("./x.js")` and
 * `import("./x.js")` specifiers to `.cjs`, and renames the adjacent `*.js.map` -> `*.cjs.map`.
 */
export const renameToCjs: Transform = async filePath => {
  if (filePath.endsWith('.js.map')) {
    const map = JSON.parse(await readFile(filePath, 'utf-8'));
    if (typeof map.file === 'string') {
      map.file = map.file.replace(/\.js$/, '.cjs');
    }
    await writeFile(filePath.replace(/\.js\.map$/, '.cjs.map'), JSON.stringify(map));
    await rm(filePath);
    return;
  }

  if (filePath.endsWith('.js')) {
    const code = (await readFile(filePath, 'utf-8'))
      .replace(RELATIVE_REQUIRE, '$1$2.cjs$3')
      .replace(RELATIVE_DYNAMIC_IMPORT, '$1$2.cjs$3');
    await writeFile(
      filePath.replace(/\.js$/, '.cjs'),
      code.replace(/(\/\/#\s*sourceMappingURL=.*?)\.js\.map$/m, '$1.cjs.map'),
    );
    await rm(filePath);
  }
};

/**
 * Transforms to pass into `compileSwc` for a given `moduleOutput` entry: `[renameToCjs]` for the
 * `commonjs` target of a `"type": "module"` package, `undefined` otherwise (no-op for every other
 * package/target, keeping this safe before any package opts into ESM-first packaging).
 */
export function cjsRenameTransforms(
  outputConfig: NormalizedOptions['moduleOutput'][number],
  options: NormalizedOptions,
): Transform[] | undefined {
  return outputConfig.module === 'commonjs' && options.isEsmPackage ? [renameToCjs] : undefined;
}

/**
 * `type: module` packages expose CommonJS types under a `.d.cts` so that `require`-path consumers
 * (TypeScript `node16`/`nodenext`) get a CommonJS-flavoured declaration matching the `.cjs` runtime
 * file, instead of the ESM-flavoured `.d.ts` (which `@arethetypeswrong/cli` flags as "masquerading").
 *
 * Our `dist/*.d.ts` are rolled single-file declarations (api-extractor) using only `export`/`export
 * declare` syntax, so a verbatim copy to `.d.cts` is valid in a CommonJS declaration context.
 *
 * No-op for packages that are not `"type": "module"`.
 */
export async function copyCjsTypes(options: NormalizedOptions): Promise<boolean> {
  if (!options.isEsmPackage) {
    return true;
  }

  const distDir = join(options.absoluteProjectRoot, 'dist');
  if (!(await exists(distDir))) {
    return true;
  }

  let copied = 0;
  for await (const file of walk(distDir)) {
    // copy rolled declarations only (e.g. `index.d.ts`, `unstable.d.ts`), skip `.d.cts`/maps
    if (file.endsWith('.d.ts')) {
      await copyFile(file, file.replace(/\.d\.ts$/, '.d.cts'));
      copied++;
    }
  }

  if (copied > 0) {
    logger.log(`📦 CJS types: ${copied} *.d.ts → *.d.cts in dist`);
  }

  return true;
}
