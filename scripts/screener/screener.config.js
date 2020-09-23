// @ts-check

require('@uifabric/build/babel/register');

const cp = require('child_process');

function getCurrentHash() {
  try {
    const buffer = cp.execSync('git rev-list --parents -n 1 HEAD', {
      stdio: ['pipe', 'pipe', process.stderr],
    });

    if (buffer) {
      // The command returns a list of hashes, the last one is the one we want
      return buffer
        .toString()
        .trim()
        .split(' ')
        .pop();
    }
  } catch (e) {
    console.error('Cannot get current git hash');
    process.exit(1);
  }

  return '';
}

const config = require('../config').default;

const { compilerOptions } = require(config.paths.docs('tsconfig.json'));

require('tsconfig-paths').register({
  baseUrl: config.path_base,
  paths: compilerOptions.paths,
});

const baseBranch = process.env.SYSTEM_PULLREQUEST_TARGETBRANCH
  ? process.env.SYSTEM_PULLREQUEST_TARGETBRANCH.replace(/^refs\/heads\//, '')
  : 'master';
const sourceBranch = process.env.BUILD_SOURCEBRANCH;

// https://github.com/screener-io/screener-runner
module.exports = {
  projectRepo: 'microsoft/fluentui/fluentui',

  apiKey: process.env.SCREENER_API_KEY,

  tunnel: {
    host: `${config.server_host}:${config.server_port}`,
    gzip: true, // gzip compress all content being served from tunnel host
    cache: true, // sets cache-control header for all content being served from tunnel host. Must be used with gzip option
  },

  diffOptions: {
    structure: true,
    layout: true,
    style: true,
    content: true,
    minLayoutPosition: 1, // Optional threshold for Layout changes. Defaults to 4 pixels.
    minLayoutDimension: 1, // Optional threshold for Layout changes. Defaults to 10 pixels.
    minShiftGraphic: 1, // Optional threshold for pixel shifts in graphics.
    compareSVGDOM: false, // Pass if SVG DOM is the same. Defaults to false.
  },

  // screenshot every example in maximized mode
  states: require('./screener.states').default,

  // CircleCI config
  // ...(process.env.CI && {
  //   baseBranch: 'master',
  //   // Disable exit code to fail in Github Actions
  //   // failureExitCode: 0,
  //   // GITHUB_REF can be:
  //   // - refs/heads/feature-branch-1 for "push"
  //   // - refs/pull/2040/merge for "pull_request"
  //   branch: process.env.GITHUB_REF.split('/')[2],
  //   commit: process.env.GITHUB_SHA
  // })

  alwaysAcceptBaseBranch: true,

  baseBranch,

  ...(sourceBranch && sourceBranch.indexOf('refs/pull') > -1
    ? {
        commit: getCurrentHash(),
      }
    : null),
};
