import type { BadgeBaseState } from '@fluentui/react-badge';

export type { BadgeSlots, BadgeBaseProps as BadgeProps } from '@fluentui/react-badge';

/**
 * Badge component state
 */
export type BadgeState = BadgeBaseState & {
  root: {
    /**
     * Data attribute reflecting the icon position when an icon slot is present. Value is 'before' or 'after'.
     */
    'data-icon-position'?: 'before' | 'after';
  };
};
