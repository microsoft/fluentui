/** @type {import('../../../../../.storybook/main') & { presets?: import('storybook/internal/types').Preset[] }} */
const rootMain = require('../../../../../.storybook/main');

const exportToSandboxAddon = rootMain.addons.find(
  addon => typeof addon !== 'string' && addon.name.includes('react-storybook-addon-export-to-sandbox'),
);

if (!exportToSandboxAddon || typeof exportToSandboxAddon === 'string') {
  throw new Error('Expected the root Storybook config to register the export-to-sandbox addon with options.');
}

const rootFramework = rootMain.framework;
if (!rootFramework || typeof rootFramework !== 'object') {
  throw new Error('Expected the root Storybook framework config to include options.');
}

module.exports = /** @type {Omit<import('../../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  framework: {
    ...rootFramework,
    options: { ...rootFramework.options, builder: { lazyCompilation: false } },
  },
  stories: [...rootMain.stories, '../src/**/*.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: rootMain.addons.filter(addon => addon !== exportToSandboxAddon),
  // Keep the addon's slash-only options lookup working on Windows. The addons resolver restores backslashes;
  // registering it directly as a preset preserves the normalized name and all inherited options.
  presets: [
    ...(rootMain.presets || []),
    { ...exportToSandboxAddon, name: exportToSandboxAddon.name.replace(/\\/g, '/') },
  ],
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };

    // add your own webpack tweaks if needed

    return localConfig;
  },
});
