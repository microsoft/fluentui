import type {
  BadgeProps as BadgeBaseProps,
  BadgeState as BadgeBaseState,
} from '@fluentui/react-headless-components-preview/badge';
export type { BadgeSlots } from '@fluentui/react-headless-components-preview/badge';

export type BadgeProps = BadgeBaseProps & {
  /**
   * A Badge can be filled, outlined, ghost, or tinted.
   *
   * @default 'filled'
   */
  appearance?: 'filled' | 'ghost' | 'outline' | 'tint';

  /**
   * A Badge can use one of several preset colors.
   *
   * @default 'brand'
   */
  color?: 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning';

  /**
   * A Badge can be square, circular, or rounded.
   *
   * @default 'circular'
   */
  shape?: 'circular' | 'rounded' | 'square';

  /**
   * A Badge supports several preset sizes.
   *
   * @default 'medium'
   */
  size?: 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
};

export type BadgeState = BadgeBaseState & {
  appearance: NonNullable<BadgeProps['appearance']>;
  color: NonNullable<BadgeProps['color']>;
  shape: NonNullable<BadgeProps['shape']>;
  size: NonNullable<BadgeProps['size']>;
  root: BadgeBaseState['root'] & {
    'data-appearance': NonNullable<BadgeProps['appearance']>;
    'data-color': NonNullable<BadgeProps['color']>;
    'data-shape': NonNullable<BadgeProps['shape']>;
    'data-size': NonNullable<BadgeProps['size']>;
  };
};
