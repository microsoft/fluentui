import type {
  CounterBadgeProps as CounterBadgeBaseProps,
  CounterBadgeState as CounterBadgeBaseState,
} from '@fluentui/react-headless-components-preview/badge';
import type { BadgeProps } from '../Badge/Badge.types';

export type { BadgeSlots as CounterBadgeSlots } from '@fluentui/react-headless-components-preview/badge';

export type CounterBadgeProps = CounterBadgeBaseProps & {
  /**
   * A CounterBadge can be filled or ghosted.
   *
   * @default 'filled'
   */
  appearance?: 'filled' | 'ghost';

  /**
   * Semantic color for the CounterBadge.
   *
   * @default 'brand'
   */
  color?: Extract<BadgeProps['color'], 'brand' | 'danger' | 'important' | 'informative'>;

  /**
   * A CounterBadge can be circular or rounded.
   *
   * @default 'circular'
   */
  shape?: 'circular' | 'rounded';

  /**
   * Size of the CounterBadge.
   *
   * @default 'medium'
   */
  size?: BadgeProps['size'];
};

export type CounterBadgeState = CounterBadgeBaseState & {
  appearance: NonNullable<CounterBadgeProps['appearance']>;
  color: NonNullable<CounterBadgeProps['color']>;
  shape: NonNullable<CounterBadgeProps['shape']>;
  size: NonNullable<CounterBadgeProps['size']>;
  root: CounterBadgeBaseState['root'] & {
    'data-appearance': NonNullable<CounterBadgeProps['appearance']>;
    'data-color': NonNullable<CounterBadgeProps['color']>;
    'data-shape': NonNullable<CounterBadgeProps['shape']>;
    'data-size': NonNullable<CounterBadgeProps['size']>;
  };
};
