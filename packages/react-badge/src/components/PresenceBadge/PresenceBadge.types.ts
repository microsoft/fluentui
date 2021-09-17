import type { BadgeProps, BadgeState } from '../Badge/index';

/**
 * {@docCategory PresenceBadge}
 */
export type PresenceBadgeStatus = 'busy' | 'outOfOffice' | 'away' | 'available' | 'offline' | 'doNotDisturb';

/**
 * {@docCategory PresenceBadge}
 */
export type PresenceBadgeProps = Omit<BadgeProps, 'shape' | 'appearance'> & {
  /**
   * Represents several status
   * @defaultvalue available
   */
  status?: PresenceBadgeStatus;
  /**
   * Modifies the display to indicate that the user is out of office.
   * This can be combined with any status to display an out-of-office version of that status
   * @defaultvalue false
   */
  outOfOffice?: boolean;
};

/**
 * {@docCategory Badge}
 */
export type PresenceBadgeState = Omit<BadgeState, 'shape' | 'appearance'> & {
  /**
   * Represents several status
   * @defaultvalue available
   */
  status: PresenceBadgeStatus;
  /**
   * Modifies the display to indicate that the user is out of office.
   * This can be combined with any status to display an out-of-office version of that status
   * @defaultvalue false
   */
  outOfOffice: boolean;
};
