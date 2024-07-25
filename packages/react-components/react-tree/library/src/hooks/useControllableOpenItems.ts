import { useControllableState, ImmutableSet } from '@fluentui/react-utilities';
import * as React from 'react';
import type { TreeItemValue } from '../components/TreeItem/TreeItem.types';
import { TreeOpenChangeData, TreeProps } from '../Tree';

/**
 * @internal
 */
export function useControllableOpenItems(props: Pick<TreeProps, 'openItems' | 'defaultOpenItems'>) {
  return useControllableState({
    state: React.useMemo(() => props.openItems && ImmutableSet.from(props.openItems), [props.openItems]),
    defaultState: React.useMemo(
      () => props.defaultOpenItems && ImmutableSet.from(props.defaultOpenItems),
      [props.defaultOpenItems],
    ),
    initialState: ImmutableSet.empty(),
  });
}

/**
 * @internal
 */
export function createNextOpenItems(
  data: Pick<TreeOpenChangeData, 'value' | 'open'>,
  previousOpenItems: ImmutableSet<TreeItemValue>,
): ImmutableSet<TreeItemValue> {
  if (data.value === null) {
    return previousOpenItems;
  }
  const previousOpenItemsHasId = previousOpenItems.has(data.value);
  if (data.open ? previousOpenItemsHasId : !previousOpenItemsHasId) {
    return previousOpenItems;
  }
  return data.open ? previousOpenItems.add(data.value) : previousOpenItems.delete(data.value);
}
