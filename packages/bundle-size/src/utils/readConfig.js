const findUp = require('find-up');

/**
 * @typedef {{
 *  webpack(config: import("webpack").Configuration): import("webpack").Configuration
 * }} Config
 */

/** @type {Config} */
const defaultConfig = {
  webpack: config => config,
};

const CONFIG_FILE_NAME = 'bundle-size.config.js';

/** @type {Config | undefined} */
let cache;

/**
 * @returns {Promise<Config>}
 *
 * @param {boolean=} quiet
 */
async function readConfig(quiet) {
  // don't use the cache in tests
  if (cache && process.env.NODE_ENV !== 'test') {
    return cache;
  }

  const configPath = await findUp(CONFIG_FILE_NAME, { cwd: process.cwd() });

  if (!configPath) {
    if (!quiet) {
      console.log(`no config file found: ${configPath}\n -> fallback to default config`);
    }
    cache = defaultConfig;
    return cache;
  }

  if (!quiet) {
    console.log(`using config: ${configPath}`);
  }

  cache = /** @type {Config}*/ (require(configPath));
  return cache;
}

module.exports = readConfig;
