import { Checkbox } from '@fluentui/react-checkbox';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ListItemSlots = {
  root: NonNullable<Slot<'li', 'div'>>;
  checkmark?: Slot<typeof Checkbox>;
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
export type ListItemState = ComponentState<ListItemSlots> & { selectable?: boolean; hasCustomOnClick?: boolean };
