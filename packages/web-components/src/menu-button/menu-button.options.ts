import type { ButtonOptions } from '../button/button.options.js';
import { ButtonAppearance, ButtonShape, ButtonSize } from '../button/button.options.js';
import type { ValuesOf } from '../utils/index.js';

/**
 * Menu Button Appearance constants
 * @public
 */
export const MenuButtonAppearance = ButtonAppearance;

/**
 * A Menu Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export type MenuButtonAppearance = ValuesOf<typeof MenuButtonAppearance>;

/**
 * A Menu Button can be square, circular or rounded.
 * @public
 */
export const MenuButtonShape = ButtonShape;

/**
 * A Menu Button can be square, circular or rounded
 * @public
 */
export type MenuButtonShape = ValuesOf<typeof MenuButtonShape>;

/**
 * A Menu Button can be a size of small, medium or large.
 * @public
 */
export const MenuButtonSize = ButtonSize;

/**
 * A Menu Button can be on of several preset sizes.
 * @public
 */
export type MenuButtonSize = ValuesOf<typeof MenuButtonSize>;

export type { ButtonOptions as MenuButtonOptions };
