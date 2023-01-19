const rootMain = require('../../../.storybook/main');

module.exports = /** @type {Omit<import('../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: ['../src/**/*.stories.mdx'],
});
