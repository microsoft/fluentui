import { attr, FASTElement } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import { LabelSize, LabelWeight } from './label.options.js';

/**
 * The base class used for constructing a fluent-label custom element
 * @public
 */
export class Label extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * 	Specifies font size of a label
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: LabelSize;

  /**
   * Handles changes to size attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public sizeChanged(prev: LabelSize | undefined, next: LabelSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * 	Specifies font weight of a label
   *
   * @public
   * @remarks
   * HTML Attribute: weight
   */
  @attr
  public weight?: LabelWeight;

  /**
   * Handles changes to weight attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public weightChanged(prev: LabelWeight | undefined, next: LabelWeight | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * 	Specifies styles for label when associated input is disabled
   *
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean = false;

  /**
   * Handles changes to disabled attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public disabledChanged(prev: boolean | undefined, next: boolean | undefined) {
    toggleState(this.elementInternals, 'disabled', next);
  }

  /**
   * 	Specifies styles for label when associated input is a required field
   *
   * @public
   * @remarks
   * HTML Attribute: required
   */
  @attr({ mode: 'boolean' })
  public required: boolean = false;
}
