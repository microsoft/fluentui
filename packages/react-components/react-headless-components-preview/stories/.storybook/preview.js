import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill/shadowless';

import * as rootPreview from '../../../../../.storybook/preview';

// Design tokens — mirrors the import in
// apps/public-docsite-v9-headless/.storybook/preview.js so the per-package
// storybook (built by `pr-website-deploy.yml`) renders identical stories.
import '../theme/tokens.css';

polyfillBodyAndObserve();

/** @type {typeof rootPreview.decorators} */
export const decorators = [...rootPreview.decorators];

/** @type {typeof rootPreview.parameters} */
export const parameters = {
  ...rootPreview.parameters,
};

export const tags = ['autodocs'];
