import * as rootPreview from '../../../../../.storybook/preview';
import { withCAPTheme } from '../src/CAPTheme';

/** @type {typeof rootPreview.decorators} */
export const decorators = [...rootPreview.decorators, withCAPTheme];

/** @type {typeof rootPreview.parameters} */
export const parameters = { ...rootPreview.parameters };

export const tags = ['autodocs'];
