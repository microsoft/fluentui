import 'cypress-storybook/react';
import * as dedent from 'dedent';
import './docs-root.css';
import { withLinks } from '@storybook/addon-links';

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

/** @type {import('@storybook/addons').Parameters} */
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
    // This config reuses sources generated for CodeSandbox export feature
    // (@fluentui/babel-preset-storybook-full-source).
    transformSource: (snippet, story) => story.parameters.fullSource,
  },
  exportToCodeSandbox: {
    requiredDependencies: {
      // for React
      react: '^17',
      'react-dom': '^17',
      // necessary when using typescript in CodeSandbox
      'react-scripts': 'latest',
      // pin @swc/helper - it uses dependency alias in 0.4.36 and it is not supported by CodeSandbox
      '@swc/helpers': '0.4.14',
    },
    optionalDependencies: {
      '@fluentui/react-components': '^9.0.0', // necessary for FluentProvider
      '@fluentui/react-icons': 'latest',
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
