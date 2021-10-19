import { withFluentProvider, withStrictMode } from '@fluentui/react-storybook';
import 'cypress-storybook/react';
import dedent from 'dedent';

/** @type {NonNullable<import('@storybook/react').Story['decorators']>} */
export const decorators = [withFluentProvider, withStrictMode];

/** @type {import('@storybook/react').Parameters} */
export const parameters = {
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
      '@fluentui/react-components': '^9.0.0-beta', // necessary for FluentProvider
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
