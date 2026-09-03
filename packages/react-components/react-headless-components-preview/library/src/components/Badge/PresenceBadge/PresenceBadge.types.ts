import type { PresenceBadgeBaseState } from '@fluentui/react-badge';

export type {
  BadgeSlots,
  PresenceBadgeBaseProps as PresenceBadgeProps,
  PresenceBadgeStatus,
} from '@fluentui/react-badge';

/**
 * PresenceBadge component state.
 */
export type PresenceBadgeState = PresenceBadgeBaseState & {
  root: {
    /**
     * The current presence status.
     */
    'data-status': PresenceBadgeBaseState['status'];

    /**
     * Present when out-of-office status is combined with the current presence.
     */
    'data-out-of-office'?: string;
  };
};
