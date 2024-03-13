import { ButtonAppearance, ButtonShape, ButtonSize } from '../button/button.options.js';
import type { ButtonOptions } from '../button/button.options.js';
import type { ValuesOf } from '../utils/index.js';

/**
 * Compound Button Appearance constants
 * @public
 */
export const CompoundButtonAppearance = ButtonAppearance;

/**
 * A Compound Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export type CompoundButtonAppearance = ValuesOf<typeof CompoundButtonAppearance>;

/**
 * A Compound Button can be square, circular or rounded.
 * @public
 */
export const CompoundButtonShape = ButtonShape;

/**
 * A Compound Button can be square, circular or rounded
 * @public
 */
export type CompoundButtonShape = ValuesOf<typeof CompoundButtonShape>;

/**
 * A Compound Button can be a size of small, medium or large.
 * @public
 */
export const CompoundButtonSize = ButtonSize;

/**
 * A Compound Button can be on of several preset sizes.
 * @public
 */
export type CompoundButtonSize = ValuesOf<typeof CompoundButtonSize>;

export { ButtonOptions as CompoundButtonOptions };
