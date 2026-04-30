import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill/shadowless';

import * as rootPreview from '../../../.storybook/preview';

// Design tokens (light + dark CSS custom properties on :root and
// [data-theme="dark"]), plus a few base resets for body/html. Loaded once
// for every story rendered in this Storybook.
import '../../../packages/react-components/react-headless-components-preview/stories/theme/tokens.css';

// Custom docs page chrome (disclaimer card, divider, headings) and the
// docs-page wiring rules that let HeadlessSourcePanel portal into the canvas card.
import './headless-docs-page.css';
import { HeadlessDocsPage } from './HeadlessDocsPage';

polyfillBodyAndObserve();

/** @type {typeof rootPreview.decorators} */
export const decorators = [...rootPreview.decorators];

/** @type {typeof rootPreview.parameters} */
export const parameters = {
  ...rootPreview.parameters,
  docs: {
    ...rootPreview.parameters.docs,
    page: HeadlessDocsPage,
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Introduction', 'Headless Components'],
    },
  },
  reactStorybookAddon: {
    docs: {
      argTable: {
        slotsApi: true,
        nativePropsApi: true,
      },
      copyAsMarkdown: true,
      tableOfContents: true,
      dirSwitcher: true,
      // headless components don't support theming
      themePicker: false,
    },
  },
};

export const tags = ['autodocs'];
