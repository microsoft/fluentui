import * as headlessPreview from '../../../packages/react-components/react-headless-components-preview/stories/.storybook/preview';

export const decorators = [...headlessPreview.decorators];

/** @type {typeof headlessPreview.parameters} */
export const parameters = {
  ...headlessPreview.parameters,
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Overview',
        ['Introduction', 'Getting Started', 'Accessibility', 'Browser support', 'Polyfills & fallbacks'],
        'Guides',
        'Components',
        'Concepts',
      ],
    },
  },
  reactStorybookAddon: {
    docs: {
      argTable: {
        slotsApi: true,
        nativePropsApi: true,
      },
      copyAsMarkdown: true,
      tableOfContents: true,
      dirSwitcher: true,
      // headless components don't support theming
      themePicker: false,
    },
  },
};

export const tags = ['autodocs'];
