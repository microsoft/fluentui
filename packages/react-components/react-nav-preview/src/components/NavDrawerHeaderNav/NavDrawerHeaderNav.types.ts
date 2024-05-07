import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavDrawerHeaderNavSlots = {
  root: Slot<'div'>;
};

/**
 * NavDrawerHeaderNav Props
 */
export type NavDrawerHeaderNavProps = ComponentProps<NavDrawerHeaderNavSlots> & {};

/**
 * State used in rendering NavDrawerHeaderNav
 */
export type NavDrawerHeaderNavState = ComponentState<NavDrawerHeaderNavSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NavDrawerHeaderNavProps.
// & Required<Pick<NavDrawerHeaderNavProps, 'propName'>>
