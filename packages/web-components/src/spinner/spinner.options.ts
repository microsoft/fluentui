export type Values<T> = T[keyof T];
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
 * The type for Spinner size option
 * @public
 */
export type SpinnerSize = Values<typeof SpinnerSize>;

/**
 * The type for Spinner appearance option
 * @public
 */
export type SpinnerAppearance = Values<typeof SpinnerAppearance>;

/**
 * Spinner size options
 * @public
 */
export const SpinnerSize = {
  /**
   * A Spinner's size can be small, tiny, extra-small, medium, large, extra-large, or huge
   *
   */
  tiny: 'tiny',
  extraSmall: 'extra-small',
  small: 'small',
  medium: 'medium',
  large: 'large',
  extraLarge: 'extra-large',
  huge: 'huge',
} as const;
