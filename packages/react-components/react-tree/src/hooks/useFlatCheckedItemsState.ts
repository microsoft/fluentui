import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import type { TreeCheckedChangeData, TreeProps } from '../Tree';
import { TreeItemValue } from '../TreeItem';
import { ImmutableMap } from '../utils/ImmutableMap';

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

export function useFlatCheckedItemsState(
  props: Pick<TreeProps, 'checkedItems' | 'defaultCheckedItems' | 'selectionMode'>,
) {
  const [checkedItems] = useControllableState({
    initialState: ImmutableMap.empty,
    state: React.useMemo(() => initializeMap(props.checkedItems), [props.checkedItems]),
    defaultState: () => initializeMap(props.defaultCheckedItems),
  });
  // TODO: implements updateCheckedItems for nested tree
  const updateCheckedItems = useEventCallback((data: TreeCheckedChangeData) => {
    // eslint-disable-next-line no-console
    console.warn('useTree: updateCheckedItems not implemented yet');
  });
  return [checkedItems, updateCheckedItems] as const;
}
