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

const baseBranch = '7.0';
const sourceBranch = process.env.BUILD_SOURCEBRANCH;

// https://github.com/screener-io/screener-runner
module.exports = {
  apiKey: process.env.SCREENER_API_KEY,
  projectRepo: 'microsoft/fluentui/fluentui',

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

  alwaysAcceptBaseBranch: true,
  baseBranch,
  failureExitCode: 0,

  ...(sourceBranch && sourceBranch.indexOf('refs/pull') > -1
    ? {
        commit: getCurrentHash(),
      }
    : null),
};
