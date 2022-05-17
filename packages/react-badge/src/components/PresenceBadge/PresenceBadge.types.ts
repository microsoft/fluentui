import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { BadgeProps, BadgeState, BadgeSlots } from '../Badge/Badge.types';

export type PresenceBadgeStatus =
  | 'busy'
  | 'outOfOffice'
  | 'away'
  | 'available'
  | 'offline'
  | 'doNotDisturb'
  | 'unknown';

export type PresenceBadgeProps = Omit<ComponentProps<Pick<BadgeSlots, 'root' | 'icon'>>, 'color'> &
  Pick<BadgeProps, 'size'> & {
    /**
     * Represents several status
     * @default available
     */
    status?: PresenceBadgeStatus;

    /**
     * Modifies the display to indicate that the user is out of office.
     * This can be combined with any status to display an out-of-office version of that status
     * @default false
     */
    outOfOffice?: boolean;
  };

export type PresenceBadgeState = ComponentState<BadgeSlots> &
  BadgeState &
  Required<Pick<PresenceBadgeProps, 'status' | 'outOfOffice'>>;
