import * as rootPreview from '../../../.storybook/preview';

import './docs-root-v9.css';

/** @type {NonNullable<import('@storybook/react').Story['decorators']>} */
export const decorators = rootPreview.decorators;

/** @type {import("@fluentui/react-storybook-addon").FluentParameters & typeof rootPreview.parameters} */
export const parameters = {
  ...rootPreview.parameters,
  docs: {
    ...rootPreview.parameters.docs,
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
        ['Border Radii', 'Colors', 'Fonts', 'Shadows', 'Spacing', 'Stroke Widths', 'Typography', 'Theme Designer'],
        'Components',
        'Compat Components',
        'Preview Components',
        'Icons',
        ['Overview', 'Catalog'],
        'Motion',
        'Utilities',
      ],
    },
  },
  reactStorybookAddon: {
    docs: true,
  },
};
