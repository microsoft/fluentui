import type { DeprecateReactComponentsPreviewPackagesOptions } from '../../../deprecate-react-components-preview-packages';

export const input: DeprecateReactComponentsPreviewPackagesOptions = {
  argv: {
    changeFilesRoot:
      'scripts/executors/src/fixtures/deprecate-react-components-preview-packages/with-preview-packages/change',
    token: 'npm-token',
  },
  packages: {
    // preview => stable package, published preview package should be deprecated
    'react-carousel': {
      packagePath: 'packages/react-carousel',
      packageJson: {
        name: '@fluentui/react-carousel',
        main: 'lib/index.js',
        version: '9.0.0-alpha.0',
      },
      projectConfig: {
        root: 'packages/react-carousel',
        name: 'react-carousel',
        tags: ['vNext'],
      },
    },
    // still in preview, should not be deprecated
    'react-color-picker-preview': {
      packagePath: 'packages/react-color-picker-preview',
      packageJson: {
        name: '@fluentui/react-color-picker-preview',
        main: 'lib/index.js',
        version: '0.1.2',
      },
      projectConfig: {
        root: 'packages/react-color-picker-preview',
        name: 'react-color-picker-preview',
        tags: ['vNext'],
      },
    },
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
    'react-drawer': {
      packagePath: 'packages/react-drawer',
      packageJson: {
        name: '@fluentui/react-drawer',
        main: 'lib/index.js',
        version: '9.1.2',
      },
      projectConfig: {
        root: 'packages/react-drawer',
        name: 'react-drawer',
        tags: ['vNext'],
      },
    },
  },
};

export const output = {
  packagesToDeprecate: ['@fluentui/react-carousel-preview'],
};
