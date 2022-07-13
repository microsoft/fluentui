import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogActionsSlots = {
  root: Slot<'div'>;
};

/**
 * DialogActions Props
 */
export type DialogActionsProps = ComponentProps<DialogActionsSlots> & {};

/**
 * State used in rendering DialogActions
 */
export type DialogActionsState = ComponentState<DialogActionsSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from DialogActionsProps.
// & Required<Pick<DialogActionsProps, 'propName'>>
