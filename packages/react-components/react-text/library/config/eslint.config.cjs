// @ts-check

const { readCachedProjectGraph } = require('@nx/devkit');
const nxPlugin = require('@nx/eslint-plugin');
const jsonParser = require('jsonc-eslint-parser');
const { readFileMapCache } = require('nx/src/project-graph/nx-deps-cache');

// Nx otherwise warns and skips dependency checking when its graph cache is missing.
const graph = readCachedProjectGraph();
if (!graph.nodes['react-text']?.data.targets?.build || !readFileMapCache()?.fileMap.projectFileMap['react-text']) {
  throw new Error(
    'Dependency lint requires the react-text project graph and file map. Run yarn nx run react-text:lint-dependencies.',
  );
}

module.exports = [
  {
    files: ['**/package.json'],
    languageOptions: { parser: jsonParser },
    plugins: { '@nx': nxPlugin },
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          checkObsoleteDependencies: false,
          checkVersionMismatches: false,
          ignoredFiles: ['{projectRoot}/config/**', '{projectRoot}/src/testing/**'],
          runtimeHelpers: ['@swc/helpers'],
        },
      ],
    },
  },
];
