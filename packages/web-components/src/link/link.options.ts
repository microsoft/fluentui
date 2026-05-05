import { FluentDesignSystem } from '../fluent-design-system.js';
import { AnchorAttributes, AnchorTarget } from '../anchor-button/anchor-button.options.js';
import type { ValuesOf } from '../utils/typings.js';

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

/**
 * The tag name for the link element.
 *
 * @public
 */
export const tagName = `${FluentDesignSystem.prefix}-link` as const;
