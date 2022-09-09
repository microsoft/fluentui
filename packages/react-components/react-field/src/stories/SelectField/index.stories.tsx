import { SelectField } from '@fluentui/react-field';

import descriptionMd from './SelectFieldDescription.md';

export { Default } from './SelectFieldDefault.stories';

export default {
  title: 'Preview Components/Field/SelectField',
  component: SelectField,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
