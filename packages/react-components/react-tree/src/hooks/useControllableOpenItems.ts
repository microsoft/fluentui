import { useControllableState } from '@fluentui/react-utilities';
import * as React from 'react';
import { ImmutableSet } from '../utils/ImmutableSet';
import type { TreeOpenChangeData, TreeProps } from '../components/Tree/Tree.types';
import type { TreeItemValue } from '../components/TreeItem/TreeItem.types';

/**
 * @internal
 */
export function useControllableOpenItems(props: Pick<TreeProps, 'openItems' | 'defaultOpenItems'>) {
  return useControllableState({
    state: React.useMemo(() => props.openItems && ImmutableSet.create(props.openItems), [props.openItems]),
    defaultState: props.defaultOpenItems && (() => ImmutableSet.create(props.defaultOpenItems)),
    initialState: ImmutableSet.empty,
  });
}

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
  const nextOpenItems = ImmutableSet.create(previousOpenItems);
  return data.open ? nextOpenItems.add(data.value) : nextOpenItems.delete(data.value);
}
