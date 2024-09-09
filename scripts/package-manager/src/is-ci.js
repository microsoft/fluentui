function isCI() {
  return checkEnvVar('CI') || checkEnvVar('TF_BUILD') || checkEnvVar('GITHUB_ACTIONS');
}

/**
 *
 * @param {string} varName
 */
function checkEnvVar(varName) {
  return Boolean(process.env[varName] && process.env[varName] !== 'false');
}

exports.isCI = isCI;
