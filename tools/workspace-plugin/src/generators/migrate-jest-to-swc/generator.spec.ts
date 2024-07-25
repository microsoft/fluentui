import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, addProjectConfiguration, stripIndents, writeJson } from '@nx/devkit';

import { migrateJestToSwcGenerator } from './generator';
import { MigrateJestToSwcGeneratorSchema } from './schema';

describe('migrate-jest-to-swc generator', () => {
  let tree: Tree;
  const options: MigrateJestToSwcGeneratorSchema = {};

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    createLibrary(tree, { project: 'hello-world' });

    await migrateJestToSwcGenerator(tree, options);

    expect(tree.read('packages/hello-world/jest.config.js', 'utf-8')).toMatchInlineSnapshot(`
      "// @ts-check
      /* eslint-disable */

      const { readFileSync } = require('node:fs');
      const { join } = require('node:path');

      // Reading the SWC compilation config and remove the \\"exclude\\"
      // for the test files to be compiled by SWC
      const { exclude: _, ...swcJestConfig } = JSON.parse(
        readFileSync(join(__dirname, '.swcrc'), 'utf-8')
      );

      // disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves.
      // If we do not disable this, SWC Core will read .swcrc and won't transform our test files due to \\"exclude\\"
      if (swcJestConfig.swcrc === undefined) {
        swcJestConfig.swcrc = false;
      }

      // Uncomment if using global setup/teardown files being transformed via swc
      // https://nx.dev/packages/jest/documents/overview#global-setup/teardown-with-nx-libraries
      // jest needs EsModule Interop to find the default exported setup/teardown functions
      // swcJestConfig.module.noInterop = false;

      /**
       * @type {import('@jest/types').Config.InitialOptions}
       */
      module.exports = {
        displayName: 'hello-world',
        preset: '../../../../jest.preset.js',
        transform: {
          '^.+\\\\\\\\.tsx?$': ['@swc/jest', swcJestConfig],
        },
        coverageDirectory: './coverage',
        setupFilesAfterEnv: ['./config/tests.js'],
        snapshotSerializers: ['@griffel/jest-serializer'],
      };
      "
    `);
  });
});

function createLibrary(tree: Tree, options: { project: string }) {
  const { project } = options;
  const rootPath = `packages/${project}`;
  addProjectConfiguration(tree, project, {
    root: rootPath,
    tags: ['vNext'],
    projectType: 'library',
  });

  tree.write(
    `${rootPath}/jest.config.js`,
    stripIndents`
// @ts-check

/**
* @type {import('@jest/types').Config.InitialOptions}
*/
module.exports = {
  displayName: '${project}',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        isolatedModules: true,
      },
    ],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  snapshotSerializers: ['@griffel/jest-serializer'],
};
  `,
  );
  writeJson(tree, `${rootPath}/.swcrc`, {
    $schema: 'https://json.schemastore.org/swcrc',
    exclude: [
      '/testing',
      '/**/*.cy.ts',
      '/**/*.cy.tsx',
      '/**/*.spec.ts',
      '/**/*.spec.tsx',
      '/**/*.test.ts',
      '/**/*.test.tsx',
    ],
    jsc: {
      experimental: {
        plugins: [['swc-plugin-de-indent-template-literal', {}]],
      },
      parser: {
        syntax: 'typescript',
        tsx: true,
        decorators: false,
        dynamicImport: false,
      },
      externalHelpers: true,
      transform: {
        react: {
          runtime: 'classic',
          useSpread: true,
        },
      },
      target: 'es2019',
    },
    minify: false,
    sourceMaps: true,
  });
}
