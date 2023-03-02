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
import { TreeOpenChangeData, TreeProps, TreeState } from './Tree.types';
import { useTreeContext_unstable } from '../../contexts/treeContext';
import { filterTreeItemAndSubtree, useTreeWalker } from '../../utils/useTreeWalker';
import { updateOpenItems } from '../../utils/updateOpenItems';
import { createImmutableSet, emptyImmutableSet } from '../../utils/ImmutableSet';

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
 * Create the state required to render a sub-level Tree.
 *
 * @param props - props from this instance of Tree
 * @param ref - reference to root HTMLElement of Tree
 */
function useSubtree(props: TreeProps, ref: React.Ref<HTMLElement>): TreeState {
  const contextAppearance = useTreeContext_unstable(ctx => ctx.appearance);
  const contextSize = useTreeContext_unstable(ctx => ctx.size);

  const { appearance = contextAppearance ?? 'subtle', size = contextSize ?? 'medium' } = props;

  const parentLevel = useTreeContext_unstable(ctx => ctx.level);
  const focusFirstSubtreeItem = useTreeContext_unstable(ctx => ctx.focusFirstSubtreeItem);
  const focusSubtreeOwnerItem = useTreeContext_unstable(ctx => ctx.focusSubtreeOwnerItem);
  const openItems = useTreeContext_unstable(ctx => ctx.openItems);
  const requestOpenChange = useTreeContext_unstable(ctx => ctx.requestOpenChange);

  return {
    components: {
      root: 'div',
    },
    appearance,
    size,
    level: parentLevel + 1,
    root: getNativeElementProps('div', {
      ref,
      role: 'group',
      ...props,
    }),
    openItems,
    requestOpenChange,
    focusFirstSubtreeItem,
    focusSubtreeOwnerItem,
  };
}

/**
 * Create the state required to render the root level Tree.
 *
 * @param props - props from this instance of Tree
 * @param ref - reference to root HTMLElement of Tree
 */
function useRootTree(props: TreeProps, ref: React.Ref<HTMLElement>): TreeState {
  warnIfNoProperPropsRootTree(props);

  const { appearance = 'subtle', size = 'medium' } = props;

  const { targetDocument } = useFluent_unstable();
  const [openItems, setOpenItems] = useControllableState({
    state: React.useMemo(() => props.openItems && createImmutableSet(props.openItems), [props.openItems]),
    defaultState: React.useMemo(
      () => props.defaultOpenItems && createImmutableSet(props.defaultOpenItems),
      [props.defaultOpenItems],
    ),
    initialState: emptyImmutableSet,
  });
  const requestOpenChange = useEventCallback((data: TreeOpenChangeData) => {
    props.onOpenChange?.(data.event, data);
    if (!data.event.isDefaultPrevented()) {
      setOpenItems(updateOpenItems(data, openItems));
    }
  });
  const focusFirstSubtreeItem = useEventCallback((target: HTMLElement) => {
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
  });
  const focusSubtreeOwnerItem = useEventCallback((target: HTMLElement) => {
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
  });
  const { treeWalker: treeWalkerRef, root: treeRef } = useTreeWalker(NodeFilter.SHOW_ELEMENT, {
    acceptNode: filterTreeItemAndSubtree,
  });
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
    level: 1,
    openItems,
    requestOpenChange,
    focusFirstSubtreeItem,
    focusSubtreeOwnerItem,
    root: getNativeElementProps('div', {
      ref: useMergedRefs(treeRef, ref),
      role: 'tree',
      ...props,
      ...arrowNavigationProps,
    }),
  };
}

function warnIfNoProperPropsRootTree(props: Pick<TreeProps, 'id' | 'aria-label' | 'aria-labelledby'>) {
  if (process.env.NODE_ENV === 'development') {
    if (!props['aria-label'] && !props['aria-labelledby']) {
      // eslint-disable-next-line no-console
      console.warn('Tree must have either a `aria-label` or `aria-labelledby` property defined');
    }
  }
}
