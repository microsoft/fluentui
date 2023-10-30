import { attr } from '@microsoft/fast-element';
import { FASTCheckbox } from '@microsoft/fast-foundation/checkbox.js';
import { CheckboxLabelPosition, CheckboxShape, CheckboxSize } from './checkbox.options.js';

/**
 * The base class used for constucting a fluent checkbox custom element
 * @public
 */
export class Checkbox extends FASTCheckbox {
  /**
   * Sets shape of the checkbox.
   *
   * @public
   * @default 'square'
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape?: CheckboxShape;

  /**
   * Sets size of the checkbox.
   *
   * @public
   * @default 'medium'
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: CheckboxSize;

  /**
   * Sets position of the label relative to the input
   *
   * @public
   * @default 'after'
   * @remarks
   * HTML Attribute: label-position
   */
  @attr({ attribute: 'label-position' })
  public labelPosition?: CheckboxLabelPosition;
}
