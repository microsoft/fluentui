import { defineConfig } from 'cypress';
import { baseConfig } from '@fluentui/scripts-cypress';

/**
 * Extends the base cypress webpack config to add the babel preset
 * to be tested
 */
const webpackConfigWithBabelPreset = () => {
  const baseWebpackConfig = baseConfig.component.devServer.webpackConfig;
  baseWebpackConfig.module?.rules?.unshift({
    test: /\.(ts|tsx)$/,
    loader: 'babel-loader',
    include: [/fake_node_modules\/context-*/],
    options: {
      presets: ['@fluentui/babel-preset-global-context'],
    },
  });
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
