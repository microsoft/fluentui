import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TagButtonSlots = {
  root: Slot<'div'>;
};

/**
 * TagButton Props
 */
export type TagButtonProps = ComponentProps<TagButtonSlots> & {};

/**
 * State used in rendering TagButton
 */
export type TagButtonState = ComponentState<TagButtonSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TagButtonProps.
// & Required<Pick<TagButtonProps, 'propName'>>
