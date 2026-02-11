const { createV8Config: createConfig } = require('@fluentui/scripts-jest');
const { workspaceRoot } = require('@nx/devkit');
const { relative, join } = require('node:path');

function getEsmOnlyPackagesToCjsMapping() {
  /**
   * relative path to jest cwd
   */
  const prefix = `<rootDir>/`;

  const workspaceRootNodeModules = prefix + join(relative(__dirname, workspaceRoot), 'node_modules');
  const createD3LibMappingToCommonJs = libraryName => {
    return workspaceRootNodeModules + `/${libraryName}/dist/${libraryName}.js`;
  };

  const d3Libs = [
    'd3-scale',
    'd3-interpolate',
    'd3-color',
    'd3-shape',
    'd3-axis',
    'd3-array',
    'd3-time',
    'd3-hierarchy',
    'd3-selection',
    'd3-format',
    'd3-time-format',
  ];

  /**
   * map of packages that ship only as ESM. All our d3 dependencies are ES5 except d3-scale package.
   * We had to upgrade the d3-scale to an ESM only package because of a security vulnerability in older versions.
   * See https://github.com/d3/d3-scale/issues/269 and https://github.com/d3/d3-color/pull/100
   * The current version of jest does not support ESM only packages.
   * So we need to map these packages to their CommonJS versions.
   *
   */
  const cjsPathsToEsmOnlyPackages = d3Libs.reduce((acc, lib) => {
    acc[`^${lib}$`] = createD3LibMappingToCommonJs(lib);
    return acc;
  }, {});

  // d3-path needs special handling: d3-shape@3.x requires d3-path@3.x (which exports `Path` constructor),
  // but the hoisted root d3-path is v1.x (from d3-sankey -> d3-shape@^1). Map to the nested v3 copy.
  cjsPathsToEsmOnlyPackages['^d3-path$'] = workspaceRootNodeModules + '/d3-shape/node_modules/d3-path/dist/d3-path.js';

  return cjsPathsToEsmOnlyPackages;
}

const config = createConfig({
  setupFiles: ['./config/tests.js', 'jest-canvas-mock'],
  snapshotSerializers: [require.resolve('@fluentui/jest-serializer-merge-styles')],
  setupFilesAfterEnv: ['./config/setup-env.js'],
  moduleNameMapper: {
    ...getEsmOnlyPackagesToCjsMapping(),
  },
});

module.exports = config;
