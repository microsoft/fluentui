import * as rootPreview from '../../../../.storybook/preview';

/** @type {NonNullable<import('@storybook/react').Story['decorators']>} */
export const decorators = [...rootPreview.decorators];

/** @type {typeof rootPreview.parameters} */
export const parameters = { ...rootPreview.parameters };
