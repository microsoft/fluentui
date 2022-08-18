import { InputField } from '@fluentui/react-field';

import descriptionMd from './InputFieldDescription.md';
import bestPracticesMd from './InputFieldBestPractices.md';

export { Default } from './InputFieldDefault.stories';
export { Label } from './InputFieldLabel.stories';
export { Horizontal } from './InputFieldHorizontal.stories';
export { Required } from './InputFieldRequired.stories';
export { ValidationState } from './InputFieldValidationState.stories';
export { Size } from './InputFieldSize.stories';
export { Hint } from './InputFieldHint.stories';

export default {
  title: 'Components/Field/InputField',
  component: InputField,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
