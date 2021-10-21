import * as React from 'react';
import { FluentDocsContainer } from '../src/Migrations/utils.stories';
import * as rootPreview from '../../../.storybook/preview';

// load global styles
import '../public/intro.css';

/** @type {NonNullable<typeof rootPreview.parameters['options']>} */
const options = {
  storySort: {
    method: 'alphabetical',
    /**
     * @see https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
     */
    order: [
      'Concepts',
      ['Introduction', 'Developer', ['Quick Start', 'Migrating from @fluentui/react v8', 'Styling Components']],
      'Theme',
      'Components',
      'Migrations',
    ],
  },
};

/** @type {typeof rootPreview.decorators} */
export const decorators = [...rootPreview.decorators];

/** @type {typeof rootPreview.parameters} */
export const parameters = {
  ...rootPreview.parameters,
  docs: {
    // TODO extract this to a separate component
    container: FluentDocsContainer,
  },
  options,
};
