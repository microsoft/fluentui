import { Checkbox } from '@fluentui/react-checkbox';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import { ListItemActionEvent, ListItemActionEventName } from '../../events/ListItemActionEvent';

export type ListItemSlots = {
  root: NonNullable<Slot<'li', 'div'>>;
  checkmark?: Slot<typeof Checkbox>;
};

export type ListItemValue = string | number;

export type ListItemActionEventData = EventData<typeof ListItemActionEventName, ListItemActionEvent> & {
  value: ListItemValue;
};
/**
 * ListItem Props
 */
export type ListItemProps = ComponentProps<ListItemSlots> & {
  value?: ListItemValue;
  onAction?: EventHandler<ListItemActionEventData>;
  disabledSelection?: boolean;
};

/**
 * State used in rendering ListItem
 */
export type ListItemState = ComponentState<ListItemSlots> & {
  selectable: boolean;
  navigable: boolean;
  disabled?: boolean;
};
