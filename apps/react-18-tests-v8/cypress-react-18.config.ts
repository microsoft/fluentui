import * as path from 'path';
import { baseWebpackConfig } from '@fluentui/scripts-cypress';
import baseConfig from './cypress.config';
import { createStorybookWebpackConfig } from '@fluentui/scripts-webpack';

// Include all tests from this app and the components package
const specs = [path.resolve('src/**/*.cy.{tsx,ts}'), path.resolve('../../packages/react-examples/**/*.e2e.{tsx,ts}')];

const config = { ...baseConfig };

config.component.specPattern = specs;
config.component.devServer.webpackConfig = createStorybookWebpackConfig(baseWebpackConfig);
config.component.devServer.webpackConfig.resolve ??= {};
config.component.devServer.webpackConfig.resolve.alias = {
  ...config.component.devServer.webpackConfig.resolve.alias,
};

export default config;
