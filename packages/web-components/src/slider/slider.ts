import { attr } from '@microsoft/fast-element';
import { FASTSlider } from '@microsoft/fast-foundation';
import type { SliderMode, SliderSize } from './slider.options.js';

/**
 * The base class used for constructing a fluent-slider custom element
 * @public
 */
export class Slider extends FASTSlider {
  /**
   * The mode of the slider
   *
   * @public
   * @remarks
   * HTML Attribute: mode
   */
  @attr
  public mode: SliderMode;

  /**
   * The size of the slider
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size: SliderSize;
}
