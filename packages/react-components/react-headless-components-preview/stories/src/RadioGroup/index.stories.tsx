import { RadioGroup, Radio } from '@fluentui/react-headless-components-preview/radio-group';

import descriptionMd from './RadioGroupDescription.md';
import radioGroupCss from '../../../../../../bebop/components/radio-group.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource({ name: 'radio-group.module.css', source: radioGroupCss }),
  },
};
