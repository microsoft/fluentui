import { FluentDocsContainer } from '../src/DocsComponents/FluentDocsContainer.stories';
import { FluentDocsPage } from '../src/DocsComponents/FluentDocsPage.stories';
import * as rootPreview from '../../../.storybook/preview';
import './docs-root-v9.css';

/** @type {NonNullable<import('@storybook/react').Story['decorators']>} */
export const decorators = rootPreview.decorators;

/** @type {typeof rootPreview.parameters} */
export const parameters = {
  ...rootPreview.parameters,
  docs: {
    ...rootPreview.parameters.docs,
    container: FluentDocsContainer,
    page: FluentDocsPage,
  },
  options: {
    storySort: {
      method: 'alphabetical',
      /**
       * @see https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
       */
      order: [
        'Concepts',
        [
          'Introduction',
          'Developer',
          ['Quick Start', 'Styling Components', 'Positioning Components', 'Component Poster', 'Server-Side Rendering'],
          'Migration',
          [
            'Getting Started',
            'Keeping Design Consistent',
            'Handling Breaking Changes',
            'from v8',
            ['Component Mapping', 'Color Mapping', 'Troubleshooting'],
            'from v0',
          ],
        ],
        'Theme',
        'Components',
      ],
    },
  },
};
