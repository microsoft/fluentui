import * as rootPreview from '../../../../../.storybook/preview';

export const decorators = [...rootPreview.decorators];

export const parameters = {
  ...rootPreview.parameters,
  exportToSandbox: { disabled: true },
};

export const tags = ['autodocs'];
