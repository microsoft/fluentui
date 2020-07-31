import { customElement } from '@microsoft/fast-element';
import { Slider, SliderTemplate as template } from '@microsoft/fast-foundation';
import { SliderStyles as styles } from './slider.styles';

/**
 * The FAST Slider Custom Element. Implements {@link @microsoft/fast-foundation#Slider},
 * {@link @microsoft/fast-foundation#SliderTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-slider\>
 */
@customElement({
  name: 'fast-slider',
  template,
  styles,
})
export class FASTSlider extends Slider {}
