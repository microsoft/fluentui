import * as rootPreview from '../../../.storybook/preview';
import { FluentDocsContainer } from '../src/DocsComponents/FluentDocsContainer.stories';
import { FluentDocsPage } from '../src/DocsComponents/FluentDocsPage.stories';

/** @type {NonNullable<typeof rootPreview.parameters['options']>} */
const options = {
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
        ['Quick Start', 'Migrating from @fluentui/react v8', 'Styling Components', 'Positioning Components'],
      ],
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
    ...rootPreview.parameters.docs,
    container: FluentDocsContainer,
    page: FluentDocsPage,
  },
  options,
};
