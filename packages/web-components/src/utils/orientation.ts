// Copied from @microsoft/fast-web-utilities

/**
 * Standard orientation values
 * @public
 */
export const Orientation = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const;

/**
 * The orientation type
 * @public
 */
export type Orientation = (typeof Orientation)[keyof typeof Orientation];
