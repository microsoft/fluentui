import * as React from 'react';
import { useAutoControlled } from '@fluentui/react-bindings';
import { useStableProps } from './useStableProps';
import { ObjectShorthandCollection } from '../../../types';
import { TreeItemProps } from '../TreeItem';
import { flattenTree } from './flattenTree';
import { useGetItemById } from './useGetItemById';
import * as _ from 'lodash';

export interface UseTreeOptions {
  /** Shorthand array of props for Tree. */
  items?: ObjectShorthandCollection<TreeItemProps>;
  /** Ids of expanded items. */
  activeItemIds?: string[];
  /** Initial activeItemIds value. */
  defaultActiveItemIds?: string[];
  /** Only allow one subtree to be expanded at a time. */
  exclusive?: boolean;
}

export function useTree(options: UseTreeOptions) {
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

  // We want to set `visibleItemIds` to simplify rendering later
  const { flatTree, visibleItemIds } = React.useMemo(() => flattenTree(options.items, activeItemIds), [
    activeItemIds,
    options.items,
  ]);

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
