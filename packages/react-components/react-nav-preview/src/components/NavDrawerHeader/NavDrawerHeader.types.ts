import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavDrawerHeaderSlots = {
  root: Slot<'div'>;
};

/**
 * NavDrawerHeader Props
 */
export type NavDrawerHeaderProps = ComponentProps<NavDrawerHeaderSlots> & {};

/**
 * State used in rendering NavDrawerHeader
 */
export type NavDrawerHeaderState = ComponentState<NavDrawerHeaderSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NavDrawerHeaderProps.
// & Required<Pick<NavDrawerHeaderProps, 'propName'>>
