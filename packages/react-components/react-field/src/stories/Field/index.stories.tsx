import descriptionMd from './FieldDescription.md';
import bestPracticesMd from './FieldBestPractices.md';

export { Default } from './FieldDefault.stories';
export { Label } from './FieldLabel.stories';
export { Horizontal } from './FieldHorizontal.stories';
export { Required } from './FieldRequired.stories';
export { ValidationState } from './FieldValidationState.stories';
export { Size } from './FieldSize.stories';
export { Hint } from './FieldHint.stories';

export default {
  title: 'Preview Components/Field',
  component: null,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
