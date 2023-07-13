import { useControllableState } from '@fluentui/react-utilities';
import type { TreeCheckedChangeData, TreeProps } from '../Tree';
import { TreeItemValue } from '../TreeItem';
import { ImmutableMap } from '../utils/ImmutableMap';
import * as React from 'react';

function initializeMap(iterable?: Iterable<TreeItemValue | [TreeItemValue, 'mixed' | boolean]>) {
  const map = new Map<TreeItemValue, 'mixed' | boolean>();
  if (iterable === undefined) {
    return ImmutableMap.empty;
  }
  for (const item of iterable) {
    if (Array.isArray(item)) {
      map.set(item[0], item[1]);
    } else {
      map.set(item, true);
    }
  }
  return ImmutableMap.dangerouslyCreate_unstable(map);
}

export function useFlatControllableCheckedItems(
  props: Pick<TreeProps, 'checkedItems' | 'defaultCheckedItems' | 'selectionMode'>,
) {
  const [checkedItems, setCheckedItems] = useControllableState({
    initialState: ImmutableMap.empty,
    state: React.useMemo(
      () => (props.checkedItems ? initializeMap(props.checkedItems) : undefined),
      [props.checkedItems],
    ),
    defaultState: () => initializeMap(props.defaultCheckedItems),
  });

  return [checkedItems, setCheckedItems] as const;
}

export function createNextFlatCheckedItems(
  data: Pick<TreeCheckedChangeData, 'value' | 'checked' | 'selectionMode'>,
  previousCheckedItems: ImmutableMap<TreeItemValue, 'mixed' | boolean>,
): ImmutableMap<TreeItemValue, 'mixed' | boolean> {
  // eslint-disable-next-line no-console
  console.warn('useTree: createNextFlatCheckedItems not implemented yet');

  const nextCheckedItems = new Map(previousCheckedItems.dangerouslyGetInternalMap_unstable()); // create mutable copy of previous items

  const itemId = data.value;

  if (data.selectionMode === 'multiselect') {
    const isChecked = data.checked;

    if (isChecked === true || isChecked === 'mixed') {
      nextCheckedItems.set(itemId, isChecked);
    } else {
      nextCheckedItems.delete(itemId);
    }
  } else if (data.selectionMode === 'single') {
    const isChecked = data.checked;

    if (isChecked === true) {
      nextCheckedItems.clear();
      nextCheckedItems.set(itemId, true);
    } else {
      nextCheckedItems.delete(itemId);
    }
  }
  const immutable = ImmutableMap.create(nextCheckedItems);
  return immutable;
}
