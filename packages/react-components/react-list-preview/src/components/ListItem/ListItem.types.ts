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
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ListItemProps.
// & Required<Pick<ListItemProps, 'propName'>>
