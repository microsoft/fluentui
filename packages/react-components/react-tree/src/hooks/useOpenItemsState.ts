import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { TreeItemId, TreeOpenChangeData, TreeProps } from '../Tree';
import { createImmutableSet, emptyImmutableSet, ImmutableSet } from '../utils/ImmutableSet';

export function useOpenItemsState(props: Pick<TreeProps, 'openItems' | 'defaultOpenItems'>) {
  const [openItems, setOpenItems] = useControllableState({
    state: React.useMemo(() => props.openItems && createImmutableSet(props.openItems), [props.openItems]),
    defaultState: React.useMemo(
      () => props.defaultOpenItems && createImmutableSet(props.defaultOpenItems),
      [props.defaultOpenItems],
    ),
    initialState: emptyImmutableSet,
  });
  const updateOpenItems = useEventCallback((data: TreeOpenChangeData) =>
    setOpenItems(currentOpenItems => createNextOpenItems(data, currentOpenItems)),
  );
  return [openItems, updateOpenItems] as const;
}

function createNextOpenItems(
  data: TreeOpenChangeData,
  previousOpenItems: ImmutableSet<TreeItemId>,
): ImmutableSet<TreeItemId> {
  const id = data.target.id;
  const previousOpenItemsHasId = previousOpenItems.has(id);
  if (data.open ? previousOpenItemsHasId : !previousOpenItemsHasId) {
    return previousOpenItems;
  }
  const nextOpenItems = createImmutableSet(previousOpenItems);
  return data.open ? nextOpenItems.add(id) : nextOpenItems.delete(id);
}
