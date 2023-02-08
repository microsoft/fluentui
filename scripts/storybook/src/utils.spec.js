const fs = require('fs');
const path = require('path');

const { stripIndents } = require('@nrwl/devkit');
const tmp = require('tmp');

const { loadWorkspaceAddon, getPackageStoriesGlob } = require('./utils');

tmp.setGracefulCleanup();

describe(`utils`, () => {
  describe(`#loadWorkspacePlugin`, () => {
    /**
     *
     * @param {{packageName:string}} options
     */
    function setup(options) {
      const npmScope = '@proj';
      const { name: rootDir } = tmp.dirSync({ prefix: 'sb-utils', unsafeCleanup: true });
      const packageRootPath = path.join('packages', options.packageName);
      const packageRootAbsolutePath = path.join(rootDir, packageRootPath);
      const paths = {
        workspaceJsonPath: path.join(rootDir, 'workspace.json'),
        rootTsconfigPath: path.join(rootDir, 'tsconfig.base.json'),
        packageJson: path.join(packageRootAbsolutePath, 'package.json'),
        preset: path.join(packageRootAbsolutePath, 'preset.js'),
      };

      // setup workspace
      fs.writeFileSync(
        paths.workspaceJsonPath,
        JSON.stringify(
          {
            projects: {
              [`${npmScope}/${options.packageName}`]: {
                root: packageRootPath,
                sourceRoot: path.join(packageRootPath, 'src'),
              },
            },
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

      fs.writeFileSync(
        paths.preset,
        stripIndents`
          function config(entry = []) {
            return [...entry, require.resolve('./lib/preset/preview')];
          }

          function managerEntries(entry = []) {
            return [...entry, require.resolve('./lib/preset/manager')];
          }

          module.exports = { managerEntries, config };
          `,
        'utf-8',
      );

      return {
        npmScope,
        workspaceRoot: rootDir,
        tsConfigRoot: paths.rootTsconfigPath,
        packageRoot: packageRootAbsolutePath,
      };
    }

    it(`should behave as identity function in prod env`, () => {
      const originalEnv = process.env;
      process.env = { ...originalEnv, NODE_ENV: 'production' };

      const { tsConfigRoot } = setup({ packageName: 'storybook-custom-addon' });

      const actual = loadWorkspaceAddon('@myorg/storybook-custom-addon', { tsConfigPath: tsConfigRoot });
      const expected = '@myorg/storybook-custom-addon';

      expect(actual).toBe(expected);

      process.env = originalEnv;
    });

    it(`should return path to in memory preset loader root`, () => {
      const { npmScope, workspaceRoot, tsConfigRoot } = setup({ packageName: 'storybook-custom-addon' });

      const actual = loadWorkspaceAddon(`${npmScope}/storybook-custom-addon`, {
        workspaceRoot,
        tsConfigPath: tsConfigRoot,
      });
      const expected = `${workspaceRoot}/packages/storybook-custom-addon/temp/preset.ts`;

      expect(actual).toBe(expected);
    });

    it(`should create mocked preset registration module with in memory TS compilation`, () => {
      const { tsConfigRoot, npmScope, packageRoot, workspaceRoot } = setup({ packageName: 'storybook-custom-addon' });

      loadWorkspaceAddon(`${npmScope}/storybook-custom-addon`, { workspaceRoot, tsConfigPath: tsConfigRoot });

      const mockedPreset = fs.readFileSync(path.join(packageRoot, 'temp', 'preset.ts'), 'utf-8');

      expect(mockedPreset).toMatchInlineSnapshot(`
        "// @ts-ignore
        const { registerTsPaths } = require('@fluentui/scripts-storybook');

        function managerWebpack(config, options) {
        registerTsPaths({config, tsConfigPath: '${tsConfigRoot}'});
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
  });
});
