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
 */
async function readConfig() {
  if (cache) {
    return cache;
  }

  const configPath = await findUp(CONFIG_FILE_NAME);

  if (!configPath) {
    console.log(`no config file found: ${configPath}\nuse default config`);
    cache = defaultConfig;
    return cache;
  }

  console.log(`using config: ${configPath}`);

  cache = /** @type {Config}*/ (require(configPath));
  return cache;
}

module.exports = readConfig;
