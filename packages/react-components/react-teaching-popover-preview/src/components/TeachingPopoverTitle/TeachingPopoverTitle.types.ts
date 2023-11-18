import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverTitleSlots = {
  root: Slot<'div'>;
};

/**
 * TeachingPopoverTitle Props
 */
export type TeachingPopoverTitleProps = ComponentProps<TeachingPopoverTitleSlots> & {};

/**
 * State used in rendering TeachingPopoverTitle
 */
export type TeachingPopoverTitleState = ComponentState<TeachingPopoverTitleSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TeachingPopoverTitleProps.
// & Required<Pick<TeachingPopoverTitleProps, 'propName'>>
