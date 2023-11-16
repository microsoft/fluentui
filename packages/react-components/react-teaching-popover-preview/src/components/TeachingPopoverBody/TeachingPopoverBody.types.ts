import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverBodySlots = {
  root: Slot<'div'>;
};

/**
 * TeachingPopoverBody Props
 */
export type TeachingPopoverBodyProps = ComponentProps<TeachingPopoverBodySlots> & {};

/**
 * State used in rendering TeachingPopoverBody
 */
export type TeachingPopoverBodyState = ComponentState<TeachingPopoverBodySlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TeachingPopoverBodyProps.
// & Required<Pick<TeachingPopoverBodyProps, 'propName'>>
