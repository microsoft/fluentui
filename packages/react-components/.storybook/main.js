const fs = require('fs');
const path = require('path');

const rootMain = require('../../../.storybook/main');

module.exports = /** @type {Pick<import('../../../.storybook/main').StorybookConfig,'addons'|'stories'|'webpackFinal'>} */ ({
  stories: [...rootMain.stories, '../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)', ...getVnextStories()],
  addons: [...rootMain.addons],
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };

    return localConfig;
  },
});

function getVnextStories() {
  /** @type {Record<string,unknown>} */
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../package.json`), 'utf-8'));

  const dependencies = /** @type {Record<string,string>} */ (packageJson.dependencies);

  return Object.keys(dependencies)
    .filter(pkgName => pkgName.startsWith('@fluentui/'))
    .map(pkgName => '../../' + pkgName.replace('@fluentui/', '') + '/src/**/*.stories.@(ts|tsx|mdx)');
}
