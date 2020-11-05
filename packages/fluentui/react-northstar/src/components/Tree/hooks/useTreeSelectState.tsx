import * as React from 'react';
import { useAutoControlled } from '@fluentui/react-bindings';
import * as _ from 'lodash';
import { UseSelectableTreeOptions } from './useSelectableTree';
import { useStableProps } from './useStableProps';
import { BaseFlatTree } from './flattenTree';
import { findIndex, removeItemAtIndex } from './utils';

export interface TreeSelectState {
  selectedItemIds: string[];
  flatTree: BaseFlatTree;
  toggleSelect: (ids: string[], e: React.SyntheticEvent) => void;
}

export function useTreeSelectState(
  props: Pick<UseSelectableTreeOptions, 'defaultSelectedItemIds' | 'selectedItemIds' | 'items'>,
  flatTree: BaseFlatTree,
): TreeSelectState {
  // selectedItemIds is only valid for leaf nodes.
  // For non-leaf nodes, their 'selected' states are defered from all their descendents
  const [selectedItemIds, setSelectedItemIdsState] = useAutoControlled<string[]>({
    defaultValue: props.defaultSelectedItemIds,
    value: props.selectedItemIds,
    initialValue: [],
  });

  // compute a new flattened tree based on selectedItemIds state
  const updatedFlatTree = React.useMemo(() => {
    // build updatedFlatTree based on flatTree, with all tree item having selected false.
    // then updates the 'selected' prop of leaves based on selectedItemIds
    const updatedFlatTree = {};
    const rootsIds = [];
    Object.keys(flatTree).forEach(id => {
      updatedFlatTree[id] = {
        ...flatTree[id],
        selected: false,
      };
      if (!updatedFlatTree[id].parent) {
        rootsIds.push(id);
      }
    });
    selectedItemIds.forEach(id => {
      if (!updatedFlatTree[id].hasSubtree) {
        updatedFlatTree[id].selected = true;
      }
    });

    // traverse all tree nodes in updatedFlatTree for once,
    // to calculate the selection state of the parent nodes based on leaf nodes
    const traverseTree = nodes => {
      let allNodesSelected = true;
      let noNodeSelected = true;

      nodes.forEach(id => {
        if (updatedFlatTree[id].childrenIds) {
          updatedFlatTree[id].selected = traverseTree(updatedFlatTree[id].childrenIds);
        }

        if (updatedFlatTree[id].selected === true) {
          noNodeSelected = false;
        } else if (updatedFlatTree[id].selected === 'indeterminate') {
          allNodesSelected = false;
          noNodeSelected = false;
        } else {
          allNodesSelected = false;
        }
      });

      if (allNodesSelected) return true;
      if (noNodeSelected) return false;
      return 'indeterminate';
    };

    traverseTree(rootsIds);
    return updatedFlatTree;
  }, [flatTree, selectedItemIds]);

  const toggleSelectOnOneId = React.useCallback(
    (selectedIds: string[], idToToggle: string): string[] => {
      const leafs = getLeavesOfSubTree(updatedFlatTree, idToToggle);

      if (updatedFlatTree[idToToggle]?.selected === true) {
        // remove all leaves from selected
        return leafs.reduce((prevResult, leaf) => {
          const leafIndex = findIndex(prevResult, leaf);
          if (leafIndex >= 0) {
            return removeItemAtIndex(prevResult, leafIndex);
          }
          return prevResult;
        }, selectedIds);
      }

      return leafs.reduce((prevResult, leaf) => {
        // add all leaves to selected
        const leafIndex = findIndex(prevResult, leaf);
        if (leafIndex < 0) {
          return [...prevResult, leaf];
        }
        return prevResult;
      }, selectedIds);
    },
    [updatedFlatTree],
  );

  const stableProps = useStableProps(props);
  const toggleSelect = React.useCallback(
    (ids: string[], e: React.SyntheticEvent) => {
      const nextSelectedItemIds = ids.reduce((prev, currId) => toggleSelectOnOneId(prev, currId), selectedItemIds);

      _.invoke(stableProps.current, 'onSelectedItemIdsChange', e, {
        ...stableProps.current,
        selectedItemIds: nextSelectedItemIds,
      });

      setSelectedItemIdsState(nextSelectedItemIds);
    },
    [selectedItemIds, setSelectedItemIdsState, stableProps, toggleSelectOnOneId],
  );

  return { selectedItemIds, flatTree: updatedFlatTree, toggleSelect };
}

function getLeavesOfSubTree(flatTree, subTreeRootId) {
  const leaves = [];
  const traverseDown = id => {
    if (flatTree[id]?.childrenIds) {
      flatTree[id].childrenIds.forEach(child => {
        traverseDown(child);
      });
    } else {
      leaves.push(id);
    }
  };
  traverseDown(subTreeRootId);
  return leaves;
}
