const path = require('path');
const { getPackageStoriesGlob, registerTsPaths, rules, registerRules } = require('@fluentui/scripts-storybook');

const rootMain = require('../../../.storybook/main');

const tsConfigAllPath = path.join(__dirname, '../../../tsconfig.base.all.json');

module.exports = /** @type {Omit<import('../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [
    ...rootMain.stories,
    '../src/**/*.stories.mdx',
    '../src/**/index.stories.@(ts|tsx)',
    ...getPackageStoriesGlob({ packageName: '@fluentui/react-components', callerPath: __dirname }),
    ...getPackageStoriesGlob({
      packageName: '@fluentui/public-docsite-v9',
      callerPath: __dirname,
      excludeStoriesInsertionFromPackages: [
        '@fluentui/react-storybook-addon',
        '@fluentui/theme-designer',
        // Exclude non v9 stories
        '@fluentui/react',
        // Exclude the package as we are including only the `Nav` component stories from the package below.
        '@fluentui/react-nav',
      ],
    }),
    // This is a workaround to include only the Nav component stories from react-nav package
    // as the package has a lot of broken stories that are causing the build to fail.
    //
    // TODO: Remove this workaround once the stories are fixed or we have a better way to
    // decide which stories to include/exclude in docs mode.
    '../../../packages/react-components/react-nav/stories/src/Nav/index.stories.@(ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: [...rootMain.addons],
  build: {
    previewUrl: process.env.DEPLOY_PATH,
  },
  webpackFinal: (config, options) => {
    const localConfig = /** @type config */ ({ ...rootMain.webpackFinal?.(config, options) });

    // add your own webpack tweaks if needed
    registerTsPaths({ configFile: tsConfigAllPath, config: localConfig });
    registerRules({ rules: [rules.scssRule], config: localConfig });

    return localConfig;
  },
  refs: {
    contrib: {
      title: 'Contributors Packages',
      url: 'https://microsoft.github.io/fluentui-contrib/docsite/',
      expanded: false,
      sourceUrl: 'https://github.com/microsoft/fluentui-contrib',
    },
    charts: {
      title: 'Charts v9',
      // Workaround to enable docsite using PR workflow till master workflow is enabled
      url: 'https://fluentuipr.z22.web.core.windows.net/pull/33270/chart-docsite/storybook',
      expanded: false,
      sourceUrl: 'https://github.com/microsoft/fluentui/charts/react-charts',
    },
  },
});
