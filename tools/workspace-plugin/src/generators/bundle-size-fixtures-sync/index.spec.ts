import { type ProjectConfiguration, type Tree, writeJson } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import generator from './index';

/**
 * Barrel walking is covered by `lib/public-exports.spec.ts`.
 */
describe('bundle-size-fixtures-sync generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function setupProject(options: {
    name: string;
    packageName?: string;
    projectConfig?: Partial<ProjectConfiguration>;
    dependencies?: Record<string, string>;
    sourceFiles?: Record<string, string>;
  }) {
    const root = `packages/${options.name}`;

    writeJson(tree, `${root}/project.json`, {
      name: options.name,
      projectType: 'library',
      sourceRoot: `${root}/src`,
      tags: ['vNext', 'platform:web'],
      ...options.projectConfig,
    });

    writeJson(tree, `${root}/package.json`, {
      name: options.packageName ?? `@proj/${options.name}`,
      version: '9.0.0',
      type: 'module',
      dependencies: options.dependencies,
    });

    tree.write(`${root}/src/index.ts`, 'export {};');
    for (const [filePath, contents] of Object.entries(options.sourceFiles ?? {})) {
      tree.write(`${root}/${filePath}`, contents);
    }

    return { root, readFixture: (fileName: string) => tree.read(`${root}/bundle-size/${fileName}`, 'utf-8') };
  }

  describe('entryPoints fixture', () => {
    function setupEntryPointsProject(sourceFiles: Record<string, string>) {
      return setupProject({
        name: 'react-headless',
        packageName: '@proj/react-headless',
        projectConfig: {
          metadata: {
            exportMap: { root: true, subpathEntryPoints: ['src/*.ts'] },
            bundleSizeFixtures: {
              'AllComponents.fixture.js': { kind: 'entryPoints', name: 'react-headless: entire library' },
            },
          },
        },
        sourceFiles,
      });
    }

    it('namespace imports every subpath and logs them', async () => {
      const project = setupEntryPointsProject({ 'src/badge.ts': 'export {};', 'src/color-picker.ts': 'export {};' });

      await generator(tree);

      expect(project.readFixture('AllComponents.fixture.js')).toMatchInlineSnapshot(`
        "import * as Badge from '@proj/react-headless/badge';
        import * as ColorPicker from '@proj/react-headless/color-picker';

        console.log({
          Badge,
          ColorPicker,
        });

        export default {
          name: 'react-headless: entire library',
        };
        "
      `);
    });

    it('omits the root entry, which would defeat per subpath isolation', async () => {
      const project = setupEntryPointsProject({ 'src/badge.ts': 'export {};' });

      await generator(tree);

      expect(project.readFixture('AllComponents.fixture.js')).not.toContain("from '@proj/react-headless'");
    });

    it('picks up a newly added subpath', async () => {
      const project = setupEntryPointsProject({ 'src/badge.ts': 'export {};' });
      await generator(tree);

      tree.write('packages/react-headless/src/tooltip.ts', 'export {};');
      const result = await generator(tree);

      expect(result.outOfSyncMessage).toContain('AllComponents.fixture.js');
      expect(project.readFixture('AllComponents.fixture.js')).toContain(
        "import * as Tooltip from '@proj/react-headless/tooltip';",
      );
    });

    it('expands a wildcard entry into the subpaths it currently resolves to', async () => {
      const project = setupProject({
        name: 'react-headless',
        packageName: '@proj/react-headless',
        projectConfig: {
          metadata: {
            exportMap: { root: true, subpathEntryPoints: [], subpathPatterns: ['src/items/*/index.ts'] },
            bundleSizeFixtures: {
              'AllComponents.fixture.js': { kind: 'entryPoints', name: 'react-headless: entire library' },
            },
          },
        },
        sourceFiles: { 'src/items/one/index.ts': 'export {};', 'src/items/two/index.ts': 'export {};' },
      });

      await generator(tree);

      const fixture = project.readFixture('AllComponents.fixture.js');
      expect(fixture).toContain("import * as ItemsOne from '@proj/react-headless/items/one';");
      expect(fixture).toContain("import * as ItemsTwo from '@proj/react-headless/items/two';");
      // the wildcard key itself is not importable
      expect(fixture).not.toContain('@proj/react-headless/items/*');
    });
  });

  describe('baseHooks fixture', () => {
    function setupSuite() {
      setupProject({
        name: 'react-button',
        packageName: '@proj/react-button',
        sourceFiles: {
          'src/index.ts': [
            `export { Button, useButtonBase_unstable, useCompoundButtonBase_unstable } from './Button';`,
            `export type { ButtonProps } from './Button';`,
          ].join('\n'),
        },
      });
      setupProject({
        name: 'react-avatar',
        packageName: '@proj/react-avatar',
        sourceFiles: { 'src/index.ts': `export { useAvatarBase_unstable } from './Avatar';` },
      });
      setupProject({
        name: 'react-theme',
        packageName: '@proj/react-theme',
        sourceFiles: { 'src/index.ts': `export { tokens } from './tokens';` },
      });

      return setupProject({
        name: 'react-components',
        packageName: '@proj/react-components',
        dependencies: {
          '@proj/react-button': '^9.0.0',
          '@proj/react-avatar': '^9.0.0',
          '@proj/react-theme': '^9.0.0',
          '@swc/helpers': '^0.5.1',
        },
        projectConfig: {
          metadata: {
            bundleSizeFixtures: {
              'BaseHooks.fixture.js': { kind: 'baseHooks', name: 'react-components: all base hooks' },
            },
          },
        },
      });
    }

    it('named imports every base hook grouped and sorted by package', async () => {
      const project = setupSuite();

      await generator(tree);

      expect(project.readFixture('BaseHooks.fixture.js')).toMatchInlineSnapshot(`
        "// Named imports only - a namespace import would retain every styled component and defeat the isolation check.
        import { useAvatarBase_unstable } from '@proj/react-avatar';
        import {
          useButtonBase_unstable,
          useCompoundButtonBase_unstable,
        } from '@proj/react-button';

        console.log(
          useAvatarBase_unstable,
          useButtonBase_unstable,
          useCompoundButtonBase_unstable
        );

        export default {
          name: 'react-components: all base hooks',
        };
        "
      `);
    });

    it('picks up a base hook newly exported from a dependency source', async () => {
      const project = setupSuite();
      await generator(tree);

      tree.write(
        'packages/react-avatar/src/index.ts',
        `export { useAvatarBase_unstable, useAvatarGroupBase_unstable } from './Avatar';`,
      );
      const result = await generator(tree);

      expect(result.outOfSyncMessage).toContain('BaseHooks.fixture.js');
      expect(project.readFixture('BaseHooks.fixture.js')).toContain('useAvatarGroupBase_unstable');
    });

    it('ignores non workspace dependencies', async () => {
      const project = setupSuite();

      await generator(tree);

      expect(project.readFixture('BaseHooks.fixture.js')).not.toContain('@swc/helpers');
    });
  });

  it('leaves projects without a fixture declaration alone', async () => {
    const project = setupProject({ name: 'react-button' });

    await generator(tree);

    expect(project.readFixture('AllComponents.fixture.js')).toBeNull();
  });

  it('is a no-op on the second run', async () => {
    setupProject({
      name: 'react-headless',
      projectConfig: {
        metadata: {
          exportMap: { root: false, subpathEntryPoints: ['src/*.ts'] },
          bundleSizeFixtures: {
            'AllComponents.fixture.js': { kind: 'entryPoints', name: 'react-headless: entire library' },
          },
        },
      },
      sourceFiles: { 'src/badge.ts': 'export {};' },
    });

    await generator(tree);
    const result = await generator(tree);

    expect(result.outOfSyncMessage).toBeUndefined();
  });
});
