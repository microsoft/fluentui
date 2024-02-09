import { Orientation } from '@microsoft/fast-web-utilities';
import type { ValuesOf } from '../utils/index.js';

/**
 * Divider roles
 * @public
 */
export const DividerRole = {
  /**
   * The divider semantically separates content
   */
  separator: 'separator',

  /**
   * The divider has no semantic value and is for visual presentation only.
   */
  presentation: 'presentation',
} as const;

/**
 * The types for Divider roles
 * @public
 */
export type DividerRole = ValuesOf<typeof DividerRole>;

/**
 * Divider orientation
 * @public
 */
export const DividerOrientation = Orientation;

/**
 * The types for Divider orientation
 * @public
 */
export type DividerOrientation = ValuesOf<typeof DividerOrientation>;

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
