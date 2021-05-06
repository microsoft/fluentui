const fs = require('fs');
const path = require('path');
const rootMain = require('../../../.storybook/main');

const babelConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.babelrc.json'), 'utf-8'));

module.exports = /** @type {Pick<import('../../../.storybook/main').StorybookConfig,'addons'|'stories'|'webpackFinal' |'babel'>} */ ({
  stories: [...rootMain.stories, '../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [...rootMain.addons],
  babel: async config => {
    if (config.plugins) {
      config.plugins.push(...babelConfig.plugins);
    }

    console.log({ babelConfig }, config);

    return { ...config };
  },
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };

    return localConfig;
  },
});
