import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { createImmutableSet, emptyImmutableSet, ImmutableSet } from '../utils/ImmutableSet';
import type { TreeOpenChangeData, TreeProps } from '../Tree';

export function useOpenItemsState<Value = string>(props: Pick<TreeProps<Value>, 'openItems' | 'defaultOpenItems'>) {
  const [openItems, setOpenItems] = useControllableState({
    state: React.useMemo(() => props.openItems && createImmutableSet(props.openItems), [props.openItems]),
    defaultState: props.defaultOpenItems && (() => createImmutableSet(props.defaultOpenItems)),
    initialState: emptyImmutableSet,
  });
  const updateOpenItems = useEventCallback((data: TreeOpenChangeData<Value>) =>
    setOpenItems(currentOpenItems => createNextOpenItems(data, currentOpenItems)),
  );
  return [openItems, updateOpenItems] as const;
}

function createNextOpenItems<Value = string>(
  data: TreeOpenChangeData<Value>,
  previousOpenItems: ImmutableSet<Value>,
): ImmutableSet<Value> {
  const previousOpenItemsHasId = previousOpenItems.has(data.value);
  if (data.open ? previousOpenItemsHasId : !previousOpenItemsHasId) {
    return previousOpenItems;
  }
  const nextOpenItems = createImmutableSet(previousOpenItems);
  return data.open ? nextOpenItems.add(data.value) : nextOpenItems.delete(data.value);
}
