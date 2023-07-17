import { useControllableState } from '@fluentui/react-utilities';
import type { TreeCheckedChangeData, TreeProps } from '../Tree';
import { TreeItemValue } from '../TreeItem';
import { ImmutableMap } from '../utils/ImmutableMap';
import * as React from 'react';
import type { FlatTreeItemProps } from './useFlatTree';
import type { FlatTreeItems } from '../utils/createFlatTreeItems';

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
    state: React.useMemo(() => props.checkedItems && initializeMap(props.checkedItems), [props.checkedItems]),
    defaultState: () => initializeMap(props.defaultCheckedItems),
  });

  return [checkedItems, setCheckedItems] as const;
}

export function createNextFlatCheckedItems<Props extends FlatTreeItemProps = FlatTreeItemProps>(
  data: Pick<TreeCheckedChangeData, 'value' | 'checked' | 'selectionMode'>,
  previousCheckedItems: ImmutableMap<TreeItemValue, 'mixed' | boolean>,
  flatTreeItems: FlatTreeItems<Props>,
): ImmutableMap<TreeItemValue, 'mixed' | boolean> {
  if (data.selectionMode === 'single') {
    return ImmutableMap.create([[data.value, data.checked]]);
  }
  const treeItem = flatTreeItems.get(data.value);
  if (!treeItem) {
    // eslint-disable-next-line no-console
    console.error(`useFlatTree: tree item ${data.value} not found`);
    return previousCheckedItems;
  }
  const nextCheckedItems = new Map(previousCheckedItems);
  for (const children of flatTreeItems.getSubtree(data.value)) {
    nextCheckedItems.set(children.value, data.checked);
  }
  nextCheckedItems.set(data.value, data.checked);

  let isAncestorsMixed = false;
  let parent = flatTreeItems.getParent(treeItem.value);
  while (parent !== flatTreeItems.root) {
    if (isAncestorsMixed) {
      nextCheckedItems.set(parent.value, 'mixed');
      continue;
    }
    const subtree = flatTreeItems.getSubtree(parent.value);
    const checkedChildren = subtree.filter(item => {
      return (nextCheckedItems.get(item.value) ?? false) === data.checked;
    });
    if (checkedChildren.length === subtree.length) {
      nextCheckedItems.set(parent.value, data.checked);
    } else {
      // if one parent is mixed, all ancestors are mixed
      isAncestorsMixed = true;
      nextCheckedItems.set(parent.value, 'mixed');
    }
    parent = flatTreeItems.getParent(parent.value);
  }

  return ImmutableMap.dangerouslyCreate_unstable(nextCheckedItems);
}
