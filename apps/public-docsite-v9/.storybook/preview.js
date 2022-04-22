/** @type {typeof rootPreview.parameters} */
export const parameters = {
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
      ],
    },
  },
};
