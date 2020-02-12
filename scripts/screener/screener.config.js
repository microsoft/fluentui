// @ts-check

require('@uifabric/build/babel/register');

const config = require('../config').default;

const { compilerOptions } = require(config.paths.docs('tsconfig.json'));

require('tsconfig-paths').register({
  baseUrl: config.path_base,
  paths: compilerOptions.paths
});

// https://github.com/screener-io/screener-runner
module.exports = {
  projectRepo: 'microsoft/fluent-ui-react',

  apiKey: process.env.SCREENER_API_KEY,

  tunnel: {
    host: `${config.server_host}:${config.server_port}`,
    gzip: true, // gzip compress all content being served from tunnel host
    cache: true // sets cache-control header for all content being served from tunnel host. Must be used with gzip option
  },

  diffOptions: {
    structure: true,
    layout: true,
    style: true,
    content: true,
    minLayoutPosition: 1, // Optional threshold for Layout changes. Defaults to 4 pixels.
    minLayoutDimension: 1, // Optional threshold for Layout changes. Defaults to 10 pixels.
    minShiftGraphic: 1, // Optional threshold for pixel shifts in graphics.
    compareSVGDOM: false // Pass if SVG DOM is the same. Defaults to false.
  },

  // screenshot every example in maximized mode
  states: require('./screener.states').default,

  ...(process.env.CI && {
    baseBranch: 'master',
    // Disable exit code to fail in Github Actions
    // failureExitCode: 0,
    // GITHUB_REF can be:
    // - refs/heads/feature-branch-1 for "push"
    // - refs/pull/2040/merge for "pull_request"
    branch: process.env.GITHUB_REF.split('/')[2],
    commit: process.env.GITHUB_SHA
  })
};
