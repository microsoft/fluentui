import * as React from 'react';
import { useAutoControlled } from '@fluentui/react-bindings';
import * as _ from 'lodash';
import { UseSelectableTreeOptions } from './useSelectableTree';
import { useStableProps } from './useStableProps';
import { BaseFlatTreeItem } from './flattenTree';

export interface SelectableFlatTreeItem extends BaseFlatTreeItem {
  /**
   * when selected=true, the tree item is fully selected, indicating all its descendents are fully selected;
   * when selected=false, the tree item is not selected, indicating none of its descendents is selected;
   * when selected='indeterminate', only part of the tree item's descendents are selected
   */
  selected?: boolean | 'indeterminate';
}

export interface UseTreeSelectStateResult {
  selectedItemIds: string[];
  toggleItemSelect: (e: React.SyntheticEvent, idToToggle: string) => void;
}

export function useTreeSelectState(
  props: Pick<UseSelectableTreeOptions, 'defaultSelectedItemIds' | 'selectedItemIds' | 'items'>,
  getItemById: (id: string) => SelectableFlatTreeItem,
): UseTreeSelectStateResult {
  // selectedItemIds is only valid for leaf nodes.
  // For non-leaf nodes, their 'selected' states are defered from all their descendents
  const [selectedItemIds, setSelectedItemIdsState] = useAutoControlled<string[]>({
    defaultValue: props.defaultSelectedItemIds,
    value: props.selectedItemIds,
    initialValue: [],
  });

  const stableProps = useStableProps(props);

  const toggleItemSelect = React.useCallback(
    (e: React.SyntheticEvent, idToToggle: string) => {
      const item = getItemById(idToToggle) as SelectableFlatTreeItem;
      if (!item) {
        return;
      }
      const leafs = getLeafNodes(getItemById, idToToggle);

      setSelectedItemIdsState(selectedItemIds => {
const nextSelectedItemIds =
          item.selected === true
            ? _.without(selectedItemIds, ...leafs) // remove all leaves from selected
            : _.uniq(selectedItemIds.concat(leafs)); // add all leaves to selected
        _.invoke(stableProps.current, 'onSelectedItemIdsChange', e, {
          ...stableProps.current,
          selectedItemIds: nextSelectedItemIds,
        });
        return nextSelectedItemIds;
      });
    },
    [getItemById, setSelectedItemIdsState, stableProps],
  );

  return { selectedItemIds, toggleItemSelect };
}

function getLeafNodes(getItemById: (id: string) => BaseFlatTreeItem, rootId: string) {
  const leafs = [];
  const traverseDown = id => {
    if (getItemById(id)?.childrenIds) {
      getItemById(id)?.childrenIds.forEach(child => {
        traverseDown(child);
      });
    } else {
      leafs.push(id);
    }
  };
  traverseDown(rootId);
  return leafs;
}
