import descriptionMd from './FieldDescription.md';

export { Default } from './FieldDefault.stories';
export { Label } from './FieldLabel.stories';
export { Horizontal } from './FieldHorizontal.stories';
export { Required } from './FieldRequired.stories';
export { ValidationMessage } from './FieldValidationMessage.stories';
export { Size } from './FieldSize.stories';
export { Hint } from './FieldHint.stories';

export default {
  title: 'Preview Components/Field',
  component: null,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
