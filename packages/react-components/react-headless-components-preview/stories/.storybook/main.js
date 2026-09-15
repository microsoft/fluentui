const path = require('path');

const rootMain = require('../../../../../.storybook/main');
const {
  loadWorkspaceAddon,
  getImportMappingsForExportToSandboxAddon,
  processBabelLoaderOptions,
} = require('@fluentui/scripts-storybook');
const { registerCssModuleRules } = require('./css-modules-webpack');
const headlessPackageJson = require('../../library/package.json');

const repoRoot = path.resolve(__dirname, '../../../../..');
const tsConfigPath = path.resolve(repoRoot, 'tsconfig.base.json');
const HEADLESS_PACKAGE_NAME = '@fluentui/react-headless-components-preview';

/**
 * Headless Storybook replaces the root sandbox addon with a CSS-modules-aware one, and registers
 * the playground here only (not on the shared v9 Storybook).
 *
 * @param {string | { name?: string }} addon
 */
function isNotRootSandboxOrPlaygroundAddon(addon) {
  const name = typeof addon === 'string' ? addon : addon?.name ?? '';
  return (
    !name.includes('react-storybook-addon-export-to-sandbox') && !name.includes('react-storybook-addon-playground')
  );
}

/**
 * Maps every published subpath of the headless package (plus react-icons) into the playground allowlist.
 * Skips `.` — the barrel is empty, and Storybook only has a tsconfig path for `package/*` (source),
 * not the package root (built `lib/index.js`, which CI `build-storybook` does not produce).
 *
 * @returns {Record<string, string>}
 */
function getHeadlessPlaygroundModules() {
  /** @type {Record<string, string>} */
  const modules = {
    '@fluentui/react-icons': '@fluentui/react-icons',
  };

  for (const exportPath of Object.keys(headlessPackageJson.exports ?? {})) {
    if (exportPath === '.' || exportPath === './package.json') {
      continue;
    }

    const specifier = `${HEADLESS_PACKAGE_NAME}${exportPath.slice(1)}`;
    modules[specifier] = specifier;
  }

  return modules;
}

module.exports = /** @type {Omit<import('../../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [...rootMain.stories, '../src/**/*.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: [
    ...rootMain.addons.filter(isNotRootSandboxOrPlaygroundAddon),
    loadWorkspaceAddon('@fluentui/react-storybook-addon-export-to-sandbox', {
      tsConfigPath,
      /** @type {import('../../../react-storybook-addon-export-to-sandbox/src/index').PresetConfig} */
      options: {
        importMappings: getImportMappingsForExportToSandboxAddon(),
        babelLoaderOptionsUpdater: processBabelLoaderOptions,
        cssModules: { tokensFilePath: path.resolve(__dirname, 'tokens.css') },
        webpackRule: {
          test: /\.stories\.tsx$/,
          include: /stories/,
        },
      },
    }),
    /** {@link file://./../../../react-storybook-addon-playground/package.json} */
    loadWorkspaceAddon('@fluentui/react-storybook-addon-playground', {
      tsConfigPath,
      /** @type {import('../../../react-storybook-addon-playground/src/index').PresetConfig} */
      options: {
        modules: getHeadlessPlaygroundModules(),
        setup: path.resolve(__dirname, './playground.setup.tsx'),
      },
    }),
  ],
  webpackFinal: (config, options) => {
    const localConfig = /** @type {any} */ ({ ...rootMain.webpackFinal(config, options) });

    registerCssModuleRules({ config: localConfig });

    return localConfig;
  },
});
