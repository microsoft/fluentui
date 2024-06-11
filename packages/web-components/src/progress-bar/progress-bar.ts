import { attr, FASTElement, nullableNumberConverter, observable } from '@microsoft/fast-element';
import { ProgressBarShape, ProgressBarThickness, ProgressBarValidationState } from './progress-bar.options.js';

/**
 * An Progress HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#progressbar | ARIA progressbar }.
 *
 * @public
 */
export class ProgressBar extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The thickness of the progress bar
   *
   * @public
   * HTML Attribute: `thickness`
   */
  @attr
  public thickness?: ProgressBarThickness;

  /**
   * The shape of the progress bar
   * @public
   * HTML Attribute: `shape`
   */
  @attr
  public shape?: ProgressBarShape;

  /**
   * The validation state of the progress bar
   * @public
   * HTML Attribute: `validation-state`
   */
  @attr({ attribute: 'validation-state' })
  public validationState: ProgressBarValidationState | null = null;

  /**
   * The value of the progress
   * @internal
   * HTML Attribute: `value`
   */
  @attr({ converter: nullableNumberConverter })
  public value?: number | null;
  protected valueChanged(): void {
    this.updateAriaValueNow();
    this.updatePercentComplete();
  }

  /**
   * The minimum value
   * @internal
   * HTML Attribute: `min`
   */
  @attr({ converter: nullableNumberConverter })
  public min?: number;
  protected minChanged(): void {
    if (this.$fastController.isConnected) {
      this.updateAriaValueMin();
      this.updatePercentComplete();
    }
  }

  /**
   * The maximum value
   * @internal
   * HTML Attribute: `max`
   */
  @attr({ converter: nullableNumberConverter })
  public max?: number;
  protected maxChanged(): void {
    if (this.$fastController.isConnected) {
      this.updateAriaValueMax();
      this.updatePercentComplete();
    }
  }

  /**
   * Indicates progress in %
   * @internal
   */
  @observable
  public percentComplete: number = 0;

  public constructor() {
    super();

    this.elementInternals.role = 'progressbar';
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.updateAriaValueMin();
    this.updateAriaValueMax();
    this.updateAriaValueNow();
    this.updatePercentComplete();
  }

  private updateAriaValueMax(): void {
    this.elementInternals.ariaValueMax = this.max ? `${this.max}` : null;
  }

  private updateAriaValueMin(): void {
    this.elementInternals.ariaValueMin = this.min ? `${this.min}` : null;
  }

  private updateAriaValueNow(): void {
    this.elementInternals.ariaValueNow = this.value ? `${this.value}` : null;
  }

  private updatePercentComplete(): void {
    const min: number = this.min ?? 0;
    const max: number = this.max ?? 100;
    const value: number = this.value ?? 0;
    const range: number = max - min;

    this.percentComplete = range === 0 ? 0 : Math.fround(((value - min) / range) * 100);
  }
}
