import { RangeSlider } from '@fluentui/react-headless-components-preview/range-slider';

import descriptionMd from './RangeSliderDescription.md';
import './range-slider.module.css';
export { Default } from './RangeSliderDefault.stories';
export { DisabledThumb } from './RangeSliderDisabledThumb.stories';

export default {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
