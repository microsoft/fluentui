import { attr } from '@microsoft/fast-element';
import { SliderSize } from './slider.options.js';
import { BaseSlider } from './slider.base';

/**
 * A Slider HTML Element.
 * Based on BaseSlider and includes style and layout specific attributes
 *
 * @tag fluent-slider
 *
 */
export class Slider extends BaseSlider {
  /**
   * The size of the slider
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: SliderSize;
}
