import { ValuesOf } from '@microsoft/fast-foundation';

/**
 * Align content within divider
 * @public
 */
export const AlignContent = {
  /**
   * Default. Center align content.
   */
  center: 'center',
  /**
   * Align content at flex start
   */
  start: 'start',
  /**
   * Align content at flex end
   */
  end: 'end',
} as const;

/**
 * The types for AlignContent
 * @public
 */
export type AlignContent = ValuesOf<typeof AlignContent>;

/**
 * Appearance is divider color
 * @public
 */
export const Appearance = {
  /**
   * Strong corresponds to design token alias.
   */
  strong: 'strong',
  /**
   * Brand corresponds to design token alias
   */
  brand: 'brand',
  /**
   * Subtle corresponds to design token alias
   */
  subtle: 'subtle',
  /**
   * Default corresponds to design token alias
   */
  default: 'default',
} as const;

/**
 * The types for Appearance
 * @public
 */
export type Appearance = ValuesOf<typeof Appearance>;
