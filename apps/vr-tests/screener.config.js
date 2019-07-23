// @ts-check

const cp = require('child_process');

function getCurrentHash() {
  try {
    const buffer = cp.execSync('git rev-list --parents -n 1 HEAD', {
      stdio: ['pipe', 'pipe', process.stderr]
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

const baseBranch = process.env.SYSTEM_PULLREQUEST_TARGETBRANCH
  ? process.env.SYSTEM_PULLREQUEST_TARGETBRANCH.replace(/^refs\/heads\//, '')
  : 'master';

// https://github.com/screener-io/screener-storybook#config-options
const config = {
  projectRepo: 'OfficeDev/office-ui-fabric-react',
  storybookConfigDir: '.storybook',
  apiKey: process.env.SCREENER_API_KEY,
  resolution: '1024x768',
  baseBranch,
  failureExitCode: 0,
  alwaysAcceptBaseBranch: true,
  ...(process.env.BUILD_SOURCEBRANCH && process.env.BUILD_SOURCEBRANCH.indexOf('refs/pull') > -1
    ? { commit: getCurrentHash() }
    : null)
};
console.log('Screener config: ' + JSON.stringify({ ...config, apiKey: '...' }, null, 2));

module.exports = config;
