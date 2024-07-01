import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavDividerSlots = {
  root: Slot<'div'>;
};

/**
 * NavDivider Props
 */
export type NavDividerProps = ComponentProps<NavDividerSlots> & {};

/**
 * State used in rendering NavDivider
 */
export type NavDividerState = ComponentState<NavDividerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NavDividerProps.
// & Required<Pick<NavDividerProps, 'propName'>>
