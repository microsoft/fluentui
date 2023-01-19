import { attr } from '@microsoft/fast-element';
import { FASTDivider } from '@microsoft/fast-foundation';
import { DividerAlignContent, DividerAppearance } from './divider.options.js';

/**
 * @class Divider component
 *
 * @remarks
 * This class extends the FASTDivider. A divider groups sections of content to create visual rhythm and hierarchy. Use dividers along with spacing and headers to organize content in your layout.
 */
export class Divider extends FASTDivider {
  /**
   * @property dividerAlignContent
   * @default center (DividerAlignContent.center)
   * @remarks
   * Determines the alignment of the content within the divider. Select from center, start, or end.
   */
  @attr({ attribute: 'divider-align-content' })
  public dividerAlignContent?: DividerAlignContent;

  /**
   * @property dividerAppearance
   * @default default (DividerAppearance.default)
   * @remarks
   * A divider can have one of the preset appearances. When not specified, the divider has its default appearance. Select from strong, brand, subtle, default.
   */
  @attr({ attribute: 'divider-apearance' })
  public dividerAppearance?: DividerAppearance;

  /**
   * @property inset
   * @default false
   * @remarks
   * Adds padding to the beginning and end of the divider.
   */
  @attr
  public inset?: boolean;
}
