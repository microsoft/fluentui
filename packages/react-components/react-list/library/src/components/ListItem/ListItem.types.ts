import type { Checkbox } from '@fluentui/react-checkbox';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { ListItemActionEvent, ListItemActionEventName } from '../../events/ListItemActionEvent';

export type ListItemSlots = {
  root: NonNullable<Slot<'li', 'div'>>;
  checkmark?: Slot<typeof Checkbox>;
};

/**
 * ListItem slots without any design dependency, used by `useListItemBase_unstable`.
 */
export type ListItemBaseSlots = {
  root: NonNullable<Slot<'li', 'div'>>;
  checkmark?: Slot<'input'>;
};

export type ListItemValue = string | number;

export type ListItemActionEventData = EventData<typeof ListItemActionEventName, ListItemActionEvent> & {
  value: ListItemValue;
};

type ListItemOwnProps = {
  value?: ListItemValue;
  onAction?: EventHandler<ListItemActionEventData>;
  disabledSelection?: boolean;
};

/**
 * ListItem Props
 */
export type ListItemProps = ComponentProps<ListItemSlots> & ListItemOwnProps;

/**
 * ListItem props accepted by `useListItemBase_unstable`.
 */
export type ListItemBaseProps = ComponentProps<ListItemBaseSlots> & ListItemOwnProps;

type ListItemOwnState = {
  selectable: boolean;
  navigable: boolean;
  disabled?: boolean;
};

/**
 * State used in rendering ListItem
 */
export type ListItemState = ComponentState<ListItemSlots> & ListItemOwnState;

/**
 * State returned by `useListItemBase_unstable`.
 */
export type ListItemBaseState = ComponentState<ListItemBaseSlots> & ListItemOwnState;
