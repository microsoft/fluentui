'use client';

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

  // Calling `ImmutableMap.set()` creates a new ImmutableMap - avoid this in loops.
  // Instead write all updates to a native Map and create a new ImmutableMap at the end.
  // Note that all descendants of the toggled item are processed even if they are collapsed,
  // making the choice of algorithm more important.

  const nextCheckedItemsMap = new Map(ImmutableMap.dangerouslyGetInternalMap(previousCheckedItems));

  // The toggled item itself
  nextCheckedItemsMap.set(data.value, data.checked);

  // Descendant updates
  for (const children of headlessTree.subtree(data.value)) {
    nextCheckedItemsMap.set(children.value, data.checked);
  }

  // Ancestor updates - must be done after adding descendants and the toggle item.
  // If any ancestor is mixed, all ancestors above it are mixed too.
  let isAncestorsMixed = false;

  for (const ancestor of headlessTree.ancestors(treeItem.value)) {
    if (isAncestorsMixed) {
      nextCheckedItemsMap.set(ancestor.value, 'mixed');
      continue;
    }

    // For each ancestor, if all of its children now have the same checked state as the toggled item,
    // set the ancestor to that checked state too. Otherwise it is 'mixed'.
    let childrenWithSameState = 0;
    for (const child of headlessTree.children(ancestor.value)) {
      if ((nextCheckedItemsMap.get(child.value) || false) === data.checked) {
        childrenWithSameState++;
      }
    }

    if (childrenWithSameState === ancestor.childrenValues.length) {
      nextCheckedItemsMap.set(ancestor.value, data.checked);
    } else {
      nextCheckedItemsMap.set(ancestor.value, 'mixed');
      isAncestorsMixed = true;
    }
  }

  const nextCheckedItems = ImmutableMap.from(nextCheckedItemsMap);
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
