import * as React from 'react';
import { List } from '../List';
import { ListItem } from '../ListItem';

export type ListSelectionState = {
  isSelected: (item: string | number) => boolean;
  toggleItem: (e: React.SyntheticEvent, id: string | number) => void;
  deselectItem: (e: React.SyntheticEvent, id: string | number) => void;
  selectItem: (e: React.SyntheticEvent, id: string | number) => void;
  clearSelection: (e: React.SyntheticEvent) => void;
  toggleAllItems: (e: React.SyntheticEvent, itemIds: string[] | number[]) => void;
  getListProps: () => Pick<React.ComponentProps<typeof List>, 'role' | 'aria-multiselectable'>;
  getListItemProps: (
    value: string | number,
  ) => Pick<React.ComponentProps<typeof ListItem>, 'tabIndex' | 'role' | 'aria-selected'>;
  selectedItems: Set<string | number>;
};

export type UseListSelectionOptions = {}; // multiselect etc
