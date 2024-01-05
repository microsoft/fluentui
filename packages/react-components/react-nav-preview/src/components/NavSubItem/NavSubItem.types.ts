import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavSubItemSlots = {
  root: Slot<'div'>;
};

/**
 * NavSubItem Props
 */
export type NavSubItemProps = ComponentProps<NavSubItemSlots> & {};

/**
 * State used in rendering NavSubItem
 */
export type NavSubItemState = ComponentState<NavSubItemSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NavSubItemProps.
// & Required<Pick<NavSubItemProps, 'propName'>>
