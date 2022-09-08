import { InputField } from '@fluentui/react-field';

import descriptionMd from './InputFieldDescription.md';

export { Default } from './InputFieldDefault.stories';

export default {
  title: 'Preview Components/Field/InputField',
  component: InputField,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
