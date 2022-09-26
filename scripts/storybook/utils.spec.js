const { stripIndents } = require('@nrwl/devkit');
const fs = require('fs');
const path = require('path');
const tmp = require('tmp');
const { loadWorkspaceAddon } = require('./utils');

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
        packageJson: path.join(packageRootAbsolutePath, 'package.json'),
        tsconfigJson: path.join(packageRootAbsolutePath, 'tsconfig.lib.json'),
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

      fs.mkdirSync(packageRootAbsolutePath, { recursive: true });
      fs.writeFileSync(
        paths.tsconfigJson,
        JSON.stringify(
          {
            compilerOptions: { outDir: 'dist' },
          },
          null,
          2,
        ),
        {},
      );

      fs.writeFileSync(
        paths.packageJson,
        JSON.stringify(
          {
            module: 'lib/index.js',
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
        packageRoot: packageRootAbsolutePath,
      };
    }

    it(`should behave as identity function in prod env`, () => {
      const originalEnv = process.env;
      process.env = { ...originalEnv, NODE_ENV: 'production' };

      const actual = loadWorkspaceAddon('@myorg/storybook-custom-addon');
      const expected = '@myorg/storybook-custom-addon';

      expect(actual).toBe(expected);

      process.env = originalEnv;
    });

    it(`should return path to in memory preset loader root`, () => {
      const { npmScope, workspaceRoot } = setup({ packageName: 'storybook-custom-addon' });

      const actual = loadWorkspaceAddon(`${npmScope}/storybook-custom-addon`, { workspaceRoot });
      const expected = `${workspaceRoot}/packages/storybook-custom-addon/dist`;

      expect(actual).toBe(expected);
    });

    it(`should create in mocked preset with in memory TS compilation`, () => {
      const { npmScope, packageRoot, workspaceRoot } = setup({ packageName: 'storybook-custom-addon' });

      loadWorkspaceAddon(`${npmScope}/storybook-custom-addon`, { workspaceRoot });

      const mockedPreset = fs.readFileSync(path.join(packageRoot, 'dist', 'preset.js'), 'utf-8');

      expect(mockedPreset).toMatchInlineSnapshot(`
        "const { workspaceRoot } = require('nx/src/utils/app-root');
        const { registerTsProject } = require('nx/src/utils/register');

        registerTsProject(workspaceRoot, 'tsconfig.base.json');

        function config(entry = []) {
        return [...entry, require.resolve('../src/preset/preview')];
        }

        function managerEntries(entry = []) {
        return [...entry, require.resolve('../src/preset/manager')];
        }

        module.exports = { managerEntries, config };"
      `);
    });
  });
});
