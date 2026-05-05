import { Input } from '@fluentui/react-headless-components-preview/input';

import descriptionMd from './InputDescription.md';
export { Default } from './InputDefault.stories';
export { Basic } from './InputBasic.stories';

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
