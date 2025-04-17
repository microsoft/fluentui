import * as path from 'path';
import { baseConfig } from '@fluentui/scripts-cypress';

const excludedSpecs = [
  '!' + path.resolve('../../packages/react-components/*-compat/src/**/*.cy.{tsx,ts}'),
  '!' + path.resolve('../../packages/react-components/*-migration-*/src/**/*.cy.{tsx,ts}'),
];

// Include all tests from this app and the components package
const specs = [
  path.resolve('../../packages/react-components/**/library/src/**/*.cy.{tsx,ts}'),
  path.resolve('../../packages/react-components/react-tabster/src/**/*.cy.{tsx,ts}'),
  ...excludedSpecs,
];
const config = { ...baseConfig };

config.component.specPattern = specs;
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

/**
 * Resolve the support file and index.html file paths
 * This is a workaround for the issue where Cypress does not resolve the paths correctly, as it
 * internally prepend the __dirname, making them invalid.
 *
 * TODO: Remove this workaround once we upgrade the whole repo to Cypress 14
 */
config.component.supportFile = path.normalize('../../scripts/cypress/src/support/component.js');
config.component.indexHtmlFile = path.normalize('../../scripts/cypress/src/support/component-index.html');

export default config;
