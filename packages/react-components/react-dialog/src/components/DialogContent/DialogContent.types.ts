import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogContentSlots = {
  root: Slot<'div'>;
};

/**
 * DialogContent Props
 */
export type DialogContentProps = ComponentProps<DialogContentSlots> & {};

/**
 * State used in rendering DialogContent
 */
export type DialogContentState = ComponentState<DialogContentSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from DialogContentProps.
// & Required<Pick<DialogContentProps, 'propName'>>
