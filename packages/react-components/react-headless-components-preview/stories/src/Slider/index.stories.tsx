import { Slider } from '@fluentui/react-headless-components-preview/slider';

import descriptionMd from './SliderDescription.md';
import sliderCss from '../../../../../../bebop/components/slider.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource({ name: 'slider.module.css', source: sliderCss }),
  },
};
