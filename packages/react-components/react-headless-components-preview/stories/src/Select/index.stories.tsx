import { Select } from '@fluentui/react-headless-components-preview';

import descriptionMd from './SelectDescription.md';

export { Default } from './SelectDefault.stories';

export default {
  title: 'Headless Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
