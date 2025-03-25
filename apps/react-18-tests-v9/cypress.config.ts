import * as path from 'path';
import { baseConfig } from '@fluentui/scripts-cypress';

// Exclude files that are not compatible with React 18 yet
const excludedSpecs = [
  '!' + path.resolve('../../packages/react-components/react-overflow/library/src/**/*.cy.{tsx,ts}'),
  '!' + path.resolve('../../packages/react-components/react-tag-picker/library/src/**/*.cy.{tsx,ts}'),
  '!' + path.resolve('../../packages/react-components/react-toolbar/library/src/**/*.cy.{tsx,ts}'),
];

// Include all tests from this app and the components package
const includedSpecs = [
  path.resolve('../../apps/react-18-tests-v9/src/**/*.cy.{tsx,ts}'),
  path.resolve('../../packages/react-components/**/library/src/**/*.cy.{tsx,ts}'),
];

const specs = [...includedSpecs, ...excludedSpecs];
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
};

export default config;
