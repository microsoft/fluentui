// @ts-check

if (process.env.NODE_ENV !== 'test') {
  require('../ts-node-register');
}

const { getConfig } = require('./utils');
const { config: sharedConfig } = require('./shared.config');

const { scope } = getConfig({ version: 'v8' });

/**
 * @type {typeof sharedConfig}
 */
const config = {
  ...sharedConfig,
  scope: [...sharedConfig.scope, ...scope],
};

module.exports = config;
