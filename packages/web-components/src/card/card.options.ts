import { ValuesOf } from '@microsoft/fast-foundation';

/**
 * The size variations for the card component
 * @public
 */
export const CardSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * The types for card size
 * @public
 */
export type CardSize = ValuesOf<typeof CardSize>;

/**
 * The appearance variations for the card component
 * @public
 */
export const CardAppearance = {
  filled: 'filled',
  filledAlternative: 'filled-alternative',
  outline: 'outline',
  subtle: 'subtle',
} as const;

/**
 * The types for card appearance
 * @public
 */
export type CardAppearance = ValuesOf<typeof CardAppearance>;

/**
 * The orientation variations for the card component
 * @public
 */
export const CardOrientation = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const;

/**
 * The types for card orientations
 * @public
 */
export type CardOrientation = ValuesOf<typeof CardOrientation>;

/**
 * The focus mode variations for the card component
 * @public
 */
export const CardFocusMode = {
  off: 'off',
  noTab: 'no-tab',
  tabExit: 'tab-exit',
  tabOnly: 'tab-only',
} as const;

/**
 * The types for card orientations
 * @public
 */
export type CardFocusMode = ValuesOf<typeof CardFocusMode>;
