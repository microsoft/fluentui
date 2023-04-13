import * as React from 'react';
import { useAutoControlled } from '@fluentui/react-bindings';
import { ObjectShorthandCollection } from '../../../types';
import { TreeItemProps } from '../TreeItem';
import { FlatTreeItem, flattenTree, FlatTree } from './flattenTree';
import * as _ from 'lodash';

export type GetItemById = (id: string) => FlatTreeItem;

/**
 * This hook returns a stable `getItemById()` function that will lookup in latest `flatTree`.
 * This is used to have stable callbacks that can be passed to React's Context.
 */
function useGetItemById(flatTree: FlatTree): GetItemById {
  // An exception is thrown there to ensure that a proper callback will assigned to ref
  const callbackRef = React.useRef<GetItemById>(() => {
    throw new Error('Callback is not assigned yet');
  });

  // We are assigning a callback during render as it can be used during render and in event handlers. In dev mode we
  // are freezing objects to prevent their mutations
  callbackRef.current = itemId =>
    process.env.NODE_ENV === 'production' ? flatTree[itemId] : Object.freeze(flatTree[itemId]);

  return React.useCallback<GetItemById>((...args) => {
    return callbackRef.current(...args);
  }, []);
}

function useStableProps<P>(props: P) {
  const stableProps = React.useRef<P>(props);

  React.useEffect(() => {
    stableProps.current = props;
  });

  return stableProps;
}

export interface UseTreeOptions {
  /** Shorthand array of props for Tree. */
  items?: ObjectShorthandCollection<TreeItemProps>;

  /** Ids of expanded items. */
  activeItemIds?: string[];
  /** Initial activeItemIds value. */
  defaultActiveItemIds?: string[];
  /** Only allow one subtree to be expanded at a time. */
  exclusive?: boolean;

  /** Ids of selected leaf items. */
  selectedItemIds?: string[];
  /** Initial selectedItemIds value. */
  defaultSelectedItemIds?: string[];
}

export interface UseTreeResult {
  /** An object with key being id of each tree item, and value being information of each tree item */
  flatTree: FlatTree;

  /** Access information of a tree item */
  getItemById: GetItemById;

  /** Ids of expanded items. */
  activeItemIds: string[];

  /** Ids of visible items */
  visibleItemIds: string[];

  /** register ref to a tree item, should be used in callback ref on tree item */
  registerItemRef: (id: string, node: HTMLElement) => void;

  /** get ref to a tree item by its id */
  getItemRef: (id: string) => HTMLElement;

  /** update the state of tree when a tree item is expanded/collapsed */
  toggleItemActive: (e: React.SyntheticEvent, idToToggle: string) => void;

  /** set focus on a tree item by its id. Useful for keyboard navigation */
  focusItemById: (id: string) => void;

  /** update the state of tree when it is needed to expand all siblings of a tree item, for example on '*' keydown */
  expandSiblings: (e: React.KeyboardEvent, focusedItemId: string) => void;

  /** update the state of tree when a tree item is selected/unselected */
  toggleItemSelect: (e: React.SyntheticEvent, idToToggle: string) => void;

  /**
   * When a-z/A-Z key is pressed on a tree item, move focus to the next visible tree node with content that starts with the typed char.
   * Search wraps to first matching node if a matching is not found among the nodes that follow the focused node.
   * Focus stays when no matching is found among all visible nodes.
   */
  getToFocusIDByFirstCharacter: (e: React.KeyboardEvent, idToToggle: string) => string;
}

export function useTree(options: UseTreeOptions): UseTreeResult {
  // We need this because we want to handle `expanded` prop on `items`, should be deprecated and removed
  const deprecated_initialActiveItemIds = React.useMemo(
    () => deprecated_getInitialActiveItemIds(options.items),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [], // initialValue only needs to be computed on mount
  );

  const [activeItemIds, setActiveItemIdsState] = useAutoControlled<string[]>({
    defaultValue: options.defaultActiveItemIds,
    value: options.activeItemIds,
    initialValue: deprecated_initialActiveItemIds, // will become []
  });

  // selectedItemIds is only valid for leaf nodes.
  // For non-leaf nodes, their 'selected' states are defered from all their descendents
  const [selectedItemIds, setSelectedItemIdsState] = useAutoControlled<string[]>({
    defaultValue: options.defaultSelectedItemIds,
    value: options.selectedItemIds,
    initialValue: [],
  });

  // We want to set `visibleItemIds` to simplify rendering later
  const { flatTree, visibleItemIds } = React.useMemo(
    () => flattenTree(options.items, activeItemIds, selectedItemIds),
    [activeItemIds, options.items, selectedItemIds],
  );

  const getItemById = useGetItemById(flatTree);

  const stableProps = useStableProps(options);

  const toggleItemActive = React.useCallback(
    (e: React.SyntheticEvent, idToToggle: string) => {
      const item = getItemById(idToToggle);
      if (!item || !item.hasSubtree) {
        // leaf node does not have the concept of active/inactive
        return;
      }

      setActiveItemIdsState(activeItemIds => {
        let nextActiveItemIds: string[];
        const isActiveId = activeItemIds.indexOf(idToToggle) !== -1;

        if (isActiveId) {
          nextActiveItemIds = _.without(activeItemIds, idToToggle);
        } else {
          nextActiveItemIds = [...activeItemIds, idToToggle];

          if (options.exclusive) {
            // remove active siblings, if any, from activeItemIds
            const parent = getItemById(idToToggle)?.parent;
            const activeSibling = getItemById(parent)?.childrenIds?.find(
              id => id !== idToToggle && nextActiveItemIds.indexOf(id) >= 0,
            );
            if (activeSibling != null) {
              nextActiveItemIds = _.without(nextActiveItemIds, activeSibling);
            }
          }
        }

        _.invoke(stableProps.current, 'onActiveItemIdsChange', e, {
          ...stableProps.current,
          activeItemIds: nextActiveItemIds,
        });

        return nextActiveItemIds;
      });
    },
    [getItemById, options.exclusive, setActiveItemIdsState, stableProps],
  );

  const expandSiblings = React.useCallback(
    (e: React.KeyboardEvent, focusedItemId: string) => {
      if (options.exclusive) {
        return;
      }

      const focusedItem = getItemById(focusedItemId);
      if (!focusedItem) {
        return;
      }

      const parentItem = getItemById(focusedItem?.parent);
      const siblingsIds = parentItem?.childrenIds;

      if (!siblingsIds) {
        return;
      }

      setActiveItemIdsState(activeItemIds => {
        const nextActiveItemIds = _.uniq(activeItemIds.concat(siblingsIds));
        _.invoke(stableProps.current, 'onActiveItemIdsChange', e, {
          ...stableProps.current,
          activeItemIds: nextActiveItemIds,
        });
        return nextActiveItemIds;
      });
    },
    [getItemById, options.exclusive, setActiveItemIdsState, stableProps],
  );

  const toggleItemSelect = React.useCallback(
    (e: React.SyntheticEvent, idToToggle: string) => {
      const item = getItemById(idToToggle);
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

  // Maintains stable collection of refs to avoid unnecessary React context updates
  const nodes = React.useRef<Record<string, HTMLElement>>({});
  const registerItemRef = React.useCallback((id: string, node: HTMLElement) => {
    nodes.current[id] = node;
  }, []);
  const getItemRef = React.useCallback((id): HTMLElement => nodes.current[id], []);

  // can be used for keyboard navigation ===
  const focusItemById = React.useCallback(
    (id: string) => {
      const itemRef = getItemRef(id);

      if (itemRef instanceof HTMLElement) {
        if (getItemById(id)?.hasSubtree) {
          itemRef.focus();
        } else {
          // when node is leaf, need to focus on the inner treeTitle
          (itemRef.firstElementChild as HTMLElement)?.focus();
        }
      }
    },
    [getItemById, getItemRef],
  );

  const searchByFirstChar = React.useCallback(
    (startIndex: number, endIndex: number, char: string) => {
      for (let i = startIndex; i < endIndex; ++i) {
        // get first charater of tree node using the same way aria does (https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-2/js/treeitemLinks.js)
        const itemFirstChar = getItemRef(visibleItemIds[i])?.textContent?.trim()?.charAt(0)?.toLowerCase();
        if (itemFirstChar === char.toLowerCase()) {
          return i;
        }
      }
      return -1;
    },
    [getItemRef, visibleItemIds],
  );

  const getToFocusIDByFirstCharacter = React.useCallback(
    (e: React.KeyboardEvent, idToStartSearch: string) => {
      // Get start index for search
      let starIndex = visibleItemIds.indexOf(idToStartSearch) + 1;
      if (starIndex === visibleItemIds.length) {
        starIndex = 0;
      }

      // Check following nodes in tree
      let toFocusIndex = searchByFirstChar(starIndex, visibleItemIds.length, e.key);
      // If not found in following nodes, check from beginning
      if (toFocusIndex === -1) {
        toFocusIndex = searchByFirstChar(0, starIndex - 1, e.key);
      }

      if (toFocusIndex === -1) {
        return idToStartSearch;
      }

      return visibleItemIds[toFocusIndex];
    },
    [searchByFirstChar, visibleItemIds],
  );

  return {
    flatTree,
    getItemById,
    activeItemIds,
    visibleItemIds,
    registerItemRef,
    getItemRef,
    toggleItemActive,
    focusItemById,
    expandSiblings,
    toggleItemSelect,
    getToFocusIDByFirstCharacter,
  };
}

function deprecated_getInitialActiveItemIds(items?: ObjectShorthandCollection<TreeItemProps>) {
  if (!items) {
    return [];
  }

  let result = [];
  items.forEach(item => {
    if (item.expanded) {
      result.push(item.id);
    }

    if (item.items) {
      result = result.concat(
        deprecated_getInitialActiveItemIds(item.items as ObjectShorthandCollection<TreeItemProps>),
      );
    }
  });
  return result;
}

function getLeafNodes(getItemById: (id: string) => FlatTreeItem, rootId: string) {
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
