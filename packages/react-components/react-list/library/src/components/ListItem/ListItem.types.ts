import type * as React from 'react';
import type { Checkbox } from '@fluentui/react-checkbox';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';

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

export type ListItemActionEventData = EventData<
  'ListItemAction',
  CustomEvent<{ originalEvent: React.MouseEvent | React.KeyboardEvent }>
> & {
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
 * ListItem props accepted by `useListItemBase_unstable`.
 */
export type ListItemBaseProps = ComponentProps<ListItemBaseSlots> &
  Pick<ListItemProps, 'value' | 'onAction' | 'disabledSelection'>;

/**
 * State used in rendering ListItem
 */
export type ListItemState = ComponentState<ListItemSlots> & {
  selectable: boolean;
  navigable: boolean;
  disabled?: boolean;
};

/**
 * State returned by `useListItemBase_unstable`.
 */
export type ListItemBaseState = ComponentState<ListItemBaseSlots> &
  Pick<ListItemState, 'selectable' | 'navigable' | 'disabled'>;
