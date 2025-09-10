import { useControllableState } from '@fluentui/react-utilities';
import { TreeItemValue } from '../../TreeItem';
import { ImmutableMap } from '../../utils/ImmutableMap';
import * as React from 'react';
import type { HeadlessTree, HeadlessTreeItemProps } from '../../utils/createHeadlessTree';
import { createCheckedItems } from '../../utils/createCheckedItems';
import type { TreeCheckedChangeData, TreeSelectionValue } from '../Tree/Tree.types';
import { HeadlessFlatTreeOptions } from './useHeadlessFlatTree';

export function useFlatControllableCheckedItems<Props extends HeadlessTreeItemProps>(
  props: Pick<HeadlessFlatTreeOptions, 'checkedItems' | 'defaultCheckedItems' | 'selectionMode'>,
  headlessTree: HeadlessTree<Props>,
): [ImmutableMap<TreeItemValue, TreeSelectionValue>, React.Dispatch<ImmutableMap<TreeItemValue, TreeSelectionValue>>] {
  return useControllableState({
    initialState: ImmutableMap.empty,
    state: React.useMemo(
      () => (props.selectionMode ? props.checkedItems && createCheckedItems(props.checkedItems) : undefined),
      [props.checkedItems, props.selectionMode],
    ),
    defaultState: props.defaultCheckedItems ? () => initializeCheckedItems(props, headlessTree) : undefined,
  });
}

export function createNextFlatCheckedItems(
  data: Pick<TreeCheckedChangeData, 'value' | 'checked' | 'selectionMode'>,
  previousCheckedItems: ImmutableMap<TreeItemValue, 'mixed' | boolean>,
  headlessTree: HeadlessTree<HeadlessTreeItemProps>,
): ImmutableMap<TreeItemValue, 'mixed' | boolean> {
  if (data.selectionMode === 'single') {
    return ImmutableMap.from([[data.value, data.checked]]);
  }
  const treeItem = headlessTree.get(data.value);
  if (!treeItem) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(/* #__DE-INDENT__ */ `
        @fluentui/react-tree [useHeadlessFlatTree]:
        Tree item ${data.value} not found.
      `);
    }
    return previousCheckedItems;
  }
  let nextCheckedItems = previousCheckedItems;
  for (const children of headlessTree.subtree(data.value)) {
    nextCheckedItems = nextCheckedItems.set(children.value, data.checked);
  }
  nextCheckedItems = nextCheckedItems.set(data.value, data.checked);

  let isAncestorsMixed = false;
  for (const parent of headlessTree.ancestors(treeItem.value)) {
    // if one parent is mixed, all ancestors are mixed
    if (isAncestorsMixed) {
      nextCheckedItems = nextCheckedItems.set(parent.value, 'mixed');
      continue;
    }
    let checkedChildrenAmount = 0;
    for (const child of headlessTree.children(parent.value)) {
      if ((nextCheckedItems.get(child.value) || false) === data.checked) {
        checkedChildrenAmount++;
      }
    }
    // if all children are checked, parent is checked
    if (checkedChildrenAmount === parent.childrenValues.length) {
      nextCheckedItems = nextCheckedItems.set(parent.value, data.checked);
    } else {
      // if one parent is mixed, all ancestors are mixed
      isAncestorsMixed = true;
      nextCheckedItems = nextCheckedItems.set(parent.value, 'mixed');
    }
  }
  return nextCheckedItems;
}

function initializeCheckedItems(
  props: Pick<HeadlessFlatTreeOptions, 'selectionMode' | 'defaultCheckedItems'>,
  headlessTree: HeadlessTree<HeadlessTreeItemProps>,
) {
  if (!props.selectionMode) {
    return ImmutableMap.empty;
  }
  let state = createCheckedItems(props.defaultCheckedItems);
  // if selectionMode is multiselect, we need to calculate the checked state of all children
  // and ancestors of the defaultCheckedItems
  if (props.selectionMode === 'multiselect') {
    for (const [value, checked] of state) {
      state = createNextFlatCheckedItems({ value, checked, selectionMode: props.selectionMode }, state, headlessTree);
    }
  }
  return state;
}
