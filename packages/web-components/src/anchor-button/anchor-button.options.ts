import { ButtonAppearance, ButtonShape, ButtonSize } from '../button/button.options.js';
import type { ValuesOf } from '../utils/index.js';
import type { AnchorOptions } from './anchor-button.js';

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

/**
 * Anchor target values.
 *
 * @public
 */
export const AnchorTarget = {
  _self: '_self',
  _blank: '_blank',
  _parent: '_parent',
  _top: '_top',
} as const;

/**
 * Type for anchor target values.
 *
 * @public
 */
export type AnchorTarget = ValuesOf<typeof AnchorTarget>;

/**
 * Reflected anchor attributes.
 *
 * @public
 */
export const AnchorAttributes = {
  download: 'download',
  href: 'href',
  hreflang: 'hreflang',
  ping: 'ping',
  referrerpolicy: 'referrerpolicy',
  rel: 'rel',
  target: 'target',
  type: 'type',
} as const;

/**
 * Type for anchor attributes.
 *
 * @public
 */
export type AnchorAttributes = ValuesOf<typeof AnchorAttributes>;
