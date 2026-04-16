import { Input } from '@fluentui/react-headless-components-preview';

import descriptionMd from './InputDescription.md';

export { Default } from './InputDefault.stories';

export default {
  title: 'Headless Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
