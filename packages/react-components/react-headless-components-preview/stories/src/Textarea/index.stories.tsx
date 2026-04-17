import { Textarea } from '@fluentui/react-headless-components-preview';

import descriptionMd from './TextareaDescription.md';

export { Default } from './TextareaDefault.stories';

export default {
  title: 'Headless Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
