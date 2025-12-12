import { attr } from '@microsoft/fast-element';
import { LabelSize, LabelWeight } from './label.options.js';
import { BaseLabel } from './label.base';

/**
 * A Label Custom HTML Element.
 * Based on BaseLabel and includes style and layout specific attributes
 *
 * @tag fluent-label
 *
 * @public
 */
export class Label extends BaseLabel {
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
}
