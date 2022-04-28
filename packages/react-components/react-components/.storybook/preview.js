import * as rootPreview from '../../../../.storybook/preview';

/** @type {NonNullable<import('@storybook/react').Story['decorators']>} */
export const decorators = rootPreview.decorators;

/** @type {typeof rootPreview.parameters} */
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
          ['Quick Start', 'Styling Components', 'Positioning Components'],
          'Upgrading',
          [
            'from v8',
            ['Overview', 'Important changes', 'Planning your journey', 'Component Mapping', 'Troubleshooting'],
          ],
        ],
        'Theme',
        'Components',
        'Migrations',
      ],
    },
  },
};
