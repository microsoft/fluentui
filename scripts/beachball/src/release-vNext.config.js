require('./register').register();

const { config: sharedConfig } = require('./shared.config');
const { getConfig } = require('./utils');

const { scope, groupConfig } = getConfig({ version: 'vNext' });

/**
 * @type {import('./shared.config').ScopedConfig}
 */
const config = {
  ...sharedConfig,
  scope,
  changelog: {
    ...sharedConfig.changelog,
    groups: [groupConfig],
  },
};

module.exports = config;
