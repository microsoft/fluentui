import { attr } from '@microsoft/fast-element';
import { DividerAlignContent, DividerAppearance } from './divider.options.js';
import { BaseDivider } from './divider.base.js';

/**
 * A Divider Custom HTML Element.
 * Based on BaseDivider and includes style and layout specific attributes
 *
 * @tag fluent-divider
 *
 * @public
 */
export class Divider extends BaseDivider {
  /**
   * Determines the alignment of the content within the divider. Select from start or end. When not specified, the content will be aligned to the center.
   * @public
   * @remarks
   */
  @attr({ attribute: 'align-content' })
  public alignContent?: DividerAlignContent;

  /**
   * A divider can have one of the preset appearances. Select from strong, brand, subtle. When not specified, the divider has its default appearance.
   * @public
   * @remarks
   */
  @attr
  public appearance?: DividerAppearance;

  /**
   * Adds padding to the beginning and end of the divider.
   * @public
   * @remarks
   */
  @attr({ mode: 'boolean' })
  public inset?: boolean;
}
