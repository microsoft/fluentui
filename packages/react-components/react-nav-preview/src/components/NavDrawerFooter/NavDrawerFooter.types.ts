import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavDrawerFooterSlots = {
  root: Slot<'div'>;
};

/**
 * NavDrawerFooter Props
 */
export type NavDrawerFooterProps = ComponentProps<NavDrawerFooterSlots> & {};

/**
 * State used in rendering NavDrawerFooter
 */
export type NavDrawerFooterState = ComponentState<NavDrawerFooterSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NavDrawerFooterProps.
// & Required<Pick<NavDrawerFooterProps, 'propName'>>
