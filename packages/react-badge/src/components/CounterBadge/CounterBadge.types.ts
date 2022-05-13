import type { BadgeProps, BadgeState } from '../Badge/index';

export type CounterBadgeProps = Omit<BadgeProps, 'appearance' | 'color' | 'shape'> & {
  /**
   * A Badge can have different appearances that emphasize certain parts of it:
   *  - filled: The default appearance if one is not specified.
   *    The badge background is filled with color with a contrasting foreground text to match.
   *  - ghost: The badge background is transparent, with the foreground text taking color to emphasize it.
   * @default filled
   */
  appearance?: 'filled' | 'ghost';

  /**
   * Semantic colors for a counter badge
   * @default brand
   */
  color?: Extract<BadgeProps['color'], 'brand' | 'danger' | 'important' | 'informative'>;

  /**
   * Value displayed by the Badge
   * @default 0
   */
  count?: number;

  /**
   * If a dot should be displayed without the count
   * @default false
   */
  dot?: boolean;

  /**
   * Max number to be displayed
   * @default 99
   */
  overflowCount?: number;

  /**
   * A Badge can be circular or rounded
   * @default circular
   */
  shape?: 'circular' | 'rounded';

  /**
   * If the badge should be shown when count is 0
   * @default false
   */
  showZero?: boolean;
};

export type CounterBadgeState = Omit<BadgeState, 'appearance' | 'color' | 'shape'> &
  Required<Pick<CounterBadgeProps, 'appearance' | 'color' | 'count' | 'dot' | 'shape' | 'showZero'>>;
