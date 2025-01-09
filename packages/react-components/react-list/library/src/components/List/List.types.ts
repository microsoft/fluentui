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

export type ListSlots = {
  root: NonNullable<Slot<'ul', 'div' | 'ol'>>;
};

export type OnListSelectionChangeData = EventData<'change', React.SyntheticEvent> & {
  selectedItems: SelectionItemId[];
};

export type ListNavigationMode = 'items' | 'composite';

/**
 * List Props
 */
export type ListProps = ComponentProps<ListSlots> & {
  navigationMode?: ListNavigationMode;
  selectionMode?: SelectionMode;
  selectedItems?: SelectionItemId[];
  defaultSelectedItems?: SelectionItemId[];
  onSelectionChange?: EventHandler<OnListSelectionChangeData>;
};

export type ListContextValue = {
  navigationMode: ListNavigationMode | undefined;
  selection?: ListSelectionState;
  listItemRole: string;
  validateListItem: (listItemElement: HTMLElement) => void;
};

export type ListContextValues = {
  listContext: ListContextValue;
};

/**
 * State used in rendering List
 */
export type ListState = ComponentState<ListSlots> & ListContextValue;
