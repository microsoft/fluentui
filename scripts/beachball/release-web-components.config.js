if (process.env.NODE_ENV !== 'test') {
  require('../ts-node-register');
}

const { getConfig } = require('./utils');
const { config: sharedConfig } = require('./shared.config');

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
