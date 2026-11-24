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
      },
    }),
  ],
  webpackFinal: config => {
    registerRules({ config, rules: [rules.swcRule] });
    registerTsPaths({ config, configFile: tsConfigPath });

    if ((process.env.CI || process.env.TF_BUILD) && config.plugins) {
      // Disable ProgressPlugin in PR/CI builds to reduce log verbosity (warnings and errors are still logged)
      config.plugins = config.plugins.filter(value => value && value.constructor.name !== 'ProgressPlugin');
    }
    config.resolve = config.resolve ?? {};
    // Workspace imports resolve to TypeScript source; built packages use explicit .styles.js imports.
    config.resolve.extensions = ['.css.ts', '.styles.css.js', ...(config.resolve.extensions ?? [])];
    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
      '.styles.js': ['.styles.css.js', '.styles.js'],
    };

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
