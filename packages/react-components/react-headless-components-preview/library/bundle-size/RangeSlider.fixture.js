// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  RangeSlider,
  renderRangeSlider,
  useRangeSlider,
} from '@fluentui/react-headless-components-preview/range-slider';

console.log(RangeSlider, renderRangeSlider, useRangeSlider);

export default {
  name: '@fluentui/react-headless-components-preview/range-slider',
};
