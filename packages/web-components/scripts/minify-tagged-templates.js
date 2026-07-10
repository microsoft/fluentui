// @ts-check

import { glob, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import remapping from '@jridgewell/remapping';
import { parse } from 'acorn';
import fastTaggedTemplates from 'rollup-plugin-fast-tagged-templates';

/**
 * Minifies `html` and `css` tagged template literals in the compiled ESM output, reusing the
 * exact transform the rollup bundles get from rollup.config.js. Whitespace-only text nodes in
 * templates become visible when a consumer sets a non-`normal` CSS `white-space` on an ancestor,
 * so the shipped ESM must not contain them — and running the same transform as the bundles keeps
 * both builds behaviorally identical.
 * @see https://github.com/microsoft/fluentui/issues/36298
 * @param {string} esmDir - path to the compiled ESM output directory
 * @returns {Promise<number>} the number of files rewritten
 */
export async function minifyTaggedTemplates(esmDir) {
  const plugin = fastTaggedTemplates();
  const pluginContext = { parse: code => parse(code, { ecmaVersion: 'latest', sourceType: 'module' }) };

  let count = 0;

  for await (const file of glob('**/*.js', { cwd: esmDir })) {
    const filePath = join(esmDir, file);
    const code = await readFile(filePath, 'utf-8');

    try {
      const result = await plugin.transform.call(pluginContext, code, filePath);

      if (!result || result.code === code) {
        continue;
      }

      await writeFile(filePath, result.code);
      await mergeSourceMap(filePath, result.map);
      count++;
    } catch (cause) {
      throw new Error(`minify-tagged-templates: failed to transform ${filePath}`, { cause });
    }
  }

  return count;
}

/**
 * Composes the minification sourcemap with the map tsc emitted, so the shipped map still traces
 * the transformed JS back to the TypeScript sources.
 * @param {string} filePath - path to the rewritten .js file
 * @param {import('magic-string').SourceMap} transformMap - map produced by the template transform
 */
async function mergeSourceMap(filePath, transformMap) {
  const mapPath = `${filePath}.map`;
  const tscMap = JSON.parse(await readFile(mapPath, 'utf-8'));
  const merged = remapping([JSON.parse(transformMap.toString()), tscMap], () => null);
  merged.file = tscMap.file;
  await writeFile(mapPath, merged.toString());
}
