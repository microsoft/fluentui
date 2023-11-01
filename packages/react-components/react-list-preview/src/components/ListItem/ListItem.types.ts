import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Checkbox } from '@fluentui/react-checkbox';

export type ListItemSlots = {
  root: NonNullable<Slot<'li', 'div' | 'dt' | 'dd'>>;
  checkbox?: Slot<typeof Checkbox>;
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
export type ListItemState = ComponentState<ListItemSlots> & { selectable: boolean };
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ListItemProps.
// & Required<Pick<ListItemProps, 'propName'>>
