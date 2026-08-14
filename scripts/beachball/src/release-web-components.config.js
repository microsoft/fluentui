require('./register').register();

const { config: sharedConfig } = require('./shared.config');
const { getConfig } = require('./utils');

const { scope } = getConfig({ version: 'web-components' });

/**
 * @type {typeof sharedConfig & { scope: string[] }}
 */
const config = {
  ...sharedConfig,
  scope,
};

module.exports = config;
