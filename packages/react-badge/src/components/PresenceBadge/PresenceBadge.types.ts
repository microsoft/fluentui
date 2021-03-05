import { BadgeProps, BadgeState } from '../Badge/index';

/**
 * {@docCategory PresenceBadge}
 */
export type PresenceBadgeStatus = 'busy' | 'oof' | 'away' | 'available' | 'offline';

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
   * A PresenceBadge can represent status of someone out of the office
   * @defaultvalue true
   */
  inOffice?: boolean;
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
   * A PresenceBadge can represent status of someone out of the office
   * @defaultvalue true
   */
  inOffice: boolean;
}
