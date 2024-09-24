import type { DeprecateReactComponentsPreviewPackagesOptions } from '../../../deprecate-react-components-preview-packages';

export const input: DeprecateReactComponentsPreviewPackagesOptions = {
  argv: {
    changeFilesRoot:
      'scripts/executors/src/fixtures/deprecate-react-components-preview-packages/no-change-files/change',
    token: 'npm-token',
  },
  packages: {
    'react-dialog': {
      packagePath: 'packages/react-dialog',
      packageJson: {
        name: '@fluentui/react-dialog',
        main: 'lib/index.js',
        version: '9.1.2',
      },
      projectConfig: {
        root: 'packages/react-dialog',
        name: 'react-dialog',
        tags: ['vNext'],
      },
    },
    'react-dialog-drawer': {
      packagePath: 'packages/react-dialog',
      packageJson: {
        name: '@fluentui/react-dialog',
        main: 'lib/index.js',
        version: '9.1.2',
      },
      projectConfig: {
        root: 'packages/react-dialog',
        name: 'react-dialog',
        tags: ['vNext'],
      },
    },
  },
};

export const output = {
  deprecatedPackages: [],
};
