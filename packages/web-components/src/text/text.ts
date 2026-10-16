import { FASTElement } from '@microsoft/fast-element';
import type { TextAlign, TextFont, TextSize, TextWeight } from './text.options.js';

/**
 * The base class used for constructing a fluent-text custom element
 *
 * @tag fluent-text
 *
 * @slot - The default slot for the text content of the component. Can be any valid HTML element, but is typically a semantic element such as a heading or paragraph.
 * @presentational {boolean} nowrap - The text will not wrap. In Fluent UI React v9 this is "wrap"; boolean attributes which default to true in HTML can't be switched off in the DOM.
 * @presentational {boolean} truncate - The text truncates.
 * @presentational {boolean} italic - The text style is italic.
 * @presentational {boolean} underline - The text style is underlined.
 * @presentational {boolean} strikethrough - The text style has a strikethrough.
 * @presentational {boolean} block - The text can take up the width of its container.
 * @presentational {TextSize | undefined} size - The text size.
 * @presentational {TextFont | undefined} font - The text font.
 * @presentational {TextWeight | undefined} weight - The text weight.
 * @presentational {TextAlign | undefined} align - The text alignment.
 *
 * @public
 */
export class Text extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();
}
