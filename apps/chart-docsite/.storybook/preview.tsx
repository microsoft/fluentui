import type { Preview } from '@storybook/react';

import * as rootPreview from '../../../.storybook/preview';

const preview: Preview = {
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
  },
};

export default preview;
