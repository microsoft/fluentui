import { useControllableState } from '@fluentui/react-utilities';
import * as React from 'react';
import type { TreeProps } from './Tree.types';
import { ImmutableMap } from '../../utils/ImmutableMap';
import { createCheckedItems } from '../../utils/createCheckedItems';

export type ControllableCheckedItemsOptions = {
  checkedItems?: TreeProps['checkedItems'];
  defaultCheckedItems?: TreeProps['checkedItems'];
};

export function useControllableCheckedItems(props: ControllableCheckedItemsOptions) {
  return useControllableState({
    initialState: ImmutableMap.empty,
    state: React.useMemo(() => props.checkedItems && createCheckedItems(props.checkedItems), [props.checkedItems]),
    defaultState: () => createCheckedItems(props.defaultCheckedItems),
  });
}

// export function useCheckedItemsState(props: Pick<TreeProps, 'checkedItems' | 'defaultCheckedItems' | 'selectionMode'>) {
//   const [walkerRef, rootRef] = useHTMLElementWalkerRef(treeItemFilter);
//   const selections = React.useMemo(() => initializeSelection(props.checkedItems ?? []), [props.checkedItems]);
//   const defaultSelections = React.useMemo(
//     () => initializeSelection(props.defaultCheckedItems ?? []),
//     [props.defaultCheckedItems],
//   );
//   const [checkedSelection, checkedSelectionManager] = useSelection<TreeItemValue>({
//     selectionMode: props.selectionMode ?? 'single',
//     selectedItems: selections.checkedSelection,
//     defaultSelectedItems: defaultSelections.checkedSelection,
//   });
//   const [mixedSelection, setMixedSelection] = useControllableState({
//     initialState: ImmutableSet.empty,
//     defaultState: React.useMemo(
//       () => ImmutableSet.create(defaultSelections.mixedSelection),
//       [defaultSelections.mixedSelection],
//     ),
//     state: React.useMemo(() => ImmutableSet.create(selections.mixedSelection), [selections.mixedSelection]),
//   });

//   const updateCheckedItems = useEventCallback((data: TreeCheckedChangeData) => {
//     if (props.selectionMode === 'single') {
//       checkedSelectionManager.selectItem(data.value);
//       return;
//     }
//     if (walkerRef.current === null) {
//       return;
//     }
//     const nextSelectedState = !checkedSelectionManager.isSelected(data.value);

//     let treeItemValues = getAllSubTreeItemValues(data).add(data.value);

//     let mixedValues: ImmutableSet<TreeItemValue> = ImmutableSet.empty;

//     walkerRef.current.currentElement = data.event.currentTarget;
//     while (walkerRef.current.parentElement() !== null) {
//       const descendants = Array.from(
//         walkerRef.current.currentElement.querySelectorAll<HTMLElement>('[role="treeitem"]'),
//       ).filter(item => item.getAttribute(dataTreeItemValueAttrName) !== data.value);
//       const isAllSiblingsEqualSelectionState = descendants.every(item => {
//         return (
//           (item.getAttribute('aria-selected') === 'true') === nextSelectedState ||
//           treeItemValues.has(item.getAttribute(dataTreeItemValueAttrName) as TreeItemValue)
//         );
//       });
//       if (isAllSiblingsEqualSelectionState) {
//         treeItemValues = treeItemValues.add(
//           walkerRef.current.currentElement.getAttribute(dataTreeItemValueAttrName) as TreeItemValue,
//         );
//         mixedValues = mixedValues.delete(
//           walkerRef.current.currentElement.getAttribute(dataTreeItemValueAttrName) as TreeItemValue,
//         );
//       } else {
//         treeItemValues = treeItemValues
//           .delete(walkerRef.current.currentElement.getAttribute(dataTreeItemValueAttrName) as TreeItemValue)
//           .add(data.value);
//         mixedValues = mixedValues.add(
//           walkerRef.current.currentElement.getAttribute(dataTreeItemValueAttrName) as TreeItemValue,
//         );
//       }
//     }
//     unstable_batchedUpdates(() => {
//       nextSelectedState
//         ? checkedSelectionManager.selectItems(treeItemValues)
//         : checkedSelectionManager.deselectItems(treeItemValues);
//       let nextMixedSelection = ImmutableSet.create(mixedSelection);
//       for (const value of mixedValues) {
//         nextMixedSelection = nextMixedSelection.add(value);
//       }
//       for (const value of treeItemValues) {
//         nextMixedSelection = nextMixedSelection.delete(value);
//       }
//       setMixedSelection(nextMixedSelection);
//     });
//   });
//   return [checkedSelection, mixedSelection, updateCheckedItems, rootRef] as const;
// }

// function getAllSubTreeItemValues(data: TreeCheckedChangeData) {
//   const subTreeItems = Array.from(data.event.currentTarget.querySelectorAll('[role="treeitem"]'));
//   const values = new Set<TreeItemValue>();
//   for (const item of subTreeItems) {
//     values.add(item.getAttribute(dataTreeItemValueAttrName) as TreeItemValue);
//   }
//   return ImmutableSet.dangerouslyCreate(values);
// }
