import { Slider } from '@fluentui/react-headless-components-preview/slider';

import descriptionMd from './SliderDescription.md';
export { Default } from './SliderDefault.stories';

export default {
  title: 'Headless Components/Slider',
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
