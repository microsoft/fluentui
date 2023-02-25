import { DividerOrientation, DividerRole, ValuesOf } from '@microsoft/fast-foundation';

/**
 * Fast Foundation DividerRole property
 * @public
 */
export { DividerRole };

/**
 * Fast Foundation Orientation property
 * @public
 */
export { DividerOrientation };

/**
 * Align content within divider
 * @public
 */
export const DividerAlignContent = {
  center: 'center',
  start: 'start',
  end: 'end',
} as const;

/**
 * The types for DividerAlignContent
 * @public
 */
export type DividerAlignContent = ValuesOf<typeof DividerAlignContent>;

/**
 * DividerAppearance - divider color defined by a design token alias.
 * @public
 */
export const DividerAppearance = {
  strong: 'strong',
  brand: 'brand',
  subtle: 'subtle',
  default: 'default',
} as const;

/**
 * The types for Appearance
 * @public
 */
export type DividerAppearance = ValuesOf<typeof DividerAppearance>;
