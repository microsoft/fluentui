import { mkdtemp, mkdir, writeFile, readFile, readdir, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { logger } from '@nx/devkit';

import { type NormalizedOptions } from './shared';
import { postprocessCjsExtension, copyCjsTypes } from './cjs-extension';

async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * The `cjs-extension` postprocessors only act on `"type": "module"` packages. For every other
 * package they are a no-op, which keeps them safe to wire into the build executor before any
 * package opts into ESM-first packaging.
 */
describe('cjs-extension', () => {
  let projectRoot: string;

  beforeEach(async () => {
    projectRoot = await mkdtemp(join(tmpdir(), 'cjs-extension-'));
    jest.spyOn(logger, 'log').mockImplementation(() => {
      return;
    });
  });

  afterEach(async () => {
    await rm(projectRoot, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  function createOptions(): NormalizedOptions {
    return {
      absoluteProjectRoot: projectRoot,
      moduleOutput: [
        { module: 'es6', outputPath: 'lib' },
        { module: 'commonjs', outputPath: 'lib-commonjs' },
      ],
    } as unknown as NormalizedOptions;
  }

  describe('postprocessCjsExtension', () => {
    it('is a no-op when the package is not "type": "module"', async () => {
      await writeFile(join(projectRoot, 'package.json'), JSON.stringify({ name: 'proj' }));
      await mkdir(join(projectRoot, 'lib-commonjs'));
      await writeFile(join(projectRoot, 'lib-commonjs/index.js'), `require("./other.js");`);

      const result = await postprocessCjsExtension(createOptions());

      expect(result).toBe(true);
      expect(await exists(join(projectRoot, 'lib-commonjs/index.js'))).toBe(true);
      expect(await exists(join(projectRoot, 'lib-commonjs/index.cjs'))).toBe(false);
    });

    it('renames *.js -> *.cjs, rewrites relative requires and renames source maps', async () => {
      await writeFile(join(projectRoot, 'package.json'), JSON.stringify({ name: 'proj', type: 'module' }));
      await mkdir(join(projectRoot, 'lib-commonjs'));
      await writeFile(
        join(projectRoot, 'lib-commonjs/index.js'),
        [`var other = require("./other.js");`, `//# sourceMappingURL=index.js.map`].join('\n'),
      );
      await writeFile(join(projectRoot, 'lib-commonjs/index.js.map'), JSON.stringify({ file: 'index.js' }));
      await writeFile(join(projectRoot, 'lib-commonjs/other.js'), `module.exports = {};`);

      const result = await postprocessCjsExtension(createOptions());

      expect(result).toBe(true);

      const files = (await readdir(join(projectRoot, 'lib-commonjs'))).sort();
      expect(files).toEqual(['index.cjs', 'index.cjs.map', 'other.cjs']);

      const index = await readFile(join(projectRoot, 'lib-commonjs/index.cjs'), 'utf-8');
      expect(index).toContain(`require("./other.cjs")`);
      expect(index).toContain(`//# sourceMappingURL=index.cjs.map`);

      const map = JSON.parse(await readFile(join(projectRoot, 'lib-commonjs/index.cjs.map'), 'utf-8'));
      expect(map.file).toBe('index.cjs');
    });
  });

  describe('copyCjsTypes', () => {
    it('is a no-op when the package is not "type": "module"', async () => {
      await writeFile(join(projectRoot, 'package.json'), JSON.stringify({ name: 'proj' }));
      await mkdir(join(projectRoot, 'dist'));
      await writeFile(join(projectRoot, 'dist/index.d.ts'), `export declare const a: string;`);

      const result = await copyCjsTypes(createOptions());

      expect(result).toBe(true);
      expect(await exists(join(projectRoot, 'dist/index.d.cts'))).toBe(false);
    });

    it('copies rolled *.d.ts -> *.d.cts for "type": "module" packages', async () => {
      await writeFile(join(projectRoot, 'package.json'), JSON.stringify({ name: 'proj', type: 'module' }));
      await mkdir(join(projectRoot, 'dist'));
      const dts = `export declare const a: string;`;
      await writeFile(join(projectRoot, 'dist/index.d.ts'), dts);

      const result = await copyCjsTypes(createOptions());

      expect(result).toBe(true);
      expect(await exists(join(projectRoot, 'dist/index.d.cts'))).toBe(true);
      expect(await readFile(join(projectRoot, 'dist/index.d.cts'), 'utf-8')).toBe(dts);
    });
  });
});
