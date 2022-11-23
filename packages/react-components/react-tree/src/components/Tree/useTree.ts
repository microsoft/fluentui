import * as React from 'react';
import {
  getNativeElementProps,
  useControllableState,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { TreeOpenChangeData, TreeProps, TreeState } from './Tree.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { useTreeContext_unstable } from '../../contexts/treeContext';

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
  const {
    isSubtree,
    level: parentLevel,
    openTrees: rootOpenTrees,
    requestOpenChange: rootRequestOpenChange,
    treeRef: parentTreeRef,
  } = useTreeContext_unstable();
  warnIfNecessary(props, isSubtree);
  const { openSubtrees: stateOpenTrees, defaultOpenSubtrees: defaultOpenTrees, onOpenChange, ...rest } = props;
  const arrowNavigationProps = useArrowNavigationGroup({
    tabbable: true,
    axis: 'vertical',
  });
  const [localOpenTrees, setOpenTrees] = useControllableState({
    state: React.useMemo(() => normalizeOpenTreesOrUndefined(stateOpenTrees), [stateOpenTrees]),
    defaultState: () => normalizeOpenTrees(defaultOpenTrees),
    initialState: [],
  });
  const localRequestOpenChange = useEventCallback((data: TreeOpenChangeData) => {
    onOpenChange?.(data.event, data);
    if (!data.event.isDefaultPrevented()) {
      setOpenTrees(updateOpenTrees(data, openTrees));
    }
  });
  const openTrees = isSubtree ? rootOpenTrees : localOpenTrees;
  const requestOpenChange = isSubtree ? rootRequestOpenChange : localRequestOpenChange;
  const isOpen = React.useMemo(() => !isSubtree || props.id === undefined || openTrees.includes(props.id), [
    props.id,
    openTrees,
    isSubtree,
  ]);
  const treeRef = React.useRef<HTMLElement>(null);
  const subtreeRef = React.useRef<HTMLElement>(null);

  return {
    components: {
      root: 'div',
    },
    isOpen,
    treeRef: isSubtree ? parentTreeRef : treeRef,
    subtreeRef,
    level: parentLevel + 1,
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, isSubtree ? subtreeRef : treeRef),
      role: isSubtree ? 'group' : 'tree',
      ...rest,
      ...(isSubtree ? undefined : arrowNavigationProps),
    }),
    openTrees,
    requestOpenChange,
  };
};

function warnIfNecessary(props: Pick<TreeProps, 'id' | 'aria-label' | 'aria-labelledby'>, isSubtree: boolean) {
  if (process.env.NODE_ENV === 'development') {
    if (isSubtree) {
      if (!props.id) {
        // eslint-disable-next-line no-console
        console.warn('as sub Tree must have an id to be referred by a TreeItem');
      }
    } else if (!props['aria-label'] && !props['aria-labelledby']) {
      // eslint-disable-next-line no-console
      console.warn('Tree must have either a `aria-label` or `aria-labelledby` property defined');
    }
  }
}

function normalizeOpenTrees(openItems?: string | string[]) {
  if (!openItems) {
    return [];
  }
  return Array.isArray(openItems) ? openItems : [openItems];
}

function normalizeOpenTreesOrUndefined(openItems?: string | string[]) {
  if (!openItems) {
    return undefined;
  }
  return normalizeOpenTrees(openItems);
}

function updateOpenTrees(data: TreeOpenChangeData, previousOpenTrees: string[]) {
  if (data.open) {
    return previousOpenTrees.includes(data.id) ? previousOpenTrees : [...previousOpenTrees, data.id];
  }
  const nextOpenItems = previousOpenTrees.filter(value => value !== data.id);
  return nextOpenItems.length === previousOpenTrees.length ? previousOpenTrees : nextOpenItems;
}
