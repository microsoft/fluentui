// Copied from @microsoft/fast-web-utilities

/**
 * Standard orientation values
 */
export const Orientation = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const;

/**
 * The orientation type
 */
export type Orientation = (typeof Orientation)[keyof typeof Orientation];
