const path = require('path');
const fs = require('fs');
// ESM import workaround for CJS modules
const remarkGfm = require('remark-gfm').default;

const {
  loadWorkspaceAddon,
  registerTsPaths,
  registerRules,
  rules,
  processBabelLoaderOptions,
  getImportMappingsForExportToSandboxAddon,
} = require('@fluentui/scripts-storybook');

const tsConfigPath = path.resolve(__dirname, '../tsconfig.base.json');

const previewHeadTemplate = fs.readFileSync(path.resolve(__dirname, 'preview-head-template.html'), 'utf8');

module.exports = /** @type {import('./types').StorybookConfig} */ ({
  stories: [],
  addons: [
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            // Enable GitHub Flavored Markdown support in MDX files
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-links',

    // internal monorepo custom addons
    /**  {@link file://./../packages/react-components/react-storybook-addon/package.json} */
    loadWorkspaceAddon('@fluentui/react-storybook-addon', { tsConfigPath }),
    /** {@link file://./../packages/react-components/react-storybook-addon-export-to-sandbox/package.json} */
    loadWorkspaceAddon('@fluentui/react-storybook-addon-export-to-sandbox', {
      tsConfigPath,
      /** @type {import('../packages/react-components/react-storybook-addon-export-to-sandbox/src/index').PresetConfig} */
      options: {
        importMappings: getImportMappingsForExportToSandboxAddon(),
        babelLoaderOptionsUpdater: processBabelLoaderOptions,
        webpackRule: {
          test: /\.stories\.tsx$/,
          include: /stories/,
        },
        /**
         * windmod-preview stories import `*.module.css`; without this the sandbox export
         * drops those imports and every exported story opens unstyled.
         */
        cssModules: true,
      },
    }),
  ],
  webpackFinal: config => {
    /**
     * Narrow storybook's own implicit `/\.css$/` rule FIRST, then add ours — webpack applies
     * every matching rule, so the builder's plain style-loader/css-loader pair has to stop
     * matching `*.module.css` (it would hand back an empty class map) and the Tailwind theme
     * entry (it would emit `@import … source(none)` verbatim) before these are registered.
     *
     * windmod-preview `*.module.css` files open with `@reference '#theme'` and use `@apply`,
     * which are not valid CSS until Tailwind's PostCSS pass has run. Without this wiring
     * this storybook — and the package storybooks and docsites that compose it — render
     * windmod components unstyled.
     */
    rules.excludeTailwindCssFromDefaultCssRule(config);
    registerRules({ config, rules: [rules.swcRule, rules.cssModulesRule, rules.tailwindThemeRule] });
    registerTsPaths({ config, configFile: tsConfigPath });

    if ((process.env.CI || process.env.TF_BUILD) && config.plugins) {
      // Disable ProgressPlugin in PR/CI builds to reduce log verbosity (warnings and errors are still logged)
      config.plugins = config.plugins.filter(value => value && value.constructor.name !== 'ProgressPlugin');
    }

    return config;
  },
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        lazyCompilation: true,
      },
    },
  },
  /**
   * Programmatically enhance previewHead as inheriting just static file `preview-head.html` doesn't work in monorepo
   * @see https://storybook.js.org/docs/addons/writing-presets#ui-configuration
   */
  previewHead: head => head + previewHeadTemplate,

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
});
