import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavDrawerSlots = {
  root: Slot<'div'>;
};

/**
 * NavDrawer Props
 */
export type NavDrawerProps = ComponentProps<NavDrawerSlots> & {};

/**
 * State used in rendering NavDrawer
 */
export type NavDrawerState = ComponentState<NavDrawerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NavDrawerProps.
// & Required<Pick<NavDrawerProps, 'propName'>>
