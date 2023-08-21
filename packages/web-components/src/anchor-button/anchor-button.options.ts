import type { AnchorOptions } from '@microsoft/fast-foundation/anchor.js';
import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
import { ButtonAppearance, ButtonShape, ButtonSize } from '../button/button.options.js';

/**
 * Anchor Button Appearance constants
 * @public
 */
export const AnchorButtonAppearance = ButtonAppearance;

/**
 * An Anchor Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export type AnchorButtonAppearance = ValuesOf<typeof AnchorButtonAppearance>;

/**
 * An Anchor Button can be square, circular or rounded.
 * @public
 */
export const AnchorButtonShape = ButtonShape;

/**
 * An Anchor Button can be square, circular or rounded
 * @public
 */
export type AnchorButtonShape = ValuesOf<typeof AnchorButtonShape>;

/**
 * An Anchor Button can be a size of small, medium or large.
 * @public
 */
export const AnchorButtonSize = ButtonSize;

/**
 * An Anchor Button can be on of several preset sizes.
 * @public
 */
export type AnchorButtonSize = ValuesOf<typeof AnchorButtonSize>;

export { AnchorOptions as AnchorButtonOptions };
