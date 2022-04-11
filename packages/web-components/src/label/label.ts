import { attr, FASTElement } from '@microsoft/fast-element';

/**
 * Applies font size and line height based on the theme tokens
 * @public
 */
export type LabelSize = 'small' | 'medium' | 'large';

/**
 * @internal
 */
export class Label extends FASTElement {
  /**
   * An label can be disabled.
   *
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ mode: 'boolean' })
  disabled: boolean = false;

  /**
   * An label can be strong.
   *
   * @public
   * @remarks
   * HTML Attribute: strong
   */
  @attr({ mode: 'boolean' })
  strong: boolean = false;

  /**
   * An label can be required.
   *
   * @public
   * @remarks
   * HTML Attribute: required
   */
  @attr({ mode: 'boolean' })
  required: boolean = false;

  /**
   * THe label size
   *
   * @public
   * @remarks
   * HTML Attribute: size
   *
   */
  @attr
  size: LabelSize = 'medium';
}
