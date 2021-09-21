import type { IntrinsicShorthandProps, ComponentProps, ComponentState } from '@fluentui/react-utilities';

export type BadgeSize = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

export type BadgeAppearance = 'filled' | 'outline' | 'ghost' | 'tint';

export type BadgeShape = 'rounded' | 'square' | 'circular';

export type BadgeColors =
  | 'brand'
  | 'danger'
  | 'severe'
  | 'warning'
  | 'success'
  | 'important'
  | 'informative'
  | 'subtle';

export type BadgeSlots = {
  // React internally has a non-standard `color` attribute for HTML elements
  root: Omit<IntrinsicShorthandProps<'div'>, 'color'>;
  icon?: IntrinsicShorthandProps<'span'>;
};

export interface BadgeCommons {
  /**
   * A Badge can be sized.
   * @default medium
   */
  size: BadgeSize;

  /**
   * A Badge can be square, circular or rounded
   * @default circular
   */
  shape: BadgeShape;

  /**
   * A Badge can be filled, outline, ghost, inverted
   * @default filled
   */
  appearance: BadgeAppearance;

  /**
   * A Badge has a preset of colors
   * @default brand
   */
  color: BadgeColors;

  /**
   * Position for Icon to be rendered
   * @default before
   */
  iconPosition: 'before' | 'after';
}

export interface BadgeProps extends ComponentProps<Partial<BadgeSlots>>, Partial<BadgeCommons> {}
export interface BadgeState extends ComponentState<BadgeSlots>, BadgeCommons {}
