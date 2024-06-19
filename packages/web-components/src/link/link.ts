import { attr } from '@microsoft/fast-element';
import { BaseAnchor } from '../anchor-button/anchor-button.js';
import { toggleState } from '../utils/element-internals.js';
import { type LinkAppearance } from './link.options.js';

/**
 * An Anchor Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @slot start - Content which can be provided before the link content
 * @slot end - Content which can be provided after the link content
 * @slot - The default slot for link content
 *
 * @public
 */
export class Link extends BaseAnchor {
  /**
   * The appearance the link should have.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr
  public appearance?: LinkAppearance | undefined;

  /**
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: LinkAppearance | undefined, next: LinkAppearance | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * The link is inline with text
   * In chromium browsers, if the link is contained within a semantic
   * text element (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`) or `fluent-text`,
   * `:host-context()` ensures inline links are styled appropriately.
   *
   * @public
   * @remarks
   * HTML Attribute: `inline`
   */
  @attr({ mode: 'boolean' })
  public inline: boolean = false;

  /**
   * Handles changes to inline attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public inlineChanged(prev: boolean, next: boolean) {
    toggleState(this.elementInternals, 'inline', next);
  }
}
