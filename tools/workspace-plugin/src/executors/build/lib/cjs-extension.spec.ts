import { mkdtemp, mkdir, writeFile, readFile, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { logger } from '@nx/devkit';

import { type NormalizedOptions } from './shared';
import { renameToCjs, cjsRenameTransforms, copyCjsTypes } from './cjs-extension';

async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * The `cjs-extension` helpers only act on `"type": "module"` packages. For every other package
 * they are a no-op, which keeps them safe to wire into the build executor before any package
 * opts into ESM-first packaging.
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

  function createOptions(isEsmPackage: boolean): NormalizedOptions {
    return {
      absoluteProjectRoot: projectRoot,
      isEsmPackage,
      moduleOutput: [
        { module: 'es6', outputPath: 'lib' },
        { module: 'commonjs', outputPath: 'lib-commonjs' },
      ],
    } as unknown as NormalizedOptions;
  }

  describe('cjsRenameTransforms', () => {
    it('returns [renameToCjs] for the commonjs target of a "type": "module" package', () => {
      const options = createOptions(true);
      expect(cjsRenameTransforms(options.moduleOutput[1], options)).toEqual([renameToCjs]);
    });

    it('returns undefined for the es6 target, even for a "type": "module" package', () => {
      const options = createOptions(true);
      expect(cjsRenameTransforms(options.moduleOutput[0], options)).toBeUndefined();
    });

    it('returns undefined for the commonjs target when the package is not "type": "module"', () => {
      const options = createOptions(false);
      expect(cjsRenameTransforms(options.moduleOutput[1], options)).toBeUndefined();
    });
  });

  describe('renameToCjs', () => {
    it('renames *.js -> *.cjs and rewrites relative requires + sourceMappingURL comment', async () => {
      await mkdir(join(projectRoot, 'lib-commonjs'));
      await writeFile(
        join(projectRoot, 'lib-commonjs/index.js'),
        [`var other = require("./other.js");`, `//# sourceMappingURL=index.js.map`].join('\n'),
      );

      await renameToCjs(join(projectRoot, 'lib-commonjs/index.js'));

      expect(await exists(join(projectRoot, 'lib-commonjs/index.js'))).toBe(false);
      const index = await readFile(join(projectRoot, 'lib-commonjs/index.cjs'), 'utf-8');
      expect(index).toContain(`require("./other.cjs")`);
      expect(index).toContain(`//# sourceMappingURL=index.cjs.map`);
    });

    it('renames the adjacent *.js.map -> *.cjs.map and patches the "file" field', async () => {
      await mkdir(join(projectRoot, 'lib-commonjs'));
      await writeFile(join(projectRoot, 'lib-commonjs/index.js.map'), JSON.stringify({ file: 'index.js' }));

      await renameToCjs(join(projectRoot, 'lib-commonjs/index.js.map'));

      expect(await exists(join(projectRoot, 'lib-commonjs/index.js.map'))).toBe(false);
      const map = JSON.parse(await readFile(join(projectRoot, 'lib-commonjs/index.cjs.map'), 'utf-8'));
      expect(map.file).toBe('index.cjs');
    });
  });

  describe('copyCjsTypes', () => {
    it('is a no-op when the package is not "type": "module"', async () => {
      await mkdir(join(projectRoot, 'dist'));
      await writeFile(join(projectRoot, 'dist/index.d.ts'), `export declare const a: string;`);

      const result = await copyCjsTypes(createOptions(false));

      expect(result).toBe(true);
      expect(await exists(join(projectRoot, 'dist/index.d.cts'))).toBe(false);
    });

    it('copies rolled *.d.ts -> *.d.cts for "type": "module" packages', async () => {
      await mkdir(join(projectRoot, 'dist'));
      const dts = `export declare const a: string;`;
      await writeFile(join(projectRoot, 'dist/index.d.ts'), dts);

      const result = await copyCjsTypes(createOptions(true));

      expect(result).toBe(true);
      expect(await exists(join(projectRoot, 'dist/index.d.cts'))).toBe(true);
      expect(await readFile(join(projectRoot, 'dist/index.d.cts'), 'utf-8')).toBe(dts);
    });
  });
});
