import { useControllableState } from '@fluentui/react-utilities';
import * as React from 'react';
import { ImmutableSet } from '../utils/ImmutableSet';
import type { TreeItemValue } from '../components/TreeItem/TreeItem.types';
import { createOpenItems } from '../utils/createOpenItems';
import { TreeOpenChangeData, TreeProps } from '../Tree';

/**
 * @internal
 */
export function useControllableOpenItems(props: Pick<TreeProps, 'openItems' | 'defaultOpenItems'>) {
  return useControllableState({
    state: React.useMemo(() => props.openItems && createOpenItems(props.openItems), [props.openItems]),
    defaultState: props.defaultOpenItems && (() => createOpenItems(props.defaultOpenItems)),
    initialState: ImmutableSet.empty,
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
  const nextOpenItems = ImmutableSet.create(previousOpenItems);
  return data.open ? nextOpenItems.add(data.value) : nextOpenItems.delete(data.value);
}
