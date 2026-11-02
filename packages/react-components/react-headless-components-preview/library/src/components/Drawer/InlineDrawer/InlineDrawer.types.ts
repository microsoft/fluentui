import type { InlineDrawerBaseProps, InlineDrawerBaseState } from '@fluentui/react-drawer';

export type { InlineDrawerSlots, InlineDrawerBaseProps as InlineDrawerProps } from '@fluentui/react-drawer';

export type InlineDrawerState = InlineDrawerBaseState & {
  root: {
    /**
     * Indicates whether the drawer is open, used for styling purposes.
     */
    'data-open'?: string;
    /**
     * The position of the drawer, used for styling purposes.
     */
    'data-position'?: InlineDrawerBaseProps['position'];
  };
};
