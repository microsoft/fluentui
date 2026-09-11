const path = require('path');

const rootMain = require('../../../../../.storybook/main');
const {
  loadWorkspaceAddon,
  getImportMappingsForExportToSandboxAddon,
  processBabelLoaderOptions,
} = require('@fluentui/scripts-storybook');

const repoRoot = path.resolve(__dirname, '../../../../..');
const tsConfigPath = path.resolve(repoRoot, 'tsconfig.base.json');

/**
 * @param {string | { name?: string }} addon
 */
function isNotExportToSandboxAddon(addon) {
  const name = typeof addon === 'string' ? addon : (addon?.name ?? '');
  return !name.includes('react-storybook-addon-export-to-sandbox');
}

module.exports = /** @type {Omit<import('../../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [...rootMain.stories, '../src/**/*.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: [
    // The root-registered export-to-sandbox instance loses its options when composed from
    // a nested stories project (its babel plugin then crashes on undefined importMappings)
    // — same workaround as react-headless-components-preview: filter it out and
    // re-register locally with full options.
    ...rootMain.addons.filter(isNotExportToSandboxAddon),
    loadWorkspaceAddon('@fluentui/react-storybook-addon-export-to-sandbox', {
      tsConfigPath,
      /** @type {import('../../../react-storybook-addon-export-to-sandbox/src/index').PresetConfig} */
      options: {
        importMappings: getImportMappingsForExportToSandboxAddon(),
        babelLoaderOptionsUpdater: processBabelLoaderOptions,
        cssModules: true,
        webpackRule: {
          test: /\.stories\.tsx$/,
          include: /stories/,
        },
      },
    }),
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        // Headless VR captures trip lazy compilation's HMR reload loop (on-demand compile
        // changes the runtime hash, the fresh page can't hot-update, reloads forever), so
        // this storybook compiles everything eagerly.
        lazyCompilation: false,
      },
    },
  },
  // No local webpack tweaks: the root webpackFinal already registers the Tailwind v4 +
  // CSS Modules pipeline (rules.cssModulesRule / rules.tailwindThemeRule) that this
  // package's module.css files need.
});
