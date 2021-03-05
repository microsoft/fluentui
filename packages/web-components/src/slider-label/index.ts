import { customElement } from '@microsoft/fast-element';
import { SliderLabel, SliderLabelTemplate as template } from '@microsoft/fast-foundation';
import { SliderLabelStyles as styles } from './slider-label.styles';

/**
 * The Fluent Slider Label Custom Element. Implements {@link @microsoft/fast-foundation#SliderLabel},
 * {@link @microsoft/fast-foundation#SliderLabelTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-slider-label\>
 */
@customElement({
  name: 'fluent-slider-label',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentSliderLabel extends SliderLabel {}

/**
 * Styles for SliderLabel
 * @public
 */
export const SliderLabelStyles = styles;
