const rootMain = require('../../../../.storybook/main');

module.exports = /** @type {Omit<import('../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  /**
   * `../src/**`, not `../stories/**`: this package has no `stories/` directory and never had one
   * (specials-triage seam #4). Its content lives under `src/recipes/**`, which is exactly where
   * the public docsite already picks it up from — `getPackageStoriesGlob` falls through to
   * `<pkgRoot>/src/**` for a package with neither a `<name>-stories` sibling project nor a
   * `stories/` folder (scripts/storybook/src/utils.js). Until this line was fixed the package's
   * own storybook rendered nothing while the docsite rendered `Concepts/Recipes/Media Object`,
   * so there was no local way to see the page this package ships.
   */
  stories: [...rootMain.stories, '../src/**/*.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: [...rootMain.addons],
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };

    // add your own webpack tweaks if needed

    return localConfig;
  },
});
