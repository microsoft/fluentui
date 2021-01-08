import { customElement } from '@microsoft/fast-element';
import { Slider, SliderTemplate as template } from '@microsoft/fast-foundation';
import { SliderStyles as styles } from './slider.styles';

/**
 * The Fluent Slider Custom Element. Implements {@link @microsoft/fast-foundation#Slider},
 * {@link @microsoft/fast-foundation#SliderTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-slider\>
 */
@customElement({
  name: 'fluent-slider',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentSlider extends Slider {}

/**
 * Styles for Slider
 * @public
 */
export const SliderStyles = styles;
