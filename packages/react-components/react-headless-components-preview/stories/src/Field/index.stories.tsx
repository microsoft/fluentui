import { Field } from '@fluentui/react-headless-components-preview';

import descriptionMd from './FieldDescription.md';

export { Default } from './FieldDefault.stories';

export default {
  title: 'Headless Components/Field',
  component: Field,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
