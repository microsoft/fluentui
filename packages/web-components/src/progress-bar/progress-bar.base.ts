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
  /** @internal */
  @observable
  public indicator!: HTMLElement;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The validation state of the progress bar
   * @public
   * HTML Attribute: `validation-state`
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
   * @internal
   * HTML Attribute: `value`
   */
  @attr({ converter: nullableNumberConverter })
  public value?: number;

  /**
   * Updates the percent complete when the `value` property changes.
   *
   * @internal
   */
  protected valueChanged(prev: number | undefined, next: number | undefined): void {
    this.elementInternals.ariaValueNow = typeof next === 'number' ? `${next}` : null;
    this.setIndicatorWidth();
  }

  /**
   * The minimum value
   * @internal
   * HTML Attribute: `min`
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
    this.elementInternals.ariaValueMin = typeof next === 'number' ? `${next}` : null;
    this.setIndicatorWidth();
  }

  /**
   * The maximum value
   * @internal
   * HTML Attribute: `max`
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
    this.elementInternals.ariaValueMax = typeof next === 'number' ? `${next}` : null;
    this.setIndicatorWidth();
  }

  public constructor() {
    super();

    this.elementInternals.role = 'progressbar';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setIndicatorWidth();
  }

  private setIndicatorWidth() {
    if (!this.$fastController.isConnected || CSS.supports('width: attr(value type(<number>))')) {
      return;
    }

    if (typeof this.value !== 'number') {
      this.indicator.style.removeProperty('width');
      return;
    }

    const min = this.min ?? 0;
    const max = this.max ?? 100;
    const value = this.value ?? 0;
    const range = max - min;
    const width = range === 0 ? 0 : Math.fround(((value - min) / range) * 100);

    this.indicator.style.setProperty('width', `${width}%`);
  }
}
