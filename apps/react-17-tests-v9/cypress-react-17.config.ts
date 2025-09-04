import * as path from 'path';
import baseConfig from './cypress.config';

const excludedSpecs = [
  '!' + path.resolve('../../packages/react-components/*-compat/src/**/*.cy.{tsx,ts}'),
  '!' + path.resolve('../../packages/react-components/*-migration-*/src/**/*.cy.{tsx,ts}'),
];

// Include all tests from this app and the components package
const specs = [
  path.resolve('./src/**/*.cy.{tsx,ts}'),
  path.resolve('../../packages/react-components/**/library/src/**/*.cy.{tsx,ts}'),
  path.resolve('../../packages/react-components/react-tabster/src/**/*.cy.{tsx,ts}'),
  ...excludedSpecs,
];
const config = { ...baseConfig };

config.component.specPattern = specs;

export default config;
