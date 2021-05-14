import { Slider, sliderTemplate as template } from '@microsoft/fast-foundation';
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
export const fluentSlider = Slider.compose({
  baseName: 'slider',
  template,
  styles,
});

/**
 * Styles for Slider
 * @public
 */
export const sliderStyles = styles;
