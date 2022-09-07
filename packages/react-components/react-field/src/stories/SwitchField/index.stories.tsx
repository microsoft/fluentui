import { SwitchField } from '@fluentui/react-field';

import descriptionMd from './SwitchFieldDescription.md';

export { Default } from './SwitchFieldDefault.stories';

export default {
  title: 'Preview Components/Field/SwitchField',
  component: SwitchField,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
