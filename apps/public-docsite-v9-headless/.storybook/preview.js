import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill/shadowless';

import * as rootPreview from '../../../.storybook/preview';

// Design tokens (light + dark CSS custom properties on :root and
// [data-theme="dark"]), plus a few base resets for body/html. Loaded once
// for every story rendered in this Storybook.
import '../theme/tokens.css';

// Custom docs page that renders the "Show code" panel with TSX | CSS tabs.
// See `packages/.../stories/src/_helpers/HeadlessDocsPage.tsx` for rationale.
import { HeadlessDocsPage } from '../../../packages/react-components/react-headless-components-preview/stories/src/_helpers/HeadlessDocsPage';

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
