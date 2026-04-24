import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill/shadowless';

import * as rootPreview from '../../../.storybook/preview';
import { tailwindSandboxTemplate } from './tailwind-sandbox-template';

polyfillBodyAndObserve();

/** @type {typeof rootPreview.decorators} */
export const decorators = [...rootPreview.decorators];

/** @type {typeof rootPreview.parameters} */
export const parameters = {
  ...rootPreview.parameters,
  docs: {
    ...rootPreview.parameters.docs,
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Introduction', 'Headless Components'],
    },
  },
  exportToSandbox: {
    ...rootPreview.parameters.exportToSandbox,
    ...tailwindSandboxTemplate,
  },
};

export const tags = ['autodocs'];
