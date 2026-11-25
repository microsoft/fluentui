import { Checkbox } from '@fluentui/react-headless-components-preview/checkbox';

import descriptionMd from './CheckboxDescription.md';
export { Default } from './CheckboxDefault.stories';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
