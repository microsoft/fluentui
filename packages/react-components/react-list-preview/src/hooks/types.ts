import * as React from 'react';

export type UseListFeaturesOptions<TItem> = {
  items: TItem[];
};

export type ListSelectionState = {
  isSelected: (item: string | number) => boolean;
  toggleItem: (e: React.SyntheticEvent, id: string | number) => void;
  deselectItem: (e: React.SyntheticEvent, id: string | number) => void;
  selectItem: (e: React.SyntheticEvent, id: string | number) => void;
  clearSelection: (e: React.SyntheticEvent) => void;
};

export type UseListSelectionOptions = {}; // multiselect etc

export interface ListFeaturesState<TItem> extends Pick<UseListFeaturesOptions<TItem>, 'items'> {
  selection: ListSelectionState;
}

export type ListFeaturePlugin = <TItem>(listState: ListFeaturesState<TItem>) => ListFeaturesState<TItem>;
