import * as React from 'react';
import { useAutoControlled } from '@fluentui/react-bindings';
import { UseTreeOptions } from './useTree';
import { useStableProps } from './useStableProps';
import { BaseFlatTree } from './flattenTree';
import { findIndex, removeItemAtIndex } from './utils';
import * as _ from 'lodash';

export interface UseTreeActiveStateResult {
  activeItemIds: string[];
  flatTree: BaseFlatTree;
  toggleActive: (ids: string[], e: React.SyntheticEvent) => void;
}

export function useTreeActiveState(
  props: Pick<UseTreeOptions, 'defaultActiveItemIds' | 'activeItemIds' | 'exclusive'>,
  flatTree: BaseFlatTree,
): TreeActiveState {
  // We need this because we want to handle `expanded` prop on `items`, should be deprecated and removed
  const initialActiveItemIds = React.useMemo(() => {
    const initalValue = [];
    Object.keys(flatTree).forEach(key => {
      if (flatTree[key].expanded) {
        initalValue.push(key);
      }
    });
    return initalValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initialValue only needs to be computed on mount

  const [activeItemIds, setActiveItemIdsState] = useAutoControlled<string[]>({
    defaultValue: props.defaultActiveItemIds,
    value: props.activeItemIds,
    initialValue: initialActiveItemIds,
  });

  // compute a new flattened tree based on activeItemIds state
  const updatedFlatTree = React.useMemo(() => {
    const updatedFlatTree = { ...flatTree };
    Object.keys(updatedFlatTree).forEach(key => {
      if (updatedFlatTree[key].expanded) {
        updatedFlatTree[key].expanded = false;
      }
    });
    activeItemIds.forEach(activeId => {
      updatedFlatTree[activeId].expanded = true;
    });
    return updatedFlatTree;
  }, [activeItemIds, flatTree]);

  const toggleActiveOnOneId = React.useCallback(
    (activeIds: string[], idToToggle: string): string[] => {
      if (!updatedFlatTree[idToToggle]?.hasSubtree) {
        // leaf node does not have the concept of active/inactive
        return activeIds;
      }

      let result: string[];
      const index = findIndex(activeIds, idToToggle);
      if (index >= 0) {
        result = removeItemAtIndex(activeIds, index);
      } else {
        if (props.exclusive) {
          // need to collapse everything else, except id and its ancestors
          const ancestors = getAncestorsIds(updatedFlatTree, idToToggle);
          return [...ancestors, idToToggle];
        }
        return [...activeIds, idToToggle];
      }

      return result;
    },
    [props.exclusive, updatedFlatTree],
  );

  const stableProps = useStableProps(props);
  const toggleActive = React.useCallback(
    (ids: string[], e: React.SyntheticEvent) => {
      const nextActiveItemIds = ids.reduce((prev, currId) => toggleActiveOnOneId(prev, currId), activeItemIds);

      _.invoke(stableProps.current, 'onActiveItemIdsChange', e, {
        ...stableProps.current,
        activeItemIds: nextActiveItemIds,
      });

      setActiveItemIdsState(nextActiveItemIds);
    },
    [activeItemIds, stableProps, setActiveItemIdsState, toggleActiveOnOneId],
  );

  return {
    activeItemIds,
    flatTree: updatedFlatTree,
    toggleActive,
  };
}

function getAncestorsIds(flatTree: BaseFlatTree, id: string): string[] {
  const result = [];
  let parent = flatTree[id]?.parent;
  while (parent) {
    result.push(parent);
    parent = flatTree[parent]?.parent;
  }
  return result;
}
