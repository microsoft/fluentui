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

  connectedCallback(): void {
    super.connectedCallback();
    if (this.step) {
      const totalSteps = 100 / Math.floor((this.max - this.min) / this.step);
      this.style.setProperty('--step-rate', totalSteps.toString() + '%');
    }
  }
}
