const FluentUIReactIconsFontSubsettingPlugin = require('@fluentui/react-icons-font-subsetting-webpack-plugin').default;

const FONT_ICON_VARIANT = 'fonts';
const iconLoader = require.resolve('@fluentui/react-icons-atomic-webpack-loader');
const headlessBaseStyles = require.resolve('@fluentui/react-icons/headless/styles.css');
const headlessFontStyles = require.resolve('@fluentui/react-icons/headless/fonts/styles.css');

/**
 * @param {import('webpack').Entry} entry
 * @param {string[]} imports
 * @returns {import('webpack').Entry}
 */
function prependEntryImports(entry, imports) {
  if (typeof entry === 'string') {
    return [...imports, entry];
  }

  if (Array.isArray(entry)) {
    return [...imports, ...entry];
  }

  if (entry && typeof entry === 'object') {
    return Object.fromEntries(
      Object.entries(entry).map(([name, value]) => {
        if (typeof value === 'string' || Array.isArray(value)) {
          return [name, prependEntryImports(value, imports)];
        }

        if (value && typeof value === 'object') {
          return [name, { ...value, import: prependEntryImports(value.import ?? [], imports) }];
        }

        return [name, value];
      }),
    );
  }

  return entry;
}

/**
 * Configures atomic Fluent icon imports for Storybook.
 * Set FLUENTUI_ICON_VARIANT=fonts to use subsetted font icons; SVG atoms are the default.
 *
 * @see https://github.com/microsoft/fluentui-system-icons/blob/main/packages/react-icons-atomic-webpack-loader/README.md
 * @see https://github.com/microsoft/fluentui-system-icons/tree/main/packages/react-icons-font-subsetting-webpack-plugin
 *
 * @param {{ config: import('webpack').Configuration; headless?: boolean }} options
 */
function configureReactIcons(options) {
  const { config, headless = false } = options;
  const useFontIcons = process.env.FLUENTUI_ICON_VARIANT === FONT_ICON_VARIANT;

  config.module ??= {};
  config.module.rules ??= [];
  config.module.rules.push({
    test: /\.[mc]?[jt]sx?$/,
    enforce: 'pre',
    use: [
      {
        loader: iconLoader,
        options: {
          iconVariant: useFontIcons ? 'fonts' : 'svg',
          fallbackVariant: 'svg',
          headless,
        },
      },
    ],
  });

  if (useFontIcons) {
    config.module.rules.push({
      test: /\.(ttf|woff2?)$/,
      type: 'asset',
    });
    config.plugins ??= [];
    config.plugins.push(new FluentUIReactIconsFontSubsettingPlugin());
  }

  if (headless) {
    const styleImports = useFontIcons ? [headlessBaseStyles, headlessFontStyles] : [headlessBaseStyles];
    const originalEntry = config.entry;

    config.entry = async () => {
      const entry = typeof originalEntry === 'function' ? await originalEntry() : originalEntry;
      return prependEntryImports(entry, styleImports);
    };
  }

  return config;
}

module.exports = { configureReactIcons };
