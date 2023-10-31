import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ListItemSlots = {
  root: NonNullable<Slot<'div', 'li' | 'dt' | 'dd'>>;
};

/**
 * ListItem Props
 */
export type ListItemProps = ComponentProps<ListItemSlots> & {};

/**
 * State used in rendering ListItem
 */
export type ListItemState = ComponentState<ListItemSlots>;
