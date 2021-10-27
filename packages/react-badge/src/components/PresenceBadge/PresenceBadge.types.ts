import type { BadgeProps, BadgeState } from '../Badge/index';

export type PresenceBadgeStatus = 'busy' | 'outOfOffice' | 'away' | 'available' | 'offline' | 'doNotDisturb';

export interface PresenceBadgeCommons {
  /**
   * Represents several status
   * @default available
   */
  status: PresenceBadgeStatus;
  /**
   * Modifies the display to indicate that the user is out of office.
   * This can be combined with any status to display an out-of-office version of that status
   * @default false
   */
  outOfOffice: boolean;
}

export type PresenceBadgeProps = BadgeProps & Partial<PresenceBadgeCommons>;

export type PresenceBadgeState = BadgeState & PresenceBadgeCommons;
