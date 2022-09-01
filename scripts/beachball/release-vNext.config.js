if (process.env.NODE_ENV !== 'test') {
  require('../ts-node-register');
}

const { getConfig } = require('./utils');
const { config: sharedConfig } = require('./shared.config');

const { scope, groupConfig } = getConfig({ version: 'vNext' });

/**
 * @type {typeof sharedConfig}
 */
const config = {
  ...sharedConfig,
  scope: [...sharedConfig.scope, ...scope],
  changelog: {
    ...sharedConfig.changelog,
    groups: [groupConfig],
  },
};

module.exports = config;
