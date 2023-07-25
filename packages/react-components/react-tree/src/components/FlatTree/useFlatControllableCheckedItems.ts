import { useControllableState } from '@fluentui/react-utilities';
import { TreeItemValue } from '../../TreeItem';
import { ImmutableMap } from '../../utils/ImmutableMap';
import * as React from 'react';
import type { HeadlessTree, HeadlessTreeItemProps } from '../../utils/createHeadlessTree';
import { createCheckedItems } from '../../utils/createCheckedItems';
import type { TreeCheckedChangeData, TreeProps } from '../Tree/Tree.types';

export function useFlatControllableCheckedItems(props: Pick<TreeProps, 'checkedItems' | 'defaultCheckedItems'>) {
  const [checkedItems, setCheckedItems] = useControllableState({
    initialState: ImmutableMap.empty,
    state: React.useMemo(() => props.checkedItems && createCheckedItems(props.checkedItems), [props.checkedItems]),
    defaultState: () => createCheckedItems(props.defaultCheckedItems),
  });

  return [checkedItems, setCheckedItems] as const;
}

export function createNextFlatCheckedItems<Props extends HeadlessTreeItemProps>(
  data: Pick<TreeCheckedChangeData, 'value' | 'checked' | 'selectionMode'>,
  previousCheckedItems: ImmutableMap<TreeItemValue, 'mixed' | boolean>,
  virtualTree: HeadlessTree<Props>,
): ImmutableMap<TreeItemValue, 'mixed' | boolean> {
  if (data.selectionMode === 'single') {
    return ImmutableMap.create([[data.value, data.checked]]);
  }
  const treeItem = virtualTree.get(data.value);
  if (!treeItem) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`useHeadlessFlatTree: tree item ${data.value} not found`);
    }
    return previousCheckedItems;
  }
  const nextCheckedItems = new Map(previousCheckedItems);
  for (const children of virtualTree.subtree(data.value)) {
    nextCheckedItems.set(children.value, data.checked);
  }
  nextCheckedItems.set(data.value, data.checked);

  let isAncestorsMixed = false;
  for (const parent of virtualTree.ancestors(treeItem.value)) {
    // if one parent is mixed, all ancestors are mixed
    if (isAncestorsMixed) {
      nextCheckedItems.set(parent.value, 'mixed');
      continue;
    }
    const checkedChildren = [];
    for (const child of virtualTree.children(parent.value)) {
      if ((nextCheckedItems.get(child.value) ?? false) === data.checked) {
        checkedChildren.push(child);
      }
    }
    if (checkedChildren.length === parent.childrenValues.length) {
      nextCheckedItems.set(parent.value, data.checked);
    } else {
      // if one parent is mixed, all ancestors are mixed
      isAncestorsMixed = true;
      nextCheckedItems.set(parent.value, 'mixed');
    }
  }
  return ImmutableMap.dangerouslyCreate_unstable(nextCheckedItems);
}
