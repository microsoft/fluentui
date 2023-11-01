import * as React from 'react';

export type UseListFeaturesOptions<TItem extends { id: string | number }> = {
  items: TItem[];
};

export type ListSelectionState = {
  isSelected: (item: string | number) => boolean;
  toggleItem: (e: React.SyntheticEvent, id: string | number) => void;
  deselectItem: (e: React.SyntheticEvent, id: string | number) => void;
  selectItem: (e: React.SyntheticEvent, id: string | number) => void;
  clearSelection: (e: React.SyntheticEvent) => void;
  toggleAllItems: (e: React.SyntheticEvent) => void;
  selectedItems: Set<string | number>;
};

export type UseListSelectionOptions = {}; // multiselect etc

export interface ListFeaturesState<TItem extends { id: string | number }>
  extends Pick<UseListFeaturesOptions<TItem>, 'items'> {
  selection: ListSelectionState;
}

export type ListFeaturePlugin = <TItem extends { id: string | number }>(
  listState: ListFeaturesState<TItem>,
) => ListFeaturesState<TItem>;
