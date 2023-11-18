import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverActionsSlots = {
  root: Slot<'div'>;
};

/**
 * TeachingPopoverActions Props
 */
export type TeachingPopoverActionsProps = ComponentProps<TeachingPopoverActionsSlots> & {};

/**
 * State used in rendering TeachingPopoverActions
 */
export type TeachingPopoverActionsState = ComponentState<TeachingPopoverActionsSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TeachingPopoverActionsProps.
// & Required<Pick<TeachingPopoverActionsProps, 'propName'>>
