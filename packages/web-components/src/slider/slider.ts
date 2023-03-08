import { attr } from '@microsoft/fast-element';
import { FASTSlider } from '@microsoft/fast-foundation';
import type { SliderSize } from './slider.options.js';

/**
 * The base class used for constructing a fluent-slider custom element
 * @public
 */
export class Slider extends FASTSlider {
  /**
   * The size of the slider
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size: SliderSize = 'medium';

  /**
   * The size of the slider
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public foobar: string = 'medium';

  connectedCallback(): void {
    super.connectedCallback();
    this.style.setProperty('--step-rate', this.step.toString() + '%');
  }
}
