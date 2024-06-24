import { Checkbox } from '@fluentui/react-checkbox';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ListItemActionEvent } from '../../events/ListItemActionEvent';

export type ListItemSlots = {
  root: NonNullable<Slot<'li', 'div'>>;
  checkmark?: Slot<typeof Checkbox>;
};

export type ListItemValue = string | number;

export type ListItemActionData = { value: ListItemValue };

/**
 * ListItem Props
 */
export type ListItemProps = ComponentProps<ListItemSlots> & {
  value?: ListItemValue;
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- using custom event here with no data
  onAction?: (e: ListItemActionEvent, data: ListItemActionData) => void;
};

/**
 * State used in rendering ListItem
 */
export type ListItemState = ComponentState<ListItemSlots> & { selectable: boolean; navigable: boolean };
