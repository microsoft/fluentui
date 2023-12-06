import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverHeaderSlots = {
  root: Slot<'div'>;
};

/**
 * TeachingPopoverHeader Props
 */
export type TeachingPopoverHeaderProps = ComponentProps<TeachingPopoverHeaderSlots> & {};

/**
 * State used in rendering TeachingPopoverHeader
 */
export type TeachingPopoverHeaderState = ComponentState<TeachingPopoverHeaderSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TeachingPopoverHeaderProps.
// & Required<Pick<TeachingPopoverHeaderProps, 'propName'>>
