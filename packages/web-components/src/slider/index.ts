import { Slider, SliderOptions, sliderTemplate as template } from '@microsoft/fast-foundation';
import { sliderStyles as styles } from './slider.styles';

/**
 * The Fluent Slider Custom Element. Implements {@link @microsoft/fast-foundation#(Slider:class)},
 * {@link @microsoft/fast-foundation#sliderTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-slider\>
 */
export const fluentSlider = Slider.compose<SliderOptions>({
  baseName: 'slider',
  template,
  styles,
  thumb: `
    <div class="thumb-cursor"></div>
  `,
});

/**
 * Styles for Slider
 * @public
 */
export const sliderStyles = styles;

/**
 * Slider base class
 * @public
 */
export { Slider };
