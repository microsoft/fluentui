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
 * @param {string} SCREENER_API_KEY
 * @param {string} BUILD_SOURCEBRANCHNAME
 * @param {string} DEPLOYURL
 * @param {string} SYSTEM_PULLREQUEST_TARGETBRANCH
 * @returns
 */
function getConfig(SCREENER_API_KEY, BUILD_SOURCEBRANCHNAME, DEPLOYURL, SYSTEM_PULLREQUEST_TARGETBRANCH) {
  const baseBranch = SYSTEM_PULLREQUEST_TARGETBRANCH
    ? SYSTEM_PULLREQUEST_TARGETBRANCH.replace(/^refs\/heads\//, '')
    : 'master';
  // https://github.com/screener-io/screener-storybook#additional-configuration-options
  const config = {
    projectRepo: 'microsoft/fluentui/react-components',
    storybookStaticBuildDir: 'dist/storybook',
    storybookConfigDir: '.storybook',
    apiKey: SCREENER_API_KEY,
    resolution: '1024x768',
    baseBranch,
    failureExitCode: 0,
    alwaysAcceptBaseBranch: true,
    ...(BUILD_SOURCEBRANCHNAME !== 'master' ? { commit: getCurrentHash() } : null),
    baseUrl: `${DEPLOYURL}/react-components-screener/iframe.html`,
  };
  console.log('Screener config: ' + JSON.stringify({ ...config, apiKey: '...' }, null, 2));
  return config;
}

module.exports = getConfig;
