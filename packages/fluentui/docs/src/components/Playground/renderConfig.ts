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

const getPackageVersion = (packageName: string, latestVersion: string) => {
  // CI build tarballs from `npm pack` and publish them nightly to blob storage for fluent ui packages
  // When building nightly release docsite, use these urls instead of the latest package version
  if (process.env.NIGHTLYRELEASEDATE) {
    return `https://fluentsite.blob.core.windows.net/nightly-builds/${process.env.NIGHTLYRELEASEDATE}/fluentui-${packageName}-0.0.0-nightly.tgz`;
  }
  return latestVersion;
};

export const imports: Record<string, CodeSandboxImport> = {
  '@fluentui/accessibility': {
    version: getPackageVersion('accessibility', accessibilityPackageJson.version),
    module: Accessibility,
    required: false,
  },
  '@fluentui/code-sandbox': {
    version: getPackageVersion('code-sandbox', sandboxPackageJson.version),
    module: CodeSandbox,
    required: true,
  },
  '@fluentui/docs-components': {
    version: getPackageVersion('docs-components', docsComponentsPackageJson.version),
    module: DocsComponent,
    required: true,
  },
  '@fluentui/react-icons-northstar': {
    version: getPackageVersion('react-icons-northstar', projectPackageJson.version),
    module: FluentUIIcons,
    required: false,
  },
  '@fluentui/react-northstar': {
    version: getPackageVersion('react-northstar', projectPackageJson.version),
    module: FluentUI,
    required: true,
  },
  '@fluentui/react-bindings': {
    version: getPackageVersion('react-bindings', projectPackageJson.dependencies['@fluentui/react-bindings']),
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
