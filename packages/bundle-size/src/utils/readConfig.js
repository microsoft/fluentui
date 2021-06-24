const path = require('path');
const fs = require('fs').promises;

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
  const configPath = path.resolve(process.cwd(), CONFIG_FILE_NAME);

  if (cache) {
    return cache;
  }

  try {
    await fs.access(configPath);
  } catch {
    console.log(`no config file found: ${configPath}\nuse default config`);
    cache = defaultConfig;
    return cache;
  }

  console.log(`using config: ${configPath}`);

  cache = /** @type {Config}*/ (require(configPath));
  return cache;
}

module.exports = readConfig;
