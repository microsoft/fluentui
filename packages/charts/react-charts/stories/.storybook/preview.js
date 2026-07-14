import * as rootPreview from '../../../../../.storybook/preview';

/** @type {typeof rootPreview.decorators} */
export const decorators = [...rootPreview.decorators];

/** @type {typeof rootPreview.parameters} */
export const parameters = {
  ...rootPreview.parameters,
  reactStorybookAddon: { docs: process.env.DOCS_MODE !== 'false' },
};

export const tags = ['autodocs'];
