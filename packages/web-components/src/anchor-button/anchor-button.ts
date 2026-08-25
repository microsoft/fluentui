import { StartEnd, type StartEndOptions } from '../patterns/start-end.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { BaseAnchor } from './anchor-button.base.js';
import type { AnchorButtonAppearance, AnchorButtonShape, AnchorButtonSize } from './anchor-button.options.js';

/**
 * Anchor configuration options
 *
 * @public
 */
export type AnchorOptions = StartEndOptions<AnchorButton>;

/**
 * An Anchor Custom HTML Element.
 * Based on BaseAnchor and includes style and layout specific attributes
 *
 * @tag fluent-anchor-button
 *
 * @presentational {AnchorButtonAppearance | undefined} appearance - The appearance the anchor button should have.
 * @presentational {AnchorButtonShape | undefined} shape - The shape the anchor button should have.
 * @presentational {AnchorButtonSize | undefined} size - The size the anchor button should have.
 * @presentational {boolean} icon-only - The anchor button has an icon only, no text content.
 *
 * @public
 */
export class AnchorButton extends BaseAnchor {}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface AnchorButton extends StartEnd {}
applyMixins(AnchorButton, StartEnd);
