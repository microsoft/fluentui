const cp = require('child_process');

function getCurrentHash() {
  try {
    const buffer = cp.execSync('git rev-list --parents -n 1 HEAD', {
      stdio: ['pipe', 'pipe', process.stderr],
    });

    if (buffer) {
      // The command returns a list of hashes, the last one is the one we want
      return buffer.toString().trim().split(' ').pop();
    }
  } catch (e) {
    console.error('Cannot get current git hash');
    process.exit(1);
  }

  return '';
}
/**
 *
 * @param {Object} options
 * @param {string} options.screenerApiKey
 * @param {string} options.sourceBranchName
 * @param {string} options.deployUrl
 * @param {string} options.targetBranch
 * @returns
 */
function getConfig({ screenerApiKey, sourceBranchName, deployUrl, targetBranch }) {
  const baseBranch = targetBranch ? targetBranch.replace(/^refs\/heads\//, '') : 'master';
  // https://github.com/screener-io/screener-storybook#additional-configuration-options
  const config = {
    projectRepo: 'microsoft/fluentui/react-components',
    storybookStaticBuildDir: 'dist/storybook',
    storybookConfigDir: '.storybook',
    apiKey: screenerApiKey,
    resolution: '1024x768',
    baseBranch,
    failureExitCode: 0,
    alwaysAcceptBaseBranch: true,
    ...(sourceBranchName !== 'master' ? { commit: getCurrentHash() } : null),
    baseUrl: `${deployUrl}/react-components-screener/iframe.html`,
  };
  console.log('Screener config: ' + JSON.stringify({ ...config, apiKey: '...' }, null, 2));
  return config;
}

module.exports = getConfig;
