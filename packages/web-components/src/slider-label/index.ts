import { SliderLabel, sliderLabelTemplate as template } from '@microsoft/fast-foundation';
import { sliderLabelStyles as styles } from './slider-label.styles';

/**
 * The Fluent Slider Label Custom Element. Implements {@link @microsoft/fast-foundation#SliderLabel},
 * {@link @microsoft/fast-foundation#sliderLabelTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-slider-label\>
 */
export const fluentSliderLabel = SliderLabel.compose({
  baseName: 'slider-label',
  template,
  styles,
});

/**
 * Styles for SliderLabel
 * @public
 */
export const sliderLabelStyles = styles;

/**
 * Slider label base class
 * @public
 */
export { SliderLabel };
