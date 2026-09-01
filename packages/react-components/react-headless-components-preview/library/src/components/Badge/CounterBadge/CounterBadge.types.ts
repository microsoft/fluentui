import type { CounterBadgeBaseState } from '@fluentui/react-badge';

export type { BadgeSlots, CounterBadgeBaseProps as CounterBadgeProps } from '@fluentui/react-badge';

/**
 * CounterBadge component state.
 */
export type CounterBadgeState = CounterBadgeBaseState & {
  root: {
    /**
     * The numeric count before overflow formatting.
     */
    'data-count': string;

    /**
     * Present when the badge renders as a dot.
     */
    'data-dot'?: '';

    /**
     * Present when the badge has no visible count or dot.
     */
    'data-hidden'?: '';

    /**
     * Present when the count exceeds the configured overflow count.
     */
    'data-overflowed'?: '';
  };
};
