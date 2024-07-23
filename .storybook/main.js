const path = require('path');
const fs = require('fs');

const {
  loadWorkspaceAddon,
  registerTsPaths,
  processBabelLoaderOptions,
  getImportMappingsForExportToSandboxAddon,
} = require('@fluentui/scripts-storybook');

const tsConfigPath = path.resolve(__dirname, '../tsconfig.base.json');

/**
 * @typedef {import('./types').StorybookConfig} StorybookBaseConfig
 *
 * @typedef {import('./types').StorybookExtraConfig} StorybookExtraConfig
 *
 * @typedef {import('./types').StorybookConfig} StorybookConfig
 */

const previewHeadTemplate = fs.readFileSync(path.resolve(__dirname, 'preview-head-template.html'), 'utf8');

module.exports = /** @type {Omit<StorybookConfig,'typescript'|'babel'>} */ ({
  features: {
    // Enables code splitting
    storyStoreV7: true,
  },
  stories: [],
  addons: [
    {
      name: 'storybook-addon-swc',
      options: /** @type {import('storybook-addon-swc').StoryBookAddonSwcOptions} */ ({
        swcLoaderOptions: {
          jsc: {
            target: 'es2019',
            parser: {
              syntax: 'typescript',
              tsx: true,
              decorators: true,
              dynamicImport: true,
            },
            transform: {
              decoratorMetadata: true,
              legacyDecorator: true,
            },
            keepClassNames: true,
            externalHelpers: true,
            loose: true,
          },
        },
        swcMinifyOptions: { mangle: false },
      }),
    },
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-knobs/preset',
    'storybook-addon-performance',

    // external custom addons

    // internal monorepo custom addons

    /**  {@link file://./../packages/react-components/react-storybook-addon/package.json} */
    loadWorkspaceAddon('@fluentui/react-storybook-addon', { tsConfigPath }),
    /** {@link file://./../packages/react-components/react-storybook-addon-export-to-sandbox/package.json} */
    loadWorkspaceAddon('@fluentui/react-storybook-addon-export-to-sandbox', {
      tsConfigPath,
      /** @type {import('../packages/react-components/react-storybook-addon-export-to-sandbox/src/public-types').PresetConfig} */
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
    registerTsPaths({ config, configFile: tsConfigPath });

    if ((process.env.CI || process.env.TF_BUILD || process.env.LAGE_PACKAGE_NAME) && config.plugins) {
      // Disable ProgressPlugin in PR/CI builds to reduce log verbosity (warnings and errors are still logged)
      config.plugins = config.plugins.filter(value => value && value.constructor.name !== 'ProgressPlugin');
    }

    return config;
  },
  core: {
    builder: 'webpack5',
    lazyCompilation: true,
    disableTelemetry: true,
  },
  /**
   * Programmatically enhance previewHead as inheriting just static file `preview-head.html` doesn't work in monorepo
   * @see https://storybook.js.org/docs/addons/writing-presets#ui-configuration
   */
  previewHead: head => head + previewHeadTemplate,
});
