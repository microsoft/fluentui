import type {
  InlineDrawerSlots as InlineDrawerBaseSlots,
  InlineDrawerBaseProps,
  InlineDrawerBaseState,
} from '@fluentui/react-drawer';

export type InlineDrawerSlots = InlineDrawerBaseSlots;

export type InlineDrawerProps = InlineDrawerBaseProps;

export type InlineDrawerState = InlineDrawerBaseState & {
  root: {
    /**
     * Indicates whether the drawer is open, used for styling purposes.
     */
    'data-open'?: string;
    /**
     * The position of the drawer, used for styling purposes.
     */
    'data-position'?: InlineDrawerProps['position'];
  };
};
