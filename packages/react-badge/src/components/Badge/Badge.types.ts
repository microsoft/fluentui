import type { IntrinsicShorthandProps, ComponentProps, ComponentState } from '@fluentui/react-utilities';

export type BadgeSlots = {
  // React internally has a non-standard `color` attribute for HTML elements
  root: Omit<IntrinsicShorthandProps<'div'>, 'color'>;
  icon?: IntrinsicShorthandProps<'span'>;
};

export type BadgeCommons = {
  /**
   * A Badge can be filled, outline, ghost, inverted
   * @defaultvalue filled
   */
  appearance: 'filled' | 'ghost' | 'outline' | 'tint';

  /**
   * A Badge can be one of preset colors
   * @defaultvalue brand
   */
  color: 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning';

  /**
   * A Badge can position the icon before or after the content.
   * @defaultvalue before
   */
  iconPosition: 'before' | 'after';

  /**
   * A Badge can be square, circular or rounded.
   * @defaultvalue circular
   */
  shape: 'circular' | 'rounded' | 'square';

  /**
   * A Badge can be on of several preset sizes.
   * @defaultvalue medium
   */
  size: 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
};

export type BadgeProps = ComponentProps<Partial<BadgeSlots>> & Partial<BadgeCommons>;
export type BadgeState = ComponentState<BadgeSlots> & BadgeCommons;
