import { CheckboxField } from '@fluentui/react-field';

import descriptionMd from './CheckboxFieldDescription.md';

export { Default } from './CheckboxFieldDefault.stories';
export { FieldLabel } from './CheckboxFieldFieldLabel.stories';

export default {
  title: 'Preview Components/Field/CheckboxField',
  component: CheckboxField,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
