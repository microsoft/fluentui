import { attr, FASTElement } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import { LabelSize, LabelWeight } from './label.options.js';

/**
 * A Label component that provides a customizable label element.
 * @class Label
 * @extends FASTElement
 *
 * @attr size - Specifies font size of a label.
 * @attr weight - Specifies font weight of a label.
 * @attr disabled - Specifies styles for label when associated input is disabled.
 * @attr required - Specifies styles for label when associated input is a required field.
 *
 * @csspart root - The root element of the label.
 * @csspart asterisk - The asterisk element indicating a required field.
 *
 * @slot - Default slot for the content of the label.
 *
 * @summary The Label component functions as a customizable label element.
 *
 * @tag fluent-label
 *
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
