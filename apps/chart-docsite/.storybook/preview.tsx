import type { Preview } from '@storybook/react';

import * as rootPreview from '../../../.storybook/preview';

// TODO: These custom Docs implementations should be part of custom SB addon/storybook components package
import { FluentDocsContainer } from '../src/DocsComponents/FluentDocsContainer';

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
