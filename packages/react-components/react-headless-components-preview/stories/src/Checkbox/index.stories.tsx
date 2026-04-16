import { Checkbox } from '@fluentui/react-headless-components-preview';

import descriptionMd from './CheckboxDescription.md';

export { Default } from './CheckboxDefault.stories';

export default {
  title: 'Headless Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
