const cp = require('child_process');

function getCurrentHash() {
  try {
    const buffer = cp.execSync('git rev-parse HEAD', { stdio: ['pipe', 'pipe', process.stderr] });

    if (buffer) {
      return buffer.toString().trim();
    }
  } catch (e) {
    console.error('Cannot get current git hash');
  }

  return '';
}

const baseBranch = process.env.SYSTEM_PULLREQUEST_TARGETBRANCH
  ? process.env.SYSTEM_PULLREQUEST_TARGETBRANCH.replace(/^refs\/heads\//, '')
  : 'master';

module.exports = {
  projectRepo: 'OfficeDev/office-ui-fabric-react',
  storybookConfigDir: '.storybook',
  apiKey: process.env.SCREENER_API_KEY,
  resolution: '1024x768',
  baseBranch,
  failureExitCode: 0,
  alwaysAcceptBaseBranch: true,
  commit: getCurrentHash()
};
