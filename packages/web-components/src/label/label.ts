import { attr, FASTElement } from '@microsoft/fast-element';
import { LabelSize, LabelWeight } from './label.options.js';

/**
 * The base class used for constructing a fluent-label custom element
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
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: LabelSize;

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
