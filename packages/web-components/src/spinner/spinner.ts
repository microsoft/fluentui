import { attr, FASTElement } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import type { SpinnerAppearance, SpinnerSize } from './spinner.options.js';

/**
 * The base class used for constructing a fluent-spinner custom element
 * @public
 */
export class Spinner extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The size of the spinner
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: SpinnerSize;

  /**
   * Handles changes to size attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public sizeChanged(prev: SpinnerSize | undefined, next: SpinnerSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * The appearance of the spinner
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance?: SpinnerAppearance;

  /**
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: SpinnerAppearance | undefined, next: SpinnerAppearance | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  constructor() {
    super();
    this.elementInternals.role = 'progressbar';
  }
}
