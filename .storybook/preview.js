import { withFluentProvider, withStrictMode } from '@fluentui/react-storybook';
import 'cypress-storybook/react';
import * as dedent from 'dedent';
import './docs-root.css';

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
  } catch (e) {
    // Ignore API removed errors from cypress-storybook's call to forceReRender
    // https://github.com/storybookjs/storybook/blob/208d2f930b2b72a48355367d993e65e5b01be655/lib/core-client/src/preview/start.ts#L24
    if (!(typeof e.message === 'string' && e.message.includes('was removed in storyStoreV7'))) {
      throw e;
    }
  }
};

/** @type {NonNullable<import('@storybook/react').Story['decorators']>} */
export const decorators = [withFluentProvider, withStrictMode];

/** @type {import('@storybook/react').Parameters} */
export const parameters = {
  viewMode: 'docs',
  controls: {
    disable: true,
    expanded: true,
  },
  docs: {
    source: {
      excludeDecorators: true,
    },
  },
  exportToCodeSandbox: {
    requiredDependencies: {
      'react-dom': 'latest', // for React
      'react-scripts': 'latest', // necessary when using typescript in CodeSandbox
      '@fluentui/react-components': 'rc', // necessary for FluentProvider
      '@fluentui/react-icons': 'beta',
    },
    indexTsx: dedent`
          import * as ReactDOM from 'react-dom';
          import { FluentProvider, webLightTheme } from '@fluentui/react-components';
          import { STORY_NAME as Example } from './example';
          //
          // You can edit this example in "example.tsx".
          //
          ReactDOM.render(
              <FluentProvider theme={webLightTheme}>
                  <Example />
              </FluentProvider>,
              document.getElementById('root'),
          );`,
  },
};
