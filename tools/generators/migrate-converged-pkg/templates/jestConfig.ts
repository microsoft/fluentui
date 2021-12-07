import { stripIndents } from '@nrwl/devkit';

export const jestConfig = (options: {
  pkgName: string;
  addSnapshotSerializers: boolean;
  testSetupFilePath: string;
}) => stripIndents`
   // @ts-check

   /**
   * @type {jest.InitialOptions}
   */
   module.exports = {
     displayName: '${options.pkgName}',
     preset: '../../jest.preset.js',
     globals: {
       'ts-jest': {
         tsConfig: '<rootDir>/tsconfig.spec.json',
         diagnostics: false,
       },
     },
     transform: {
       '^.+\\.tsx?$': 'ts-jest',
     },
     coverageDirectory: './coverage',
     setupFilesAfterEnv: ['${options.testSetupFilePath}'],
     ${options.addSnapshotSerializers ? `snapshotSerializers: ['@fluentui/jest-serializer-make-styles'],` : ''}
   };
`;
