import { SliderField } from '@fluentui/react-field';

import descriptionMd from './SliderFieldDescription.md';

export { Default } from './SliderFieldDefault.stories';

export default {
  title: 'Preview Components/Field/SliderField',
  component: SliderField,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
