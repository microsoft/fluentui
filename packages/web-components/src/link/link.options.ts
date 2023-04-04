import { AnchorOptions, ValuesOf } from '@microsoft/fast-foundation';

/**
 * Link Appearance constants
 * @public
 */
export const LinkAppearance = {
  subtle: 'subtle',
  default: 'default',
};

/**
 * A Link can be subtle or default
 * @public
 */
export type LinkAppearance = ValuesOf<typeof LinkAppearance>;

export { AnchorOptions };
