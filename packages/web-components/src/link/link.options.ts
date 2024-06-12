import { AnchorAttributes, AnchorTarget } from '../anchor-button/anchor-button.options.js';
import type { ValuesOf } from '../utils/index.js';

/**
 * Link Appearance constants
 * @public
 */
export const LinkAppearance = {
  subtle: 'subtle',
} as const;

/**
 * An Link can be subtle or the default appearance
 * @public
 */
export type LinkAppearance = ValuesOf<typeof LinkAppearance>;

/**
 * Link target values.
 *
 * @public
 */
export const LinkTarget = AnchorTarget;

/**
 * Type for link target values.
 *
 * @public
 */
export type LinkTarget = ValuesOf<typeof AnchorTarget>;

/**
 * Reflected link attributes.
 *
 * @public
 */
export const LinkAttributes = AnchorAttributes;

/**
 * Type for link attributes.
 *
 * @public
 */
export type LinkAttributes = ValuesOf<typeof LinkAttributes>;
