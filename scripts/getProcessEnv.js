const getProcessValues = envNames => {
  const values = {};

  for (const envName of envNames) {
    if (process.env[envName] !== undefined) {
      values[`process.env.${envName}`] = process.env[envName];
    }
  }

  return values;
};

/**
 * Gets approved environment variable values to polyfill using the DefinePlugin
 * in webpack bundles.
 */
module.exports = {
  getProcessEnv: function getProcessEnv() {
    return getProcessValues([
      'NODE_ENV',
      'PERF',
      'OFFICIALRELEASE',
      'DEPLOYBASEPATH',
      'PORT',
      'PERFPORT',
      'SCREENER_API_KEY',
      'SKIP_ERRORS',
    ]);
  },
};
