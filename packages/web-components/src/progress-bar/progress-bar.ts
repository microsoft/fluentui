import { attr, FASTElement, nullableNumberConverter, volatile } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
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
   * Handles changes to thickness attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public thicknessChanged(prev: ProgressBarThickness | undefined, next: ProgressBarThickness | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * The shape of the progress bar
   * @public
   * HTML Attribute: `shape`
   */
  @attr
  public shape?: ProgressBarShape;

  /**
   * Handles changes to shape attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public shapeChanged(prev: ProgressBarShape | undefined, next: ProgressBarShape | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

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
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
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
  }

  /**
   * Indicates progress in %
   * @internal
   */
  @volatile
  public get percentComplete(): number {
    const min = this.min ?? 0;
    const max = this.max ?? 100;
    const value = this.value ?? 0;
    const range = max - min;

    return range === 0 ? 0 : Math.fround(((value - min) / range) * 100);
  }

  public constructor() {
    super();

    this.elementInternals.role = 'progressbar';
  }
}
