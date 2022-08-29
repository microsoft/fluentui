import { defineConfig } from 'cypress';
import { Configuration } from 'webpack';
import baseConfig from '@fluentui/scripts/cypress/cypress.config';

/**
 * Extends the base cypress webpack config to add the babel preset
 * to be tested
 */
const webpackConfigWithBabelPreset = () => {
  const baseDevServerConfig = baseConfig.component?.devServer;
  if (typeof baseDevServerConfig === 'object' && baseDevServerConfig.bundler === 'webpack') {
    const baseWebpackConfig = baseDevServerConfig.webpackConfig as Configuration;

    baseWebpackConfig.module?.rules?.unshift({
      test: /\.(ts|tsx)$/,
      loader: 'babel-loader',
      include: [/fake_node_modules\/context-*/],
      options: {
        presets: ['@fluentui/babel-preset-global-context'],
      },
    });
  }
};

defineConfig({
  ...baseConfig,
  component: {
    ...baseConfig.component,
    devServer: {
      bundler: 'webpack',
      framework: 'react',
      webpackConfig: webpackConfigWithBabelPreset(),
    },
  },
});
export default baseConfig;
