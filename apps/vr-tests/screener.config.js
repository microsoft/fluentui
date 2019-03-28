const cp = require('child_process');

function execSync(command) {
  return cp.execSync(command, {
    stdio: ['pipe', 'pipe', process.stderr]
  });
}

function runGit(command) {
  return execSync(`git ${command}`);
}

export function getCurrentHash() {
  try {
    const buffer = runGit('rev-parse HEAD');

    if (buffer) {
      return buffer.toString().trim();
    }
  } catch (e) {
    console.error('Cannot get current git hash');
  }

  return '';
}

module.exports = {
  projectRepo: 'OfficeDev/office-ui-fabric-react',
  storybookConfigDir: '.storybook',
  apiKey: process.env.SCREENER_API_KEY,
  resolution: '1024x768',
  baseBranch:
    process.env['SYSTEM_PULLREQUEST_TARGETBRANCH'].replace(/^refs\/heads\//, '') || 'master',
  failureExitCode: 0,
  alwaysAcceptBaseBranch: true,
  commit: getCurrentHash()
};
