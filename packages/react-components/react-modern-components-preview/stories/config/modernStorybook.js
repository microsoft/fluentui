const path = require('path');

const storyPackageNames = [
  'react-accordion',
  'react-avatar',
  'react-badge',
  'react-breadcrumb',
  'react-button',
  'react-card',
  'react-checkbox',
  'react-color-picker',
  'react-combobox',
  'react-dialog',
  'react-divider',
  'react-drawer',
  'react-field',
  'react-image',
  'react-infolabel',
  'react-input',
  'react-label',
  'react-link',
  'react-menu',
  'react-message-bar',
  'react-nav',
  'react-overflow',
  'react-persona',
  'react-popover',
  'react-progress',
  'react-radio',
  'react-rating',
  'react-search',
  'react-select',
  'react-skeleton',
  'react-slider',
  'react-spinbutton',
  'react-spinner',
  'react-swatch-picker',
  'react-switch',
  'react-tabs',
  'react-tag-picker',
  'react-tags',
  'react-teaching-popover',
  'react-textarea',
  'react-toast',
  'react-toolbar',
  'react-tooltip',
];

const reactComponentsRoot = path.resolve(__dirname, '../../..');
const exportToSandboxAddonPattern = /react-storybook-addon-export-to-sandbox/;
const modernImportPluginPath = path.resolve(__dirname, 'babelPluginRewriteModernImports.js');
const storySourceDirectories = storyPackageNames.map(packageName =>
  path.join(reactComponentsRoot, packageName, 'stories/src'),
);

/**
 * @typedef {import('@babel/core').TransformOptions} BabelTransformOptions
 * @typedef {{
 *   name: string;
 *   options?: Record<string, unknown> & {
 *     babelLoaderOptionsUpdater?: (options: BabelTransformOptions) => BabelTransformOptions;
 *   };
 * }} StorybookAddonConfig
 */

/**
 * @param {(string | StorybookAddonConfig)[]} addons
 */
function registerModernFullSourceTransform(addons) {
  return addons.map(addon => {
    if (typeof addon === 'string' || !exportToSandboxAddonPattern.test(addon.name)) {
      return addon;
    }

    const originalOptionsUpdater = addon.options?.babelLoaderOptionsUpdater ?? (options => options);
    /** @param {BabelTransformOptions} options */
    const babelLoaderOptionsUpdater = options => {
      const updatedOptions = originalOptionsUpdater(options);

      return {
        ...updatedOptions,
        plugins: [...(updatedOptions.plugins ?? []), [modernImportPluginPath, { fullSource: true }]],
      };
    };

    return {
      ...addon,
      options: {
        ...addon.options,
        babelLoaderOptionsUpdater,
      },
    };
  });
}

/**
 * @param {import('webpack').Configuration} config
 * @param {string | string[]} include
 */
function registerModernComponentImportTransform(config, include) {
  config.module = config.module ?? {};
  config.module.rules = config.module.rules ?? [];
  config.module.rules.push({
    test: /\.[jt]sx?$/,
    include,
    exclude: /node_modules/,
    enforce: 'pre',
    use: {
      loader: require.resolve('babel-loader'),
      options: {
        babelrc: false,
        configFile: false,
        parserOpts: {
          plugins: ['jsx', 'typescript'],
        },
        plugins: [modernImportPluginPath],
      },
    },
  });

  return config;
}

module.exports = {
  registerModernComponentImportTransform,
  registerModernFullSourceTransform,
  storySourceDirectories,
};
