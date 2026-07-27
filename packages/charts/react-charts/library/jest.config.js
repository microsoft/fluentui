// @ts-check

const { existsSync, readFileSync } = require('node:fs');
const { dirname, join } = require('node:path');

const { cssModules } = require('@fluentui/scripts-jest');

const findPackageRoot = (libraryName, resolveFrom = __dirname) => {
  let packageRoot = dirname(require.resolve(libraryName, { paths: [resolveFrom] }));

  while (packageRoot !== dirname(packageRoot)) {
    const packageJsonPath = join(packageRoot, 'package.json');

    if (existsSync(packageJsonPath) && JSON.parse(readFileSync(packageJsonPath, 'utf8')).name === libraryName) {
      return packageRoot;
    }

    packageRoot = dirname(packageRoot);
  }

  throw new Error(`Could not resolve package root for ${libraryName}`);
};

const createD3LibMappingToCommonJs = libraryName => {
  // d3-shape must use its matching d3-path version.
  const resolveFrom = libraryName === 'd3-path' ? findPackageRoot('d3-shape') : __dirname;

  return join(findPackageRoot(libraryName, resolveFrom), 'dist', `${libraryName}.js`);
};

const d3Libs = [
  'd3-scale',
  'd3-shape',
  'd3-path',
  'd3-array',
  'd3-axis',
  'd3-selection',
  'd3-format',
  'd3-time',
  'd3-time-format',
  'd3-interpolate',
  'd3-color',
  'd3-hierarchy',
  'd3-sankey',
];

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'react-charts',
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
  /**
   * `cssModules.snapshotSerializer` is required here (not just in `jest.preset.js`)
   * because a project-level `snapshotSerializers` REPLACES the preset's array in Jest's
   * config normalisation. These suites snapshot a rendered `FluentProvider`, which is
   * converted to CSS Modules — without the serializer its generated `fuicm-*` class would
   * churn every snapshot on every style edit (DECISIONS.md D9).
   */
  snapshotSerializers: ['@griffel/jest-serializer', cssModules.snapshotSerializer],
  moduleNameMapper: Object.fromEntries(
    d3Libs.map(libraryName => [`^${libraryName}$`, createD3LibMappingToCommonJs(libraryName)]),
  ),
};
