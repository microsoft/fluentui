import { attr, FASTElement } from '@microsoft/fast-element';

/**
 * Applies font size and line height based on the theme tokens
 * @public
 */
export type TextSize = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '1000';

/**
 * Applies font family to the content
 * @public
 */
export type TextFont = 'base' | 'numeric' | 'monospace';

/**
 * Applies font weight to the content
 * @public
 */
export type TextWeight = 'medium' | 'regular' | 'semibold';

/**
 * Applies font weight to the content
 * @public
 */
export type TextAlign = 'start' | 'end' | 'center' | 'justify';

/**
 * @internal
 */
export class Text extends FASTElement {
  /**
   * The text will not wrap
   * NOTE: In Fluent UI React v9 this is "wrap"
   * Boolean attributes which default to true in HTML can't be switched off in the DOM
   *
   * @public
   * @remarks
   * HTML Attribute: nowrap
   */
  @attr({ mode: 'boolean' })
  nowrap: boolean = false;

  /**
   * The text truncates
   *
   * @public
   * @remarks
   * HTML Attribute: truncate
   */
  @attr({ mode: 'boolean' })
  truncate: boolean = false;

  /**
   * The text style is italic
   *
   * @public
   * @remarks
   * HTML Attribute: italic
   */
  @attr({ mode: 'boolean' })
  italic: boolean = false;

  /**
   * The text style is underline
   *
   * @public
   * @remarks
   * HTML Attribute: underline
   */
  @attr({ mode: 'boolean' })
  underline: boolean = false;

  /**
   * The text style is strikethrough
   *
   * @public
   * @remarks
   * HTML Attribute: strikethrough
   */
  @attr({ mode: 'boolean' })
  strikethrough: boolean = false;

  /**
   * An text can take up the width of its container.
   *
   * @public
   * @remarks
   * HTML Attribute: block
   */
  @attr({ mode: 'boolean' })
  block: boolean = false;

  /**
   * THe Text size
   *
   * @public
   * @remarks
   * HTML Attribute: size
   *
   */
  @attr
  size: TextSize;

  /**
   * THe Text font
   *
   * @public
   * @remarks
   * HTML Attribute: font
   */
  @attr
  font: TextFont;

  /**
   * THe Text weight
   *
   * @public
   * @remarks
   * HTML Attribute: weight
   */
  @attr
  weight: TextWeight;

  /**
   * THe Text align
   *
   * @public
   * @remarks
   * HTML Attribute: align
   */
  @attr
  align: TextAlign;
}
