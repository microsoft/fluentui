import * as rootPreview from '../../../.storybook/preview';

// load global styles
import '../public/intro.css';

/** @type {typeof rootPreview.decorators} */
export const decorators = [...rootPreview.decorators];

/** @type {typeof rootPreview.parameters} */
export const parameters = {
  ...rootPreview.parameters,
  options: {
    storySort: {
      /**
       * @see https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
       */
      order: [
        'Concepts',
        ['Introduction', 'Developer', ['Quick Start', 'Migrating from v8', 'Styling Components']],
        'Theme',
        'Components',
        'Migrations',
      ],
    },
  },
};
