import { attr, FASTElement } from '@microsoft/fast-element';
import { DividerAlignContent, DividerAppearance, DividerOrientation, DividerRole } from './divider.options.js';

/**
 * A Divider component that provides a customizable divider element.
 * @class Divider
 * @extends FASTElement
 *
 * @attr role - The role of the element.
 * @attr orientation - The orientation of the divider.
 * @attr align-content - Determines the alignment of the content within the divider.
 * @attr appearance - A divider can have one of the preset appearances.
 * @attr inset - Adds padding to the beginning and end of the divider.
 *
 * @csspart root - The root element of the divider.
 *
 * @slot - Default slot for the content of the divider.
 *
 * @summary The Divider component functions as a customizable divider element.
 *
 * @tag fluent-divider
 *
 * @public
 */

export class Divider extends FASTElement {
  /**
   * The role of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: role
   */
  @attr
  public role: DividerRole = DividerRole.separator;

  /**
   * The orientation of the divider.
   *
   * @public
   * @remarks
   * HTML Attribute: orientation
   */
  @attr
  public orientation: DividerOrientation = DividerOrientation.horizontal;

  /**
   * @property alignContent
   * @default center
   * @remarks
   * Determines the alignment of the content within the divider. Select from start or end. When not specified, the content will be aligned to the center.
   */
  @attr({ attribute: 'align-content' })
  public alignContent?: DividerAlignContent;

  /**
   * @property appearance
   * @default default
   * @remarks
   * A divider can have one of the preset appearances. Select from strong, brand, subtle. When not specified, the divider has its default appearance.
   */
  @attr
  public appearance?: DividerAppearance;

  /**
   * @property inset
   * @default false
   * @remarks
   * Adds padding to the beginning and end of the divider.
   */
  @attr({ mode: 'boolean' })
  public inset?: boolean;
}
