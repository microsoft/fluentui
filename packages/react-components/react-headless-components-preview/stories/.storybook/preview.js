import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill/shadowless';

import * as rootPreview from '../../../../../.storybook/preview';

// Design tokens — loaded once for every story. Defines :root (light) and
// [data-theme="dark"] CSS custom properties consumed by all *.module.css files.
import './tokens.css';

// Custom docs page chrome and the tabbed source panel for CSS modules
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
};

export const tags = ['autodocs'];
