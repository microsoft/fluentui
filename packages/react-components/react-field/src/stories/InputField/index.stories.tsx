import { InputField } from '@fluentui/react-components/unstable';

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
