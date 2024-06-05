// @ts-check

/** @type {import("syncpack").RcFile} */
const config = {
  dependencyTypes: ['prod', 'dev'],
  source: [
    'package.json',
    'packages/*/package.json',
    'packages/web-components/package.json',
    'packages/react-components/*/package.json',
    'packages/fluentui/!(e2e|docs|circulars-test|local-sandbox|perf-test-northstar|perf|projects-test)/package.json',
  ],
  semverGroups: [
    {
      dependencyTypes: ['dev'],
      packages: ['@fluentui/**'],
      dependencies: ['@fluentui/**'],
      isIgnored: true,
    },
  ],
  versionGroups: [
    // completely ignore all devDeps that specify inner workspace deps - as we enforce usage of `*` or `>9.0.0-alpha`
    {
      dependencyTypes: ['dev'],
      packages: ['@fluentui/**'],
      dependencies: ['@fluentui/**'],
      isIgnored: true,
    },
    {
      packages: ['@fluentui/fluentui-repo'],
      dependencies: [
        '@babel/core',
        '@babel/preset-typescript',
        '@babel/generator',
        '@babel/traverse',
        '@rnx-kit/eslint-plugin',
        '@swc/helpers',
        '@types/react-test-renderer',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/utils',
        '@typescript-eslint/parser',
        '@microsoft/load-themed-styles',
        'chalk',
        'copy-to-clipboard',
        'del',
        'eslint-config-airbnb',
        'eslint-config-prettier',
        'eslint-import-resolver-typescript',
        'eslint-plugin-deprecation',
        'eslint-plugin-import',
        'eslint-plugin-jest',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'eslint-plugin-jsdoc',
        'fs-extra',
        'glob',
        'jju',
        'loader-utils',
        'lodash',
        'schema-utils',
        'react-is',
        'react-hot-loader',
        'react-test-renderer',
        'react-vis',
        'tslib',
        'terser',
        'terser-webpack-plugin',
        'webpack',
        'webpack-bundle-analyzer',
        'yargs',
      ],
    },
    {
      packages: ['@fluentui/react-bindings', '@fluentui/react-northstar'],
      dependencies: ['@fluentui/dom-utilities'],
    },
    {
      packages: ['@fluentui/react-northstar-emotion-renderer'],
      dependencies: ['stylis'],
    },
    {
      packages: ['@fluentui/react-conformance'],
      dependencies: ['chalk'],
    },
  ],
};

module.exports = config;
