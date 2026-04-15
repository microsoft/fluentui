import * as rootPreview from '../../../.storybook/preview';

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
};

export const tags = ['autodocs'];
