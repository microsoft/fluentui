import { attr, FASTElement } from '@microsoft/fast-element';
import type { TextAlign, TextFont, TextSize, TextWeight } from './text.options.js';

/**
 * A Text component for displaying text with various styles and attributes.
 * @class Text
 * @extends FASTElement
 *
 * @attr nowrap - When true, the text will not wrap.
 * @attr truncate - When true, the text truncates.
 * @attr italic - When true, the text style is italic.
 * @attr underline - When true, the text style is underline.
 * @attr strikethrough - When true, the text style is strikethrough.
 * @attr block - When true, the text takes up the width of its container.
 * @attr size - The size of the text.
 * @attr font - The font of the text.
 * @attr weight - The weight of the text.
 * @attr align - The alignment of the text.
 *
 * @slot - The default slot for the text content.
 *
 * @summary The Text component displays text with various styles and attributes.
 *
 * @tag fluent-text
 *
 * @public
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
  size?: TextSize;

  /**
   * THe Text font
   *
   * @public
   * @remarks
   * HTML Attribute: font
   */
  @attr
  font?: TextFont;

  /**
   * THe Text weight
   *
   * @public
   * @remarks
   * HTML Attribute: weight
   */
  @attr
  weight?: TextWeight;

  /**
   * THe Text align
   *
   * @public
   * @remarks
   * HTML Attribute: align
   */
  @attr
  align?: TextAlign;
}
