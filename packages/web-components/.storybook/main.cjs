const path = require('node:path');
const fs = require('node:fs');

const tsConfigPath = path.resolve(__dirname, '../../../tsconfig.base.wc.json');

// Read tsconfig to get path mappings
const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8'));
const paths = tsConfig.compilerOptions?.paths || {};
const baseUrl = tsConfig.compilerOptions?.baseUrl || '.';
const baseUrlPath = path.resolve(path.dirname(tsConfigPath), baseUrl);

// Convert TypeScript path mappings to Vite aliases
/** @type {Record<string, string>} */
const alias = {};
for (const [key, value] of Object.entries(paths)) {
  const aliasKey = key.replace(/\/\*$/, '');
  const aliasValue = Array.isArray(value) ? value[0] : value;
  const aliasPath = aliasValue.replace(/\/\*$/, '');
  alias[aliasKey] = path.resolve(baseUrlPath, aliasPath);
}

module.exports =
  /** @type {import('@storybook/html-vite').StorybookConfig} */
  ({
    // helpers.stories.ts is a file that contains helper functions for stories,
    // and should not be treated as a story itself.
    stories: ['../src/**/!(helpers)*.@(stories.ts|mdx)'],
    staticDirs: ['../public'],
    core: {
      disableTelemetry: true,
    },
    framework: '@storybook/html-vite',
    addons: ['@storybook/addon-docs'],
    build: {
      previewUrl: process.env.DEPLOY_PATH,
    },
    viteFinal: async config => {
      // Configure path aliases
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        ...alias,
      };

      return config;
    },
  });
