import { AnchorOptions, ValuesOf } from '@microsoft/fast-foundation';
import { ButtonAppearance, ButtonShape, ButtonSize } from '../button/button.options.js';

/**
 * Anchor Appearance constants
 * @public
 */
export const AnchorAppearance = ButtonAppearance;

/**
 * A Anchor can be secondary, primary, outline, subtle, transparent
 * @public
 */
export type AnchorAppearance = ValuesOf<typeof AnchorAppearance>;

/**
 * A Anchor can be square, circular or rounded.
 * @public
 */
export const AnchorShape = ButtonShape;

/**
 * A Anchor can be square, circular or rounded
 * @public
 */
export type AnchorShape = ValuesOf<typeof AnchorShape>;

/**
 * A Anchor can be a size of small, medium or large.
 * @public
 */
export const AnchorSize = ButtonSize;

/**
 * A Anchor can be on of several preset sizes.
 * @public
 */
export type AnchorSize = ValuesOf<typeof AnchorSize>;

export { AnchorOptions };
