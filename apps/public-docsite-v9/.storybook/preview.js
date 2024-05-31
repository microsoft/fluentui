import * as rootPreview from '../../../.storybook/preview';

// TODO: These custom Docs implementations should be part of custom SB addon/storybook components package
import { FluentDocsContainer } from '../src/DocsComponents/FluentDocsContainer.stories';
import { FluentDocsPage } from '../src/DocsComponents/FluentDocsPage.stories';

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
          [
            'Quick Start',
            'Styling Components',
            'Positioning Components',
            'Component Poster',
            'Server-Side Rendering',
            ['Basic setup', 'Next.js setup', 'Limitations with Portals'],
          ],
          'Migration',
          [
            'Getting Started',
            'Keeping Design Consistent',
            'Handling Breaking Changes',
            'from v8',
            ['Component Mapping', 'Color Mapping', 'Troubleshooting'],
            'from v0',
          ],
          'Recipes',
        ],
        'Theme',
        [
          'Border Radii',
          'Colors',
          'Fonts',
          'Motion',
          'Shadows',
          'Spacing',
          'Stroke Widths',
          'Typography',
          'Theme Designer',
        ],
        'Components',
        'Icons',
        ['Overview', 'Catalog'],
      ],
    },
  },
};
