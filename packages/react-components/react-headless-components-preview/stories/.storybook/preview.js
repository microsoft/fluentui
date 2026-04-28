import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill/shadowless';

import * as rootPreview from '../../../../../.storybook/preview';

// Design tokens — mirrors the import in
// apps/public-docsite-v9-headless/.storybook/preview.js so the per-package
// storybook (built by `pr-website-deploy.yml`) renders identical stories.
import '../../theme/tokens.css';

// Custom docs page that renders the "Show code" panel with TSX | CSS tabs.
// See `stories/src/_helpers/HeadlessDocsPage.tsx` for the rationale (Storybook's
// built-in Source block can't be made multi-language via MDX overrides).
import { HeadlessDocsPage } from '../src/_helpers/HeadlessDocsPage';

polyfillBodyAndObserve();

/** @type {typeof rootPreview.decorators} */
export const decorators = [...rootPreview.decorators];

/** @type {typeof rootPreview.parameters} */
export const parameters = {
  ...rootPreview.parameters,
  docs: {
    ...(rootPreview.parameters && rootPreview.parameters.docs),
    page: HeadlessDocsPage,
  },
};

export const tags = ['autodocs'];
