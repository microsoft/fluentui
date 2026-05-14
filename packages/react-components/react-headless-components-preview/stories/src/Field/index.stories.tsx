import { Field } from '@fluentui/react-headless-components-preview/field';

import descriptionMd from './FieldDescription.md';
export { Default } from './FieldDefault.stories';

export default {
  title: 'Components/Field',
  component: Field,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
