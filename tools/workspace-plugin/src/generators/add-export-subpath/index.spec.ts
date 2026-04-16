import { addProjectConfiguration, joinPathFragments, readJson, Tree, writeJson } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import addExportSubpathGenerator from './index';
import type { PackageJson } from '../../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const PROJECT_NAME = 'react-headless-components-preview';
const NPM_NAME = `@proj/${PROJECT_NAME}`;
const PROJECT_ROOT = `packages/react-components/${PROJECT_NAME}/library`;

function createProject(tree: Tree, overrides: Partial<PackageJson> = {}) {
  addProjectConfiguration(tree, PROJECT_NAME, {
    root: PROJECT_ROOT,
    projectType: 'library',
    sourceRoot: `${PROJECT_ROOT}/src`,
    tags: ['vNext', 'platform:web'],
  });

  writeJson<PackageJson>(tree, joinPathFragments(PROJECT_ROOT, 'package.json'), {
    name: NPM_NAME,
    version: '0.0.0',
    main: 'lib-commonjs/index.js',
    module: 'lib/index.js',
    typings: './dist/index.d.ts',
    files: ['*.md', 'dist/*.d.ts', 'lib', 'lib-commonjs'],
    exports: {
      '.': {
        types: './dist/index.d.ts',
        node: './lib-commonjs/index.js',
        import: './lib/index.js',
        require: './lib-commonjs/index.js',
      },
      './package.json': './package.json',
    },
    ...overrides,
  });

  // Primary api-extractor config
  writeJson(tree, joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.json'), {
    $schema: 'https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json',
    extends: '@fluentui/scripts-api-extractor/api-extractor.common.v-next.json',
    mainEntryPointFilePath:
      '<projectRoot>/../../../../../../dist/out-tsc/types/packages/react-components/react-headless-components-preview/library/src/index.d.ts',
  });

  // Source entry
  tree.write(joinPathFragments(PROJECT_ROOT, 'src', 'index.ts'), `export * from './utils';`);

  return tree;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('add-export-subpath generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    createProject(tree);
  });

  describe('api-extractor config', () => {
    it('creates config/api-extractor.{subpath}.json', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      expect(tree.exists(joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.utils.json'))).toBe(true);
    });

    it('sets mainEntryPointFilePath to the sub-path entrypoint', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      const config = readJson(tree, joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.utils.json'));

      expect(config.mainEntryPointFilePath).toContain('/src/utils/index.d.ts');
    });

    it('derives mainEntryPointFilePath from custom sourceEntrypoint', async () => {
      await addExportSubpathGenerator(tree, {
        project: PROJECT_NAME,
        subpath: 'tokens',
        sourceEntrypoint: 'tokens/index.ts',
      });

      const config = readJson(tree, joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.tokens.json'));

      expect(config.mainEntryPointFilePath).toContain('/src/tokens/index.d.ts');
    });

    it('sets dtsRollup.untrimmedFilePath to dist/{subpath}/index.d.ts', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      const config = readJson(tree, joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.utils.json'));

      expect(config.dtsRollup).toEqual({
        enabled: true,
        untrimmedFilePath: '<projectFolder>/dist/utils/index.d.ts',
      });
    });

    it('disables apiReport by default', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      const config = readJson(tree, joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.utils.json'));

      expect(config.apiReport.enabled).toBe(false);
    });

    it('enables apiReport and sets reportFileName when enableApiReport is true', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils', enableApiReport: true });

      const config = readJson(tree, joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.utils.json'));

      expect(config.apiReport.enabled).toBe(true);
      expect(config.apiReport.reportFileName).toBe('<unscopedPackageName>.utils');
    });

    it('extends the common v-next base config', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      const config = readJson(tree, joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.utils.json'));

      expect(config.extends).toBe('@fluentui/scripts-api-extractor/api-extractor.common.v-next.json');
    });

    it('throws if the sub-path config already exists', async () => {
      writeJson(tree, joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.utils.json'), {});

      await expect(addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' })).rejects.toThrow(
        /already exists/,
      );
    });

    it('throws if primary api-extractor.json is missing', async () => {
      tree.delete(joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.json'));

      await expect(addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' })).rejects.toThrow(
        /Cannot find primary api-extractor.json/,
      );
    });

    it('throws if primary api-extractor.json has no mainEntryPointFilePath', async () => {
      writeJson(tree, joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.json'), {
        extends: '@fluentui/scripts-api-extractor/api-extractor.common.v-next.json',
        // no mainEntryPointFilePath
      });

      await expect(addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' })).rejects.toThrow(
        /"mainEntryPointFilePath" is not set/,
      );
    });

    it('throws if primary mainEntryPointFilePath does not end with /src/index.d.ts', async () => {
      writeJson(tree, joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.json'), {
        extends: '@fluentui/scripts-api-extractor/api-extractor.common.v-next.json',
        mainEntryPointFilePath: '<projectFolder>/dist/index.d.ts',
      });

      await expect(addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' })).rejects.toThrow(
        /Could not derive/,
      );
    });
  });

  describe('package.json exports', () => {
    it('adds a ./{subpath} export entry', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      const pkg = readJson<PackageJson>(tree, joinPathFragments(PROJECT_ROOT, 'package.json'));

      expect(pkg.exports?.['./utils']).toBeDefined();
    });

    it('sets the types field to dist/{subpath}/index.d.ts', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      const pkg = readJson<PackageJson>(tree, joinPathFragments(PROJECT_ROOT, 'package.json'));
      const entry = pkg.exports?.['./utils'];

      expect(typeof entry === 'object' && entry.types).toBe('./dist/utils/index.d.ts');
    });

    it('derives JS paths from the main export entry', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      const pkg = readJson<PackageJson>(tree, joinPathFragments(PROJECT_ROOT, 'package.json'));
      const entry = pkg.exports?.['./utils'];

      expect(typeof entry === 'object' && entry).toMatchObject({
        node: './lib-commonjs/utils/index.js',
        import: './lib/utils/index.js',
        require: './lib-commonjs/utils/index.js',
      });
    });

    it('inserts the sub-path entry before ./package.json', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      const pkg = readJson<PackageJson>(tree, joinPathFragments(PROJECT_ROOT, 'package.json'));
      const keys = Object.keys(pkg.exports ?? {});
      const utilsIdx = keys.indexOf('./utils');
      const pkgJsonIdx = keys.indexOf('./package.json');

      expect(utilsIdx).toBeGreaterThan(-1);
      expect(pkgJsonIdx).toBeGreaterThan(utilsIdx);
    });

    it('preserves pre-existing exports', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      const pkg = readJson<PackageJson>(tree, joinPathFragments(PROJECT_ROOT, 'package.json'));

      expect(pkg.exports?.['.']).toBeDefined();
      expect(pkg.exports?.['./package.json']).toBeDefined();
    });

    it('adds dist/{subpath}/*.d.ts to package.json files', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      const pkg = readJson<PackageJson>(tree, joinPathFragments(PROJECT_ROOT, 'package.json'));

      expect(pkg.files).toContain('dist/utils/*.d.ts');
    });

    it('does not duplicate files entry when run twice with different subpaths', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      // Simulate a second sub-path added later
      writeJson(tree, joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.preview.json'), {});
      // Delete it so second run creates fresh
      tree.delete(joinPathFragments(PROJECT_ROOT, 'config', 'api-extractor.preview.json'));

      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'preview' });

      const pkg = readJson<PackageJson>(tree, joinPathFragments(PROJECT_ROOT, 'package.json'));
      const utilsCount = (pkg.files ?? []).filter((f: string) => f === 'dist/utils/*.d.ts').length;
      const previewCount = (pkg.files ?? []).filter((f: string) => f === 'dist/preview/*.d.ts').length;

      expect(utilsCount).toBe(1);
      expect(previewCount).toBe(1);
    });
  });

  describe('source stub', () => {
    it('creates src/{subpath}/index.ts if it does not exist', async () => {
      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      expect(tree.exists(joinPathFragments(PROJECT_ROOT, 'src', 'utils', 'index.ts'))).toBe(true);
    });

    it('does not overwrite an existing src/{subpath}/index.ts', async () => {
      const existingContent = `export const value = 42;\n`;
      tree.write(joinPathFragments(PROJECT_ROOT, 'src', 'utils', 'index.ts'), existingContent);

      await addExportSubpathGenerator(tree, { project: PROJECT_NAME, subpath: 'utils' });

      expect(tree.read(joinPathFragments(PROJECT_ROOT, 'src', 'utils', 'index.ts'), 'utf-8')).toBe(existingContent);
    });

    it('respects a custom sourceEntrypoint for the stub path', async () => {
      await addExportSubpathGenerator(tree, {
        project: PROJECT_NAME,
        subpath: 'tokens',
        sourceEntrypoint: 'tokens/index.ts',
      });

      expect(tree.exists(joinPathFragments(PROJECT_ROOT, 'src', 'tokens', 'index.ts'))).toBe(true);
    });
  });
});
