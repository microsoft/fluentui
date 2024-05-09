/* eslint-disable no-shadow */
const fs = require('fs');
const path = require('path');

const { getAllPackageInfo } = require('@fluentui/scripts-monorepo');
const { stripIndents, workspaceRoot } = require('@nx/devkit');
const semver = require('semver');
const tmp = require('tmp');

const {
  loadWorkspaceAddon,
  getPackageStoriesGlob,
  getImportMappingsForExportToSandboxAddon,
  processBabelLoaderOptions,
} = require('./utils');

tmp.setGracefulCleanup();

describe(`utils`, () => {
  describe(`#loadWorkspacePlugin`, () => {
    /**
     *
     * @param {{packageName:string, presetContent?: string}} options
     */
    function setup(options) {
      const npmScope = '@proj';
      const { name: rootDir } = tmp.dirSync({ prefix: 'sb-utils', unsafeCleanup: true });
      const packageRootPath = path.join('packages', options.packageName);
      const packageRootAbsolutePath = path.join(rootDir, packageRootPath);
      const paths = {
        nxJsonPath: path.join(rootDir, 'nx.json'),
        projectJsonPath: path.join(packageRootAbsolutePath, 'project.json'),
        rootTsconfigPath: path.join(rootDir, 'tsconfig.base.json'),
        packageJson: path.join(packageRootAbsolutePath, 'package.json'),
        preset: path.join(packageRootAbsolutePath, 'preset.js'),
      };

      // setup project
      fs.writeFileSync(paths.nxJsonPath, JSON.stringify({ npmScope: 'proj' }, null, 2), 'utf-8');
      fs.mkdirSync(packageRootAbsolutePath, { recursive: true });
      fs.writeFileSync(
        paths.projectJsonPath,
        JSON.stringify(
          {
            name: `${npmScope}/${options.packageName}`,
            root: packageRootPath,
            sourceRoot: path.join(packageRootPath, 'src'),
          },
          null,
          2,
        ),
        'utf-8',
      );
      fs.writeFileSync(
        paths.rootTsconfigPath,
        JSON.stringify({ compilerOptions: { baseUrl: '.', paths: { '@proj/one': ['packages/one/src/index.ts'] } } }),
      );

      fs.mkdirSync(packageRootAbsolutePath, { recursive: true });
      fs.writeFileSync(
        paths.packageJson,
        JSON.stringify(
          {
            module: './lib/index.js',
          },
          null,
          2,
        ),
        'utf-8',
      );

      const presetTemplate =
        options.presetContent ??
        stripIndents`
          function config(entry = []) {
            return [...entry, require.resolve('./lib/preset/preview')];
          }

          function managerEntries(entry = []) {
            return [...entry, require.resolve('./lib/preset/manager')];
          }

          module.exports = { managerEntries, config };
      `;

      fs.writeFileSync(paths.preset, presetTemplate, 'utf-8');

      return {
        npmScope,
        workspaceRoot: rootDir,
        tsConfigRoot: paths.rootTsconfigPath,
        packageRoot: packageRootAbsolutePath,
      };
    }

    it(`should return path to in memory preset loader root`, () => {
      const { npmScope, workspaceRoot, tsConfigRoot } = setup({ packageName: 'storybook-custom-addon' });

      const actual = loadWorkspaceAddon(`${npmScope}/storybook-custom-addon`, {
        workspaceRoot,
        tsConfigPath: tsConfigRoot,
      });
      const expected = `${workspaceRoot}/packages/storybook-custom-addon/temp/preset.ts`;

      expect(actual).toBe(expected);
    });

    it(`should return path to in memory preset loader root with options if provided `, () => {
      const { npmScope, workspaceRoot, tsConfigRoot } = setup({ packageName: 'storybook-custom-addon' });

      const actual = loadWorkspaceAddon(`${npmScope}/storybook-custom-addon`, {
        workspaceRoot,
        tsConfigPath: tsConfigRoot,
        options: { who: 'developers' },
      });
      const expected = {
        name: `${workspaceRoot}/packages/storybook-custom-addon/temp/preset.ts`,
        options: { who: 'developers' },
      };

      expect(actual).toEqual(expected);
    });

    it(`should create mocked preset registration module with in memory TS compilation`, () => {
      const { tsConfigRoot, npmScope, packageRoot, workspaceRoot } = setup({ packageName: 'storybook-custom-addon' });

      loadWorkspaceAddon(`${npmScope}/storybook-custom-addon`, { workspaceRoot, tsConfigPath: tsConfigRoot });

      const mockedPreset = fs.readFileSync(path.join(packageRoot, 'temp', 'preset.ts'), 'utf-8');

      expect(mockedPreset.replace(tsConfigRoot, 'Any<String>')).toMatchInlineSnapshot(`
        "// @ts-nocheck

        const { registerTsPaths } = require('@fluentui/scripts-storybook');

        function managerWebpack(config, options) {
        registerTsPaths({config, configFile: 'Any<String>'});
        return config;
        }

        function config(entry = []) {
        return [...entry, require.resolve('../src/preset/preview.ts')];
        }

        function managerEntries(entry = []) {
        return [...entry, require.resolve('../src/preset/manager.ts')];
        }

        module.exports = { managerWebpack, managerEntries, config };"
      `);
    });

    it(`should create mocked preset registration module with in memory TS compilation if webpack preset is part of api`, () => {
      const { tsConfigRoot, npmScope, packageRoot, workspaceRoot } = setup({
        packageName: 'storybook-custom-addon',

        presetContent: stripIndents`
          const preset = require('./lib/preset/preset');

          function config(entry = []) {
            return [...entry, require.resolve('./lib/preset/preview')];
          }

          function managerEntries(entry = []) {
            return [...entry, require.resolve('./lib/preset/manager')];
          }

          module.exports = { managerEntries, config, ...preset };
      `,
      });

      loadWorkspaceAddon(`${npmScope}/storybook-custom-addon`, { workspaceRoot, tsConfigPath: tsConfigRoot });

      const mockedPreset = fs.readFileSync(path.join(packageRoot, 'temp', 'preset.ts'), 'utf-8');

      expect(mockedPreset.replace(tsConfigRoot, 'Any<String>')).toMatchInlineSnapshot(`
        "// @ts-nocheck

        function registerInMemoryTsTranspilation(){
        const { registerTsProject } = require('@nx/js/src/internal');
        const { joinPathFragments } = require('@nx/devkit');
        registerTsProject(joinPathFragments(__dirname, '..', 'tsconfig.lib.json'));
        }

        registerInMemoryTsTranspilation();

        const { registerTsPaths } = require('@fluentui/scripts-storybook');

        function managerWebpack(config, options) {
        registerTsPaths({config, configFile: 'Any<String>'});
        return config;
        }

        const preset = require('../src/preset/preset');

        function config(entry = []) {
        return [...entry, require.resolve('../src/preset/preview.ts')];
        }

        function managerEntries(entry = []) {
        return [...entry, require.resolve('../src/preset/manager.ts')];
        }

        module.exports = { managerWebpack, managerEntries, config, ...preset };"
      `);
    });
  });

  describe(`#getPackageStoriesGlob`, () => {
    it(`should generate storybook stories string array of glob based on package.json#dependencies field`, () => {
      const actual = getPackageStoriesGlob({
        packageName: '@fluentui/react-components',
        callerPath: path.dirname(__dirname),
      });

      const expected = [
        expect.stringContaining('../../packages/react-'),
        expect.stringContaining('/**/@(index.stories.@(ts|tsx)|*.stories.mdx)'),
      ];

      expect(actual).toEqual(expect.arrayContaining(expected));

      const first = actual[0];
      expect(first.startsWith('../../packages/react-')).toBeTruthy();

      expect(first.endsWith('**/@(index.stories.@(ts|tsx)|*.stories.mdx)')).toBeTruthy();
    });

    it(`should generate storybook stories string array of glob based on package.json#dependencies field without packages specified within 'excludeStoriesInsertionFromPackages'`, () => {
      const actual = getPackageStoriesGlob({
        packageName: '@fluentui/react-components',
        callerPath: path.dirname(__dirname),
        excludeStoriesInsertionFromPackages: ['@fluentui/react-text'],
      });

      expect(actual).not.toContain(expect.stringContaining('/react-text/stories/'));
    });

    // @TODO: Once we will have at least 1 project migrated to the new structure we can enable/implement this test
    it.todo(
      `should generate storybook stories string array of glob based on package.json#dependencies field pointing to sibling /stories project if it exists`,
    );
  });

  describe(`#processBabelLoaderOptions`, () => {
    it(`should add customize property with loader`, () => {
      const actual = processBabelLoaderOptions({ plugins: [['foo-babel-loader', { one: true }]] });

      expect(actual).toEqual({
        customize: `${workspaceRoot}/scripts/storybook/src/loaders/custom-loader.js`,
        plugins: [
          [
            'foo-babel-loader',
            {
              one: true,
            },
          ],
        ],
      });
    });
  });

  describe(`#getImportMappingsForExportToSandboxAddon`, () => {
    it(`should get import mappings for storybook sources`, () => {
      const allPackagesInfo = getAllPackageInfo();
      const allPackagesInfoProjects = Object.values(allPackagesInfo);
      const suitePackage = allPackagesInfo['@fluentui/react-components'];
      const suitePackageDependencies = suitePackage.packageJson.dependencies ?? {};
      const unstablePackage = allPackagesInfoProjects.find(metadata => {
        return (
          suitePackageDependencies[metadata.packageJson.name] &&
          semver.prerelease(metadata.packageJson.version) !== null
        );
      });
      const stableSuitePackages = allPackagesInfoProjects.reduce((acc, metadata) => {
        if (
          suitePackageDependencies[metadata.packageJson.name] &&
          semver.prerelease(metadata.packageJson.version) === null
        ) {
          acc[metadata.packageJson.name] = { replace: '@fluentui/react-components' };
        }
        return acc;
      }, /** @type {Record<string, { replace: string }>} */ ({}));

      const actual = getImportMappingsForExportToSandboxAddon();

      expect(actual).toEqual(
        expect.objectContaining({
          ...stableSuitePackages,
          ...(unstablePackage
            ? { [unstablePackage.packageJson.name]: { replace: '@fluentui/react-components/unstable' } }
            : null),
        }),
      );
    });
  });
});
