import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { createImmutableSet, emptyImmutableSet, ImmutableSet } from '../utils/ImmutableSet';
import type { TreeOpenChangeData, TreeProps } from '../Tree';

export function useOpenItemsState(props: Pick<TreeProps, 'openItems' | 'defaultOpenItems'>) {
  const [openItems, setOpenItems] = useControllableState({
    state: React.useMemo(() => props.openItems && createImmutableSet(props.openItems), [props.openItems]),
    defaultState: props.defaultOpenItems && (() => createImmutableSet(props.defaultOpenItems)),
    initialState: emptyImmutableSet,
  });
  const updateOpenItems = useEventCallback((data: TreeOpenChangeData) =>
    setOpenItems(currentOpenItems => createNextOpenItems(data, currentOpenItems)),
  );
  return [openItems, updateOpenItems] as const;
}

function createNextOpenItems(data: TreeOpenChangeData, previousOpenItems: ImmutableSet<string>): ImmutableSet<string> {
  if (data.value === null) {
    return previousOpenItems;
  }
  const previousOpenItemsHasId = previousOpenItems.has(data.value);
  if (data.open ? previousOpenItemsHasId : !previousOpenItemsHasId) {
    return previousOpenItems;
  }
  const nextOpenItems = createImmutableSet(previousOpenItems);
  return data.open ? nextOpenItems.add(data.value) : nextOpenItems.delete(data.value);
}
