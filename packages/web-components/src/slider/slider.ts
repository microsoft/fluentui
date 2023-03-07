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
<<<<<<< HEAD
    const totalSteps = 100 / Math.floor((this.max - this.min) / this.step);
    this.style.setProperty('--step-rate', totalSteps.toString() + '%');
=======
    const stepRate = (this.step / 100) * 100;
    this.style.setProperty('--step-rate', stepRate.toString() + '%');
>>>>>>> e015e03ddb (Adds stripes to slider for vertical/horizontal. Deletes SliderLabel as we don't need it)
  }
}
