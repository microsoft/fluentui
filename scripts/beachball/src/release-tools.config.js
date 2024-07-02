require('./register').register();

const { config: sharedConfig } = require('./shared.config');
const { getConfig } = require('./utils');

const { scope } = getConfig({ version: 'tools' });

/**
 * @type {typeof sharedConfig}
 */
const config = {
  ...sharedConfig,
  scope: [...sharedConfig.scope, ...scope],
};

module.exports = config;
