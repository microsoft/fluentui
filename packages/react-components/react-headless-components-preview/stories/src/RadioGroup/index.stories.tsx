import { RadioGroup, Radio } from '@fluentui/react-headless-components-preview/radio-group';

import descriptionMd from './RadioGroupDescription.md';

export { Default } from './RadioGroupDefault.stories';

export default {
  title: 'Headless Components/RadioGroup',
  component: RadioGroup,
  subcomponents: { Radio },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
