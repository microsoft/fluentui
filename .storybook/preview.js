import { withFluentProvider, withStrictMode } from '@fluentui/react-storybook';
import 'cypress-storybook/react';

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
    getStoryFiles: () => {
      const webpackContext = require.context('!!raw-loader!../packages/', true, /\.stories\.tsx$/);

      /** @type { {[key: string]: string} } */
      const storyFiles = {};

      webpackContext.keys().forEach(filename => {
        storyFiles['.' + filename] = webpackContext(filename).default;
      });

      return storyFiles;
    },
  },
};
