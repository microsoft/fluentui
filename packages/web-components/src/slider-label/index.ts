import { customElement } from '@microsoft/fast-element';
import { SliderLabel, SliderLabelTemplate as template } from '@microsoft/fast-foundation';
import { SliderLabelStyles as styles } from './slider-label.styles';

/**
 * The FAST Slider Label Custom Element. Implements {@link @microsoft/fast-foundation#SliderLabel},
 * {@link @microsoft/fast-foundation#SliderLabelTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-slider-label\>
 */
@customElement({
  name: 'fast-slider-label',
  template,
  styles,
})
export class FASTSliderLabel extends SliderLabel {}
