import { attr, FASTElement } from '@microsoft/fast-element';
// import { LabelSize, LabelWeight } from "./label.options.js";
/**
 * The base class used for constructing a fluent-label custom element
 * @public
 */
export class Label extends FASTElement {
  /**
   * 	Specifies the id of the form element the label should be bound to
   *
   * @public
   * @remarks
   * HTML Attribute: for
   */
  @attr({ attribute: 'for' })
  public for: string;

  /**
   * 	Specifies which form the label belongs to
   *
   * @public
   * @remarks
   * HTML Attribute: form
   */
  @attr({ attribute: 'form' })
  public form: string;

  /**
   * 	Specifies styles for label when associated input is a required field
   *
   * @public
   * @remarks
   * HTML Attribute: required
   */
  @attr({ mode: 'boolean' })
  public required: boolean = false;

  // /**
  //  * 	Specifies font size of a label
  //  *
  //  * @public
  //  * @default 'medium'
  //  * @remarks
  //  * HTML Attribute: size
  //  */
  // @attr({attribute: 'size'})
  // public size: LabelSize = LabelSize.medium;

  // /**
  //  * 	Specifies font weight of a label
  //  *
  //  * @public
  //  * @default 'regular'
  //  * @remarks
  //  * HTML Attribute: weight
  //  */
  //   @attr({attribute: 'weight'})
  //   public weight: LabelWeight = LabelWeight.regular;
}
