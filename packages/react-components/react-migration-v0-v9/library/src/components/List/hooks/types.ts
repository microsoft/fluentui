import { SelectionItemId } from '@fluentui/react-utilities';
import * as React from 'react';

export type ListSelectionState = {
  isSelected: (item: string | number) => boolean;
  toggleItem: (e: React.SyntheticEvent, id: string | number) => void;
  deselectItem: (e: React.SyntheticEvent, id: string | number) => void;
  selectItem: (e: React.SyntheticEvent, id: string | number) => void;
  clearSelection: (e: React.SyntheticEvent) => void;
  toggleAllItems: (e: React.SyntheticEvent, itemIds: string[] | number[]) => void;
  setSelectedItems: React.Dispatch<React.SetStateAction<Iterable<SelectionItemId>>>;
  selectedItems: SelectionItemId[];
};
