import type { ButtonOptions } from '@microsoft/fast-foundation/button.js';
import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
import { ButtonAppearance, ButtonShape, ButtonSize } from '../button/button.options.js';

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

export { ButtonOptions as ToggleButtonOptions };
