import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavSubItemGroupSlots = {
  root: Slot<'div'>;
};

/**
 * NavSubItemGroup Props
 */
export type NavSubItemGroupProps = ComponentProps<NavSubItemGroupSlots> & {};

/**
 * State used in rendering NavSubItemGroup
 */
export type NavSubItemGroupState = ComponentState<NavSubItemGroupSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NavSubItemGroupProps.
// & Required<Pick<NavSubItemGroupProps, 'propName'>>
