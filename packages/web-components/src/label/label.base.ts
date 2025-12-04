import { attr, FASTElement } from '@microsoft/fast-element';

/**
 * The base class used for constructing a fluent-label custom element
 *
 * @slot - The default slot for label content
 * @csspart asterisk - The asterisk indicating a required field
 *
 * @tag fluent-label
 *
 * @public
 */
export class BaseLabel extends FASTElement {
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
   * 	Specifies styles for label when associated input is a required field
   *
   * @public
   * @remarks
   * HTML Attribute: required
   */
  @attr({ mode: 'boolean' })
  public required: boolean = false;
}
