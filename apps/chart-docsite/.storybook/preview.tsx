import type { Preview } from '@storybook/react';

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootPreview from '../../../.storybook/preview';

const preview: Preview = {
  ...rootPreview,
  parameters: {
    ...rootPreview.parameters,
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Welcome', 'Packages'],
      },
    },
  },
};

export default preview;
