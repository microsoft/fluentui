import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SplitNavItemSlots = {
  root: Slot<'div'>;
};

/**
 * SplitNavItem Props
 */
export type SplitNavItemProps = ComponentProps<SplitNavItemSlots> & {};

/**
 * State used in rendering SplitNavItem
 */
export type SplitNavItemState = ComponentState<SplitNavItemSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from SplitNavItemProps.
// & Required<Pick<SplitNavItemProps, 'propName'>>
