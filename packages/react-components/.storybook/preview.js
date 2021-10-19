import * as rootPreview from '../../../.storybook/preview';

// load global styles
import '../public/intro.css';

/** @type {NonNullable<typeof rootPreview.parameters['options']>} */
const options = {
  storySort: {
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
export const parameters = { ...rootPreview.parameters, previewTabs: { canvas: { hidden: true } }, options };

// Hacky way of clicking on Docs button on first load of page.
// https://github.com/storybookjs/storybook/issues/13128
function clickDocsButtonOnFirstLoad() {
  window.removeEventListener('load', clickDocsButtonOnFirstLoad);

  try {
    const docsButtonSelector = window.parent.document.evaluate(
      "//button[contains(., 'Docs')]",
      window.parent.document,
      null,
      XPathResult.ANY_TYPE,
      null,
    );

    const button = docsButtonSelector.iterateNext();
    if (button) {
      button.click();
    }
  } catch (error) {
    // Do nothing if it wasn't able to click on Docs button.
  }
}

window.addEventListener('load', clickDocsButtonOnFirstLoad);
