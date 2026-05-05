import type { BadgeSlots as BadgeBaseSlots, BadgeBaseProps, BadgeBaseState } from '@fluentui/react-badge';

/**
 * Badge component slots
 */
export type BadgeSlots = BadgeBaseSlots;

/**
 * Badge component props
 */
export type BadgeProps = BadgeBaseProps;

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
