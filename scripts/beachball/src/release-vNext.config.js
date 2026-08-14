require('./register').register();

const { config: sharedConfig } = require('./shared.config');
const { getConfig } = require('./utils');

const { scope, groupConfig } = getConfig({ version: 'vNext' });

/**
 * @type {typeof sharedConfig & { scope: string[] }}
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
