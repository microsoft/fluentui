import { GetRowIdInternal, SelectionStateInternal, UseTableOptions } from './types';
import { useMultipleSelection } from './useMultipleSelection';
import { useSingleSelection } from './useSingleSelection';

export function useSelection<TItem>(
  selectionMode: UseTableOptions<TItem>['selectionMode'],
  items: TItem[],
  getRowId: GetRowIdInternal<TItem>,
): SelectionStateInternal {
  const multipleSelectionState = useMultipleSelection(items, getRowId);
  const singleSelectionState = useSingleSelection();

  return selectionMode === 'multiselect' ? multipleSelectionState : singleSelectionState;
}
