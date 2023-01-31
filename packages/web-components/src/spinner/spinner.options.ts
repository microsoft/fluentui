export type Values<T> = T[keyof T];
/**
 * SpinnerAppearance constants
 * @public
 */
export const SpinnerAppearance = {
  primary: 'primary',
  inverted: 'inverted',
} as const;

/**
 * A Spinner's appearance can be either primary or inverted
 * @public
 */
export type SpinnerAppearance = Values<typeof SpinnerAppearance>;

/**
 * SpinnerSize constants
 * @public
 */
export const SpinnerSize = {
  tiny: 'tiny',
  extraSmall: 'extra-small',
  small: 'small',
  medium: 'medium',
  large: 'large',
  extraLarge: 'extra-large',
  huge: 'huge',
} as const;

/**
 * A Spinner's size can be either small, tiny, extra-small, medium, large, extra-large, or huge
 * @public
 */
export type SpinnerSize = Values<typeof SpinnerSize>;
