import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ListItemSlots = {
  root: NonNullable<Slot<'li', 'div' | 'dt' | 'dd'>>;
  checkmark?: Slot<'div'>;
};

/**
 * ListItem Props
 */
export type ListItemProps = ComponentProps<ListItemSlots> & {
  value?: string | number;
};

/**
 * State used in rendering ListItem
 */
export type ListItemState = ComponentState<ListItemSlots> & {};
