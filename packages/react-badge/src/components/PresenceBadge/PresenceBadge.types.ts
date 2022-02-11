import type { ComponentProps, ComponentState, ComponentRender } from '@fluentui/react-utilities';
import type { BadgeCommons, BadgeSlots } from '../Badge/Badge.types';

export type PresenceBadgeStatus = 'busy' | 'outOfOffice' | 'away' | 'available' | 'offline' | 'doNotDisturb';

type PresenceBadgeCommons = {
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
} & BadgeCommons;

export type PresenceBadgeProps = Omit<ComponentProps<Pick<BadgeSlots, 'root'>>, 'color'> &
  Partial<Pick<PresenceBadgeCommons, 'status' | 'outOfOffice' | 'size'>>;

export type PresenceBadgeState = PresenceBadgeCommons & ComponentState<BadgeSlots>;

export type PresenceBadgeRender = ComponentRender<PresenceBadgeState>;
