require('./register').register();

const { config: sharedConfig } = require('./shared.config');

/**
 * @type {typeof sharedConfig}
 */
const config = {
  ...sharedConfig,
  scope: ['packages/react-components/react-headless-components-preview/library'],
};

module.exports = config;
