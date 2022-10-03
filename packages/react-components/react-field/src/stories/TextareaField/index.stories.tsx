import { TextareaField } from '@fluentui/react-field';

import descriptionMd from './TextareaFieldDescription.md';

export { Default } from './TextareaFieldDefault.stories';

export default {
  title: 'Preview Components/Field/TextareaField',
  component: TextareaField,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
