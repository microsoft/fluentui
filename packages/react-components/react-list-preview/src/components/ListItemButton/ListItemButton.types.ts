import { Button } from '@fluentui/react-button';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ListItemButtonSlots = {
  root: Slot<typeof Button>;
};

/**
 * ListItemButton Props
 */
export type ListItemButtonProps = ComponentProps<ListItemButtonSlots> & {};

/**
 * State used in rendering ListItemButton
 */
export type ListItemButtonState = ComponentState<ListItemButtonSlots>;
