import { attr, FASTElement } from '@microsoft/fast-element';
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
   * 	Specifies font size of a label
   *
   * @public
   * @default 'medium'
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: LabelSize;

  /**
   * 	Specifies font weight of a label
   *
   * @public
   * @default 'regular'
   * @remarks
   * HTML Attribute: weight
   */
  @attr
  public weight?: LabelWeight;

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
