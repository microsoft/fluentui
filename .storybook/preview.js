import 'cypress-storybook/react';
import './docs-root.css';
import '../packages/react-components/react-storybook-addon-export-to-sandbox/src/styles.css';
import { withLinks } from '@storybook/addon-links';

/** @typedef {import('../packages/react-components/react-storybook-addon-export-to-sandbox/src/public-types').ParametersExtension & import('@storybook/addons').Parameters} Parameters */

// This patches globals set up by cypress-storybook to work around its usage of the deprecated
// forceReRender API that no longer works with storyStoreV7
// https://github.com/NicholasBoll/cypress-storybook/issues/46
// https://github.com/NicholasBoll/cypress-storybook/blob/aa9bc19d66c1cd6c6e25b93cddecb1d4a7241f2f/react.js
// @ts-ignore
const realSetCurrentStory = window.__setCurrentStory;
// @ts-ignore
window.__setCurrentStory = function (categorization, story) {
  try {
    realSetCurrentStory(categorization, story);
  } catch (err) {
    // Ignore API removed errors from cypress-storybook's call to forceReRender
    // https://github.com/storybookjs/storybook/blob/208d2f930b2b72a48355367d993e65e5b01be655/lib/core-client/src/preview/start.ts#L24
    if (!(err instanceof Error && err.message.includes('was removed in storyStoreV7'))) {
      throw err;
    }
  }
};

/** @type {NonNullable<import('@storybook/react').Story['decorators']>} */
export const decorators = [withLinks];

/** @type {Parameters} */
export const parameters = {
  viewMode: 'docs',
  controls: {
    disable: true,
    expanded: true,
  },
  docs: {
    source: {
      excludeDecorators: true,
      type: 'source',
    },
  },
  exportToSandbox: {
    provider: 'stackblitz-cloud',
    bundler: 'vite',
    requiredDependencies: {
      // for React
      react: '^18',
      'react-dom': '^18',
      // necessary for FluentProvider:
      '@fluentui/react-components': '^9.0.0',
    },
    optionalDependencies: {
      '@fluentui/react-icons': 'latest',
    },
  },
};
