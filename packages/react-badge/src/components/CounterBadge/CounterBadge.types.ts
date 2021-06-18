import { BadgeProps, BadgeState } from '../Badge/index';

/**
 * {@docCategory CounterBadge}
 */
export interface CounterBadgeProps extends Omit<BadgeProps, 'appearance' | 'shape'> {
  /**
   * A Badge can be circular or rounded
   * @defaultvalue circular
   */
  shape?: Extract<BadgeProps['shape'], 'rounded' | 'circular'>;

  /**
   * A Badge can be filled, ghost
   * @defaultvalue filled
   */
  appearance?: Extract<BadgeProps['appearance'], 'filled' | 'ghost'>;

  /**
   * Max number to be displayed
   * @defaultvalue 99
   */
  overflowCount?: number;

  /**
   * Value diplayed by the Badge
   * @defaultvalue 0
   */
  count?: number;

  /**
   * If the badge should be shown when count is 0
   * @defaultvalue false
   */
  showZero?: boolean;

  /**
   * If a dot badge should be displayed
   * @defaultvalue false
   */
  dot?: boolean;
}

/**
 * {@docCategory CounterBadge}
 */
export interface CounterBadgeState extends BadgeState {
  /**
   * Max number to be displayed
   * @defaultvalue 99
   */
  overflowCount: number;

  /**
   * Value diplayed by the Badge
   * @defaultvalue 0
   */
  count: number;

  /**
   * If the badge should be shown when count is 0
   * @defaultvalue false
   */
  showZero: boolean;

  /**
   * If a dot badge should be displayed
   * @defaultvalue false
   */
  dot: boolean;
}
