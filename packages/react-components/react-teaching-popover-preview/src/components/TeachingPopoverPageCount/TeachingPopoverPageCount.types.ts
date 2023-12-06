import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverPageCountSlots = {
  root: Slot<'div'>;
};

/**
 * TeachingPopoverPageCount Props
 */
export type TeachingPopoverPageCountProps = ComponentProps<TeachingPopoverPageCountSlots> & {};

/**
 * State used in rendering TeachingPopoverPageCount
 */
export type TeachingPopoverPageCountState = ComponentState<TeachingPopoverPageCountSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TeachingPopoverPageCountProps.
// & Required<Pick<TeachingPopoverPageCountProps, 'propName'>>
