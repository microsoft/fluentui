import type { Preview } from '@storybook/react';

import * as rootPreview from '../../../.storybook/preview';

import { FluentDocsContainer } from '../../public-docsite-v9/src/DocsComponents/FluentDocsContainer.stories';

const preview: Preview = {
  ...rootPreview,
  parameters: {
    ...rootPreview.parameters,
    docs: {
      ...rootPreview.parameters.docs,
      container: FluentDocsContainer,
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
