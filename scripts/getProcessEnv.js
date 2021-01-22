const getProcessValues = envNames => {
  const values = {};

  for (let envName of envNames) {
    let defaultValue = undefined;

    if (Array.isArray(envName)) {
      defaultValue = envName[1];
      envName = envName[0];
    }

    let name = `process.env.${envName}`;

    console.log(envName, process.env[envName]);

    if (process.env[envName] !== undefined) {
      values[name] = JSON.stringify(process.env[envName]);
    } else if (defaultValue !== undefined) {
      values[name] = JSON.stringify(defaultValue);
    }
  }

  return values;
};

/**
 * Gets approved environment variable values to polyfill using the DefinePlugin
 * in webpack bundles. If a variable is not defined, it will not define it in the
 * bundle; with the exception of process.env.NODE_ENV, which will always be populated.
 */
module.exports = {
  getProcessEnv() {
    return getProcessValues([
      // ensure that NODE_ENV is always populated.
      ['NODE_ENV', 'development'],
      'PERF',
      'OFFICIALRELEASE',
      'DEPLOYBASEPATH',
      'PORT',
      ['E2E_PORT', 8082],
      'PERFPORT',
      'SCREENER_API_KEY',
      'SKIP_ERRORS',
    ]);
  },
};
