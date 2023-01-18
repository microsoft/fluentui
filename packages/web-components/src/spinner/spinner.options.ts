export type Values<T> = T[keyof T];
/**
 * Spinner size options
 * @public
 */
export const SpinnerSize = {
  /**
   * A Spinner's size can be small, tiny, extra-small, medium, large, extra-large, or huge
   *
   */
  small: 'small',
  tiny: 'tiny',
  'extra-small': 'extra-small',
  medium: 'medium',
  large: 'large',
  'extra-large': 'extra-large',
  huge: 'huge',
} as const;

/**
 * Spinner appearance options
 * @public
 */
export const SpinnerAppearance = {
  /**
   * Use the primary appearance when the Spinner is on a light background
   *
   */
  primary: 'primary',

  /**
   * Use the inverted appearance when the Spinner is on a dark background
   *
   */
  inverted: 'inverted',
} as const;

/**
 * The types for Spinner size and appearance options
 * @public
 */
export type SpinnerSize = Values<typeof SpinnerSize>;
export type SpinnerAppearance = Values<typeof SpinnerAppearance>;
