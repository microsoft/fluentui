import { attr, FASTElement } from '@microsoft/fast-element';

/**
 * Divider roles
 * @public
 */
export enum DividerRole {
  /**
   * The divider semantically separates content
   */
  separator = 'separator',

  /**
   * The divider has no semantic value and is for visual presentation only.
   */
  presentation = 'presentation',
}

/**
 * Types of divider appearance.
 * @public
 */
export type DividerAppearance = undefined | 'strong' | 'brand' | 'subtle';

/**
 * @internal
 */
export class Divider extends FASTElement {
  /**
   * The role of the element.
   *
   * @public
   * @defaultValue - {@link DividerRole.separator}
   * @remarks
   * HTML Attribute: role
   */
  @attr
  public role: DividerRole = DividerRole.separator;

  /**
   * The appearance the divider should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: DividerAppearance;

  /**
   * Determines the alignment of the content in the divider.
   *
   * @public
   * @remarks
   * HTML Attribute: align-content
   */
  @attr({ attribute: 'align-content' })
  public alignContent: 'start' | 'center' | 'end' = 'center';

  /**
   * The divider will be inset using padding
   *
   * @public
   * @remarks
   * HTML Attribute: inset
   */
  @attr({ mode: 'boolean' })
  public inset: boolean = false;

  /**
   * The divider can be vertical
   *
   * @public
   * @remarks
   * HTML Attribute: vertical
   */
  @attr({ mode: 'boolean' })
  public vertical: boolean = false;
}
