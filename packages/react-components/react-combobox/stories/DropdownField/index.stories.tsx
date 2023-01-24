import { DropdownField } from '@fluentui/react-components/unstable';

import descriptionMd from './DropdownFieldDescription.md';

export { Default } from './DropdownFieldDefault.stories';

export default {
  title: 'Preview Components/Field/DropdownField',
  component: DropdownField,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
