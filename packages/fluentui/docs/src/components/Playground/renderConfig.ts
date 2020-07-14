import * as Accessibility from '@fluentui/accessibility';
import * as CodeSandbox from '@fluentui/code-sandbox';
import * as Bindings from '@fluentui/react-bindings';
import * as DocsComponent from '@fluentui/docs-components';
import * as FluentUI from '@fluentui/react-northstar';
import * as FluentUIIcons from '@fluentui/react-icons-northstar';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Classnames from 'classnames';

const accessibilityPackageJson = require('@fluentui/accessibility/package.json');
const docsComponentsPackageJson = require('@fluentui/docs-components/package.json');
const projectPackageJson = require('@fluentui/react-northstar/package.json');
const sandboxPackageJson = require('@fluentui/code-sandbox/package.json');

export const babelConfig = {
  plugins: [
    'proposal-class-properties',
    'proposal-object-rest-spread',
    ['transform-typescript', { isTSX: true }],
    'transform-classes',
  ],
  presets: ['es2015'],
};

type CodeSandboxImport = {
  module: any;
  version: string;
  required: boolean;
};

export const imports: Record<string, CodeSandboxImport> = {
  '@fluentui/accessibility': {
    version: accessibilityPackageJson.version,
    module: Accessibility,
    required: false,
  },
  '@fluentui/code-sandbox': {
    version: sandboxPackageJson.version,
    module: CodeSandbox,
    required: true,
  },
  '@fluentui/docs-components': {
    version: docsComponentsPackageJson.version,
    module: DocsComponent,
    required: true,
  },
  '@fluentui/react-icons-northstar': {
    version: projectPackageJson.version,
    module: FluentUIIcons,
    required: false,
  },
  '@fluentui/react-northstar': {
    version: projectPackageJson.version,
    module: FluentUI,
    required: true,
  },
  '@fluentui/react-bindings': {
    version: projectPackageJson.dependencies['@fluentui/react-bindings'],
    module: Bindings,
    required: false,
  },
  classnames: {
    version: projectPackageJson.dependencies['classnames'],
    module: Classnames,
    required: false,
  },
  lodash: {
    version: projectPackageJson.dependencies['lodash'],
    module: _,
    required: false,
  },
  react: {
    version: projectPackageJson.peerDependencies['react'],
    module: React,
    required: true,
  },
  'react-dom': {
    version: projectPackageJson.peerDependencies['react-dom'],
    module: ReactDOM,
    required: true,
  },
  prettier: {
    version: docsComponentsPackageJson.peerDependencies['prettier'],
    module: null, // no need to use it in our examples
    required: true,
  },
};

export const importResolver = importName => {
  if (imports[importName]) {
    return imports[importName].module;
  }

  throw new Error(`Module '${importName}' was not found. Please check renderConfig.ts`);
};
