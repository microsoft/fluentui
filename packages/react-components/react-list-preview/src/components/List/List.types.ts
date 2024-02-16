import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, SelectionMode, SelectionItemId } from '@fluentui/react-utilities';
import type { ListSelectionState } from '../../hooks/types';

export type ListSlots = {
  root: NonNullable<Slot<'ul', 'div' | 'ol'>>;
};

/**
 * List Props
 */
export type ListProps = ComponentProps<ListSlots> & {
  selectable?: boolean;
  selectionMode?: SelectionMode;
  selectedItems?: SelectionItemId[];
  defaultSelectedItems?: SelectionItemId[];
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onSelectionChange?: (event: React.SyntheticEvent, data: { selectedItems: SelectionItemId[] }) => void;
};

export type ListContextValue = {
  selection?: ListSelectionState;
  as?: 'div' | 'ol' | 'ul';
};

export type ListContextValues = {
  listContext: ListContextValue;
};

/**
 * State used in rendering List
 */
export type ListState = ComponentState<ListSlots> & ListContextValue;
