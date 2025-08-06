import type { Preview } from '@storybook/react';

import * as rootPreview from '../../../.storybook/preview';

const preview: Preview & { parameters: import('@fluentui/react-storybook-addon').FluentParameters } = {
  ...rootPreview,
  parameters: {
    ...rootPreview.parameters,
    docs: {
      ...rootPreview.parameters.docs,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Introduction', 'Packages'],
      },
    },
    reactStorybookAddon: { docs: true },
  },
};

export default preview;
