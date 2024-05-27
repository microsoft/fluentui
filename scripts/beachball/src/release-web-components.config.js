require('./register').register();

const { config: sharedConfig } = require('./shared.config');
const { getConfig } = require('./utils');

const { scope } = getConfig({ version: 'web-components' });

/**
 * @type {typeof sharedConfig}
 */
const config = {
  ...sharedConfig,
  scope: [...sharedConfig.scope, ...scope],
  changelog: {
    ...sharedConfig.changelog,
  },
};

module.exports = config;
