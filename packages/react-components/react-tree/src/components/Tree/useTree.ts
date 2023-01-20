import * as React from 'react';
import {
  getNativeElementProps,
  useControllableState,
  useEventCallback,
  useMergedRefs,
  isHTMLElement,
} from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import type { TreeOpenChangeData, TreeProps, TreeState } from './Tree.types';
import { useTreeContext_unstable } from '../../contexts/treeContext';
import { useTreeWalker } from '../../utils/useTreeWalker';

/**
 * Create the state required to render Tree.
 *
 * The returned state can be modified with hooks such as useTreeStyles_unstable,
 * before being passed to renderTree_unstable.
 *
 * @param props - props from this instance of Tree
 * @param ref - reference to root HTMLElement of Tree
 */
export const useTree_unstable = (props: TreeProps, ref: React.Ref<HTMLElement>): TreeState => {
  const isSubtree = useTreeContext_unstable(ctx => ctx.level > 0);
  // as isSubtree is static, this doesn't break rule of hooks
  // and if this becomes an issue later on, this can be easily converted
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return isSubtree ? useSubtree(props, ref) : useRootTree(props, ref);
};

/**
 * Create the common state required to render Tree.
 *
 * The returned state can be modified with hooks such as useTreeStyles_unstable,
 * before being passed to renderTree_unstable.
 *
 * @param props - props from this instance of Tree
 * @param ref - reference to root HTMLElement of Tree
 */
function useSubtree(props: TreeProps, ref: React.Ref<HTMLElement>): TreeState {
  const { appearance = 'subtle', size = 'medium' } = props;
  const parentLevel = useTreeContext_unstable(ctx => ctx.level);
  const focusFirstSubtreeItem = useTreeContext_unstable(ctx => ctx.focusFirstSubtreeItem);
  const focusSubtreeOwnerItem = useTreeContext_unstable(ctx => ctx.focusSubtreeOwnerItem);
  const openSubtrees = useTreeContext_unstable(ctx => ctx.openSubtrees);
  const requestOpenChange = useTreeContext_unstable(ctx => ctx.requestOpenChange);
  const isSubtree = parentLevel > 0;

  if (isSubtree) {
    warnIfNoProperPropsSubtree(props);
  }

  const open = useTreeContext_unstable(
    ctx => !isSubtree || props.id === undefined || ctx.openSubtrees.includes(props.id),
  );
  const arrowNavigationProps = useArrowNavigationGroup({
    tabbable: true,
    axis: 'vertical',
  });

  return {
    components: {
      root: 'div',
    },
    appearance,
    size,
    open,
    level: parentLevel + 1,
    openSubtrees,
    requestOpenChange,
    focusFirstSubtreeItem,
    focusSubtreeOwnerItem,
    root: getNativeElementProps('div', {
      ref,
      role: isSubtree ? 'group' : 'tree',
      ...props,
      ...(isSubtree ? undefined : arrowNavigationProps),
    }),
  };
}

/**
 * Create the state required to render the root Tree.
 *
 * The returned state can be modified with hooks such as useTreeStyles_unstable,
 * before being passed to renderTree_unstable.
 *
 * @param props - props from this instance of Tree
 * @param ref - reference to root HTMLElement of Tree
 */
function useRootTree(props: TreeProps, ref: React.Ref<HTMLElement>): TreeState {
  warnIfNoProperPropsRootTree(props);
  const { openSubtrees: stateOpenSubtrees, defaultOpenSubtrees, onOpenChange } = props;
  const [openSubtrees, setOpenSubtrees] = useControllableState({
    state: React.useMemo(() => normalizeOpenSubtreesOrUndefined(stateOpenSubtrees), [stateOpenSubtrees]),
    defaultState: () => normalizeOpenSubtrees(defaultOpenSubtrees),
    initialState: [],
  });
  const { targetDocument } = useFluent_unstable();
  const requestOpenChange = useEventCallback((data: TreeOpenChangeData) => {
    onOpenChange?.(data.event, data);
    if (!data.event.isDefaultPrevented()) {
      setOpenSubtrees(updateOpenSubtrees(data, openSubtrees));
    }
  });
  const { treeWalker: treeWalkerRef, root: treeRef } = useTreeWalker(NodeFilter.SHOW_ELEMENT, {
    acceptNode: filterTreeItemAndSubtree,
  });
  const commonState = useSubtree(props, useMergedRefs(ref, treeRef));
  return {
    ...commonState,
    openSubtrees,
    requestOpenChange,
    focusFirstSubtreeItem: useEventCallback(target => {
      const treeWalker = treeWalkerRef.current;
      if (!treeWalker) {
        return;
      }
      const groupId = target.getAttribute('aria-owns');
      if (groupId && targetDocument) {
        const element = targetDocument.getElementById(groupId);
        if (treeWalker && element) {
          treeWalker.currentNode = element;
          const firstTreeItem = treeWalker.firstChild();
          if (isHTMLElement(firstTreeItem)) {
            return firstTreeItem?.focus();
          }
        }
      }
    }),
    focusSubtreeOwnerItem: useEventCallback(target => {
      const treeWalker = treeWalkerRef.current;
      if (!treeWalker) {
        return;
      }
      treeWalker.currentNode = target;
      const group = treeWalker.parentNode();
      if (isHTMLElement(group)) {
        while (treeWalker.previousNode()) {
          const treeItem = treeWalker.currentNode;
          if (isHTMLElement(treeItem) && treeItem.getAttribute('aria-owns') === group.id) {
            return treeItem.focus();
          }
        }
      }
    }),
  };
}

function filterTreeItemAndSubtree(node: Node) {
  const element = node as HTMLElement & { role: string };
  return element.role === 'treeitem' || element.role === 'group' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
}

function warnIfNoProperPropsSubtree(props: Pick<TreeProps, 'id' | 'aria-label' | 'aria-labelledby'>) {
  if (process.env.NODE_ENV === 'development') {
    if (!props.id) {
      // eslint-disable-next-line no-console
      console.warn('as sub Tree must have an id to be referred by a TreeItem');
    }
  }
}

function warnIfNoProperPropsRootTree(props: Pick<TreeProps, 'id' | 'aria-label' | 'aria-labelledby'>) {
  if (process.env.NODE_ENV === 'development') {
    if (!props['aria-label'] && !props['aria-labelledby']) {
      // eslint-disable-next-line no-console
      console.warn('Tree must have either a `aria-label` or `aria-labelledby` property defined');
    }
  }
}

function normalizeOpenSubtrees(openSubtrees?: string | string[]) {
  if (!openSubtrees) {
    return [];
  }
  return Array.isArray(openSubtrees) ? openSubtrees : [openSubtrees];
}

function normalizeOpenSubtreesOrUndefined(openSubtrees?: string | string[]) {
  if (!openSubtrees) {
    return undefined;
  }
  return normalizeOpenSubtrees(openSubtrees);
}

function updateOpenSubtrees(data: TreeOpenChangeData, previousOpenSubtrees: string[]) {
  if (data.open) {
    return previousOpenSubtrees.includes(data.id) ? previousOpenSubtrees : [...previousOpenSubtrees, data.id];
  }
  const nextOpenItems = previousOpenSubtrees.filter(value => value !== data.id);
  return nextOpenItems.length === previousOpenSubtrees.length ? previousOpenSubtrees : nextOpenItems;
}
