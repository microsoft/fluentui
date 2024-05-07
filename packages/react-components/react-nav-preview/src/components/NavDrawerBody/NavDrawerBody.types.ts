import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavDrawerBodySlots = {
  root: Slot<'div'>;
};

/**
 * NavDrawerBody Props
 */
export type NavDrawerBodyProps = ComponentProps<NavDrawerBodySlots> & {};

/**
 * State used in rendering NavDrawerBody
 */
export type NavDrawerBodyState = ComponentState<NavDrawerBodySlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NavDrawerBodyProps.
// & Required<Pick<NavDrawerBodyProps, 'propName'>>
