import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Button } from '@fluentui/react-button';

export type ListItemSlots = {
  root: NonNullable<Slot<'div', 'li' | 'dt' | 'dd'>>;
  button?: Slot<typeof Button>;
};

/**
 * ListItem Props
 */
export type ListItemProps = ComponentProps<ListItemSlots> & {};

/**
 * State used in rendering ListItem
 */
export type ListItemState = ComponentState<ListItemSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ListItemProps.
// & Required<Pick<ListItemProps, 'propName'>>
