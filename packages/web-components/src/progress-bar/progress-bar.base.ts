import { attr, FASTElement, nullableNumberConverter, observable } from '@microsoft/fast-element';
import { swapStates } from '../utils/element-internals.js';
import { ProgressBarValidationState } from './progress-bar.options.js';

/**
 * A Progress HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#progressbar | ARIA progressbar }.
 *
 * @public
 */
export class BaseProgressBar extends FASTElement {
  /**
   * Reference to the indicator element which visually represents the progress.
   *
   * @internal
   */
  @observable
  public indicator?: HTMLElement;

  /**
   * Updates the indicator width after the element is connected to the DOM via the template.
   * @internal
   */
  protected indicatorChanged() {
    this.setIndicatorWidth();
  }

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The validation state of the progress bar
   * The validation state of the progress bar
   *
   * HTML Attribute: `validation-state`
   *
   * @public
   */
  @attr({ attribute: 'validation-state' })
  public validationState: ProgressBarValidationState | null = null;

  /**
   * Handles changes to validation-state attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public validationStateChanged(
    prev: ProgressBarValidationState | undefined,
    next: ProgressBarValidationState | undefined,
  ) {
    swapStates(this.elementInternals, prev, next, ProgressBarValidationState);
  }

  /**
   * The value of the progress
   * The value of the progress
   *
   * HTML Attribute: `value`
   *
   * @internal
   */
  @attr({ converter: nullableNumberConverter })
  public value?: number;

  /**
   * Updates the percent complete when the `value` property changes.
   *
   * @internal
   */
  protected valueChanged(prev: number | undefined, next: number | undefined): void {
    if (this.elementInternals) {
      this.elementInternals.ariaValueNow = typeof next === 'number' ? `${next}` : null;
    }

    this.setIndicatorWidth();
  }

  /**
   * The minimum value
   * The minimum value
   *
   * HTML Attribute: `min`
   *
   * @internal
   */
  @attr({ converter: nullableNumberConverter })
  public min?: number;

  /**
   * Updates the percent complete when the `min` property changes.
   *
   * @param prev - The previous min value
   * @param next - The current min value
   */
  protected minChanged(prev: number | undefined, next: number | undefined): void {
    if (this.elementInternals) {
      this.elementInternals.ariaValueMin = typeof next === 'number' ? `${next}` : null;
    }

    this.setIndicatorWidth();
  }

  /**
   * The maximum value
   * The maximum value
   *
   * HTML Attribute: `max`
   *
   * @internal
   */
  @attr({ converter: nullableNumberConverter })
  public max?: number;

  /**
   * Updates the percent complete when the `max` property changes.
   *
   * @param prev - The previous max value
   * @param next - The current max value
   * @internal
   */
  protected maxChanged(prev: number | undefined, next: number | undefined): void {
    if (this.elementInternals) {
      this.elementInternals.ariaValueMax = typeof next === 'number' ? `${next}` : null;
    }

    this.setIndicatorWidth();
  }

  public constructor() {
    super();

    this.elementInternals.role = 'progressbar';
  }

  /**
   * Sets the width of the indicator element based on the value, min, and max
   * properties. If the browser supports `width: attr(value)`, this method does
   * nothing and allows CSS to handle the width.
   *
   * @internal
   */
  protected setIndicatorWidth() {
    if (CSS.supports('width: attr(value type(<number>))')) {
      return;
    }

    requestAnimationFrame(() => {
      if (typeof this.value !== 'number') {
        this.indicator?.style.removeProperty('width');
        return;
      }

      const min = this.min ?? 0;
      const max = this.max ?? 100;
      const value = this.value ?? 0;
      const range = max - min;
      const width = range === 0 ? 0 : Math.fround(((value - min) / range) * 100);

      this.indicator?.style.setProperty('width', `${width}%`);
    });
  }
}
