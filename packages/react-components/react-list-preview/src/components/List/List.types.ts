import * as React from 'react';

import type {
  ComponentProps,
  ComponentState,
  Slot,
  SelectionMode,
  SelectionItemId,
  EventHandler,
  EventData,
} from '@fluentui/react-utilities';
import type { ListSelectionState } from '../../hooks/types';
import { ListAccessibilityRoles } from '../../hooks/useListAccessibilityRoles';

export type ListSlots = {
  root: NonNullable<Slot<'ul', 'div' | 'ol'>>;
};

export type OnListSelectionChangeData = EventData<'change', React.SyntheticEvent> & {
  selectedItems: SelectionItemId[];
};

/**
 * List Props
 */
export type ListProps = ComponentProps<ListSlots> & {
  selectionMode?: SelectionMode;
  selectedItems?: SelectionItemId[];
  defaultSelectedItems?: SelectionItemId[];
  onSelectionChange?: EventHandler<OnListSelectionChangeData>;
};

export type ListContextValue = {
  selection?: ListSelectionState;
  as?: 'div' | 'ol' | 'ul';
  accessibilityRoles: ListAccessibilityRoles;
};

export type ListContextValues = {
  listContext: ListContextValue;
};

/**
 * State used in rendering List
 */
export type ListState = ComponentState<ListSlots> & ListContextValue;
