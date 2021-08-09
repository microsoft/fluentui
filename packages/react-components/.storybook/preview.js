import * as rootPreview from '../../../.storybook/preview';

// load global styles
import '../public/intro.css';

/** @type {typeof rootPreview.decorators} */
export const decorators = [...rootPreview.decorators];

/** @type {typeof rootPreview.parameters} */
export const parameters = { ...rootPreview.parameters };
