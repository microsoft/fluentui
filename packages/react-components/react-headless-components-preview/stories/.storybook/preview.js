import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill/shadowless';

import * as rootPreview from '../../../../../.storybook/preview';

polyfillBodyAndObserve();

/** @type {typeof rootPreview.decorators} */
export const decorators = [...rootPreview.decorators];

/** @type {typeof rootPreview.parameters} */
export const parameters = { ...rootPreview.parameters };

export const tags = ['autodocs'];
