import { ButtonAppearance, ButtonShape, ButtonSize } from '../button/button.options.js';
import type { ButtonOptions } from '../button/index.js';
import type { ValuesOf } from '../utils/index.js';

/**
 * Toggle Button Appearance constants
 * @public
 */
export const ToggleButtonAppearance = ButtonAppearance;
/**
 * A Toggle Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export type ToggleButtonAppearance = ValuesOf<typeof ToggleButtonAppearance>;

/**
 * A Toggle Button can be square, circular or rounded.
 * @public
 */
export const ToggleButtonShape = ButtonShape;

/**
 * A Toggle Button can be square, circular or rounded
 * @public
 */
export type ToggleButtonShape = ValuesOf<typeof ToggleButtonShape>;

/**
 * A Toggle Button can be a size of small, medium or large.
 * @public
 */
export const ToggleButtonSize = ButtonSize;

/**
 * A Toggle Button can be on of several preset sizes.
 * @public
 */
export type ToggleButtonSize = ValuesOf<typeof ToggleButtonSize>;

export type { ButtonOptions as ToggleButtonOptions };
