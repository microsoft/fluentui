import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ListItemButtonSlots = {
  root: Slot<'div'>;
};

/**
 * ListItemButton Props
 */
export type ListItemButtonProps = ComponentProps<ListItemButtonSlots> & {};

/**
 * State used in rendering ListItemButton
 */
export type ListItemButtonState = ComponentState<ListItemButtonSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ListItemButtonProps.
// & Required<Pick<ListItemButtonProps, 'propName'>>
