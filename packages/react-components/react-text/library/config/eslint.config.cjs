// @ts-check

const { readCachedProjectGraph } = require('@nx/devkit');
const nxPlugin = require('@nx/eslint-plugin');
const jsonParser = require('jsonc-eslint-parser');
// The public file-map API omits dependency edges; use the same cache reader as the Nx rule.
const { readFileMapCache } = require('nx/src/project-graph/nx-deps-cache');

// Nx otherwise warns and skips dependency checking when its graph cache is missing.
const graph = readCachedProjectGraph();
const project = graph.nodes['react-text'];
if (!project) {
  throw new Error(
    'Dependency lint cannot find react-text in the cached Nx graph. Run yarn nx reset, then yarn nx run react-text:lint-dependencies to regenerate it.',
  );
}

// dependency-checks silently skips projects without a matching build target; no build is executed.
if (!project.data.targets?.build) {
  throw new Error(
    'Dependency lint requires the react-text build target definition to select production inputs. Restore the target definition or update buildTargets and this guard together; building the package is not required.',
  );
}

if (!readFileMapCache()?.fileMap?.projectFileMap?.['react-text']) {
  throw new Error(
    'Dependency lint cannot find the react-text dependency file map. Invoke this config through Nx, not ESLint directly. If this occurred through Nx, run yarn nx reset, then yarn nx run react-text:lint-dependencies to regenerate the cache.',
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
          buildTargets: ['build'],
          checkObsoleteDependencies: false,
          checkVersionMismatches: false,
          ignoredFiles: ['{projectRoot}/config/**', '{projectRoot}/src/testing/**'],
          runtimeHelpers: ['@swc/helpers'],
        },
      ],
    },
  },
];
