// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { Slider, renderSlider, useSlider } from '@fluentui/react-headless-components-preview/slider';

console.log(Slider, renderSlider, useSlider);

export default {
  name: '@fluentui/react-headless-components-preview/slider',
};
