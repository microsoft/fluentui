import { attr, css, Observable } from '@microsoft/fast-element';
import type { ElementStyles } from '@microsoft/fast-element';
import { FASTSlider } from '@microsoft/fast-foundation/slider.js';
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
  public size?: SliderSize;

  public handleChange(source: any, propertyName: string): void {
    switch (propertyName) {
      case 'min':
      case 'max':
      case 'step':
        this.handleStepStyles();
        break;
      default:
        break;
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();

    Observable.getNotifier(this).subscribe(this, 'max');
    Observable.getNotifier(this).subscribe(this, 'min');
    Observable.getNotifier(this).subscribe(this, 'step');

    this.handleStepStyles();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    Observable.getNotifier(this).unsubscribe(this, 'max');
    Observable.getNotifier(this).unsubscribe(this, 'min');
    Observable.getNotifier(this).unsubscribe(this, 'step');
  }

  private stepStyles?: ElementStyles;

  /**
   * Handles changes to step styling based on the step value
   * NOTE: This function is not a changed callback, stepStyles is not observable
   */
  private handleStepStyles(): void {
    if (this.step) {
      const totalSteps = (100 / Math.floor((this.max - this.min) / this.step)) as any;

      if (this.stepStyles !== undefined) {
        this.$fastController.removeStyles(this.stepStyles);
      }

      this.stepStyles = css/**css*/ `
        :host {
          --step-rate: ${totalSteps}%;
          color: blue;
        }
      `;

      this.$fastController.addStyles(this.stepStyles);
    } else if (this.stepStyles !== undefined) {
      this.$fastController.removeStyles(this.stepStyles);
    }
  }
}
