import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { createImmutableSet, emptyImmutableSet, ImmutableSet } from '../utils/ImmutableSet';
import type { TreeProps, TreeSelectionChangeData } from '../Tree';

export function useFlatTreeSelection(props: Pick<TreeProps, 'selection' | 'defaultSelectedItems' | 'selectedItems'>) {
  const [selectedItems, setSelectedItems] = useControllableState({
    state: React.useMemo(() => props.selectedItems && createImmutableSet(props.selectedItems), [props.selectedItems]),
    defaultState: props.defaultSelectedItems && (() => createImmutableSet(props.defaultSelectedItems)),
    initialState: emptyImmutableSet,
  });
  const updateSelectedItems = useEventCallback((data: TreeSelectionChangeData) =>
    setSelectedItems(currentSelectedItems => createNextSelectedItems(data, currentSelectedItems)),
  );
  return [selectedItems, updateSelectedItems] as const;
}

function createNextSelectedItems(
  data: TreeSelectionChangeData,
  previousSelectedItems: Iterable<string | [string, 'mixed' | boolean]>,
): Iterable<string | [string, 'mixed' | boolean]> {
  if (data.value === null) {
    return previousSelectedItems;
  }
  const previousSelectedItemsHasId = previousSelectedItems.has(data.value);
  if (data.value ? previousSelectedItemsHasId : !previousSelectedItemsHasId) {
    return previousSelectedItems;
  }
  const nextOpenItems = createImmutableSet(previousSelectedItems);
  return data.value ? nextOpenItems.add(data.value) : nextOpenItems.delete(data.value);
}
