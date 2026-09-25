import { BaseAnchor } from '../anchor-button/anchor-button.base.js';
import type { LinkAppearance } from './link.options.js';

/**
 * An Anchor Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @tag fluent-link
 *
 * @slot start - Content which can be provided before the link content
 * @slot end - Content which can be provided after the link content
 * @slot - The default slot for link content
 *
 * @presentational {LinkAppearance | undefined} appearance - The appearance the link should have.
 * @presentational {boolean} inline - The link is inline with text. In chromium browsers, if the link is contained within a semantic text element (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`) or `fluent-text`, `:host-context()` ensures inline links are styled appropriately.
 *
 * @public
 */
export class Link extends BaseAnchor {}
