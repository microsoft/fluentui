import { BadgeProps, BadgeState } from '../Badge/index';

/**
 * {@docCategory PresenceBadge}
 */
export type PresenceBadgeStatus = 'busy' | 'outOfOffice' | 'away' | 'available' | 'offline';

/**
 * {@docCategory PresenceBadge}
 */
export interface PresenceBadgeProps extends Omit<BadgeProps, 'shape' | 'appearance'> {
  /**
   * A PresenceBadge can represent several status
   * @defaultvalue available
   */
  status?: PresenceBadgeStatus;
  /**
   * Modifies the display to indicate that the user is out of office.
   * This can be combined with any status to display an out-of-office version of that status
   * @defaultvalue false
   */
  outOfOffice?: boolean;
}

/**
 * {@docCategory Badge}
 */
export interface PresenceBadgeState extends BadgeState {
  /**
   * A PresenceBadge can represent several status
   * @defaultvalue available
   */
  status: PresenceBadgeStatus;
  /**
   * Modifies the display to indicate that the user is out of office.
   * This can be combined with any status to display an out-of-office version of that status
   * @defaultvalue false
   */
  outOfOffice: boolean;
}
