import { readFile, writeFile, rm, readdir, access, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

import { readJsonFile, logger } from '@nx/devkit';

import { type NormalizedOptions } from './shared';

// rewrite only RELATIVE specifiers (./ or ../) ending in .js -> .cjs
const RELATIVE_REQUIRE = /(require\(\s*["'])(\.[^"']+?)\.js(["']\s*\))/g;
const RELATIVE_SOURCEMAP = /(\/\/#\s*sourceMappingURL=)(\.?[^\s]+?)\.js\.map/g;

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
 * This renames every `lib-commonjs/**\/*.js` -> `*.cjs` (incl. `*.styles.raw.js`), rewrites relative
 * `require("./x.js")` -> `require("./x.cjs")`, and renames the adjacent `*.js.map` -> `*.cjs.map`.
 *
 * No-op for packages that are not `"type": "module"`.
 */
export async function postprocessCjsExtension(options: NormalizedOptions): Promise<boolean> {
  const pkgJson = readJsonFile<{ type?: string }>(join(options.absoluteProjectRoot, 'package.json'));
  if (pkgJson.type !== 'module') {
    return true;
  }

  const commonjsOutput = options.moduleOutput.find(output => output.module === 'commonjs');
  if (!commonjsOutput) {
    return true;
  }

  const cjsDir = join(options.absoluteProjectRoot, commonjsOutput.outputPath);
  if (!(await exists(cjsDir))) {
    return true;
  }

  let renamedFiles = 0;
  let renamedMaps = 0;

  for await (const file of walk(cjsDir)) {
    if (file.endsWith('.js')) {
      const code = (await readFile(file, 'utf-8'))
        .replace(RELATIVE_REQUIRE, '$1$2.cjs$3')
        .replace(RELATIVE_SOURCEMAP, '$1$2.cjs.map');
      await writeFile(file.replace(/\.js$/, '.cjs'), code);
      await rm(file);
      renamedFiles++;
    }
  }

  for await (const file of walk(cjsDir)) {
    if (file.endsWith('.js.map')) {
      const map = JSON.parse(await readFile(file, 'utf-8'));
      if (typeof map.file === 'string') {
        map.file = map.file.replace(/\.js$/, '.cjs');
      }
      await writeFile(file.replace(/\.js\.map$/, '.cjs.map'), JSON.stringify(map));
      await rm(file);
      renamedMaps++;
    }
  }

  logger.log(
    `📦 CJS extension: ${renamedFiles} *.js → *.cjs (${renamedMaps} source maps) in ${commonjsOutput.outputPath}`,
  );

  return true;
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
  const pkgJson = readJsonFile<{ type?: string }>(join(options.absoluteProjectRoot, 'package.json'));
  if (pkgJson.type !== 'module') {
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
