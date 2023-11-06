import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverButtonSlots = {
  root: Slot<'div'>;
};

/**
 * TeachingPopoverButton Props
 */
export type TeachingPopoverButtonProps = ComponentProps<TeachingPopoverButtonSlots> & {};

/**
 * State used in rendering TeachingPopoverButton
 */
export type TeachingPopoverButtonState = ComponentState<TeachingPopoverButtonSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TeachingPopoverButtonProps.
// & Required<Pick<TeachingPopoverButtonProps, 'propName'>>
