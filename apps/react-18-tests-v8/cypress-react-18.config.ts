import * as path from 'path';
import { baseConfig, baseWebpackConfig } from '@fluentui/scripts-cypress';
import { createStorybookWebpackConfig } from '@fluentui/scripts-webpack';

// Include all tests from this app and the components package
const specs = [path.resolve('src/**/*.cy.{tsx,ts}'), path.resolve('../../packages/react-examples/**/*.e2e.{tsx,ts}')];

const config = { ...baseConfig };

config.component.specPattern = specs;
config.component.devServer.webpackConfig = createStorybookWebpackConfig(baseWebpackConfig);
config.component.devServer.webpackConfig.resolve ??= {};
config.component.devServer.webpackConfig.resolve.alias = {
  ...config.component.devServer.webpackConfig.resolve.alias,
  '@cypress/react': path.resolve(__dirname, './node_modules/@cypress/react'),
  '@types/react': path.resolve(__dirname, './node_modules/@types/react'),
  '@types/react-dom': path.resolve(__dirname, './node_modules/@types/react-dom'),
  react: path.resolve(__dirname, './node_modules/react'),
  'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
  'cypress-real-events': path.resolve(__dirname, './node_modules/cypress-real-events'),
};

export default config;
