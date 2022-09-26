import { RadioGroupField } from '@fluentui/react-field';

import descriptionMd from './RadioGroupFieldDescription.md';

export { Default } from './RadioGroupFieldDefault.stories';

export default {
  title: 'Preview Components/Field/RadioGroupField',
  component: RadioGroupField,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
