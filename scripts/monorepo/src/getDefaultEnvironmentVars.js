/**
 * This file contains the default environment variable settings to be used in webpack
 * DefinePlugin. We use this list to pull values from enviornment variables, provide
 * defaults if they don't exist, and in "forced production" build scenarios, ignore
 * the environment variables to ensure NODE_ENV is set to production.
 */

/**
 * Helper which resolves a specific set of environment variable values. If not present,
 * the provided default values will be returned.
 *
 * @param {Record<string,string>} options - A object where the keys are the environment variables to read,
 * and their values represent the default value to use if the variable is not present.
 */
const getVariables = options => {
  /** @type {Record<string,string>} */
  const variables = {};

  for (const key of Object.keys(options)) {
    const envValue = process.env[key];

    variables[`process.env.${key}`] = JSON.stringify(envValue !== undefined ? envValue : options[key]);
  }

  return variables;
};

/**
 * Function which returns DefinePlugin options for a specific set of environment variables.
 * This is needed because Webpack 5 no longer automatically resolves process.env values.
 *
 * @param {boolean} [isProduction] - If true will ensure NODE_ENV is 'production', even
 * if environment variables specify otherwise.
 * @param {Record<string,string>} [otherValues] - Other values to include in the environment. Key is the
 * environment variable name and value is the non-stringified value.
 */
const getDefaultEnvironmentVars = (isProduction, otherValues) => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : process.env.NODE_ENV || 'development'),
  ...(otherValues && getVariables(otherValues)),
});

exports.getDefaultEnvironmentVars = getDefaultEnvironmentVars;
