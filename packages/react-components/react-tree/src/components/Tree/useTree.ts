import * as React from 'react';
import { getNativeElementProps, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { TreeOpenChangeData, TreeProps, TreeState, TreeNavigationData_unstable } from './Tree.types';
import { useTreeContext_unstable } from '../../contexts';
import { useNestedTreeNavigation, useOpenItemsState } from '../../hooks';

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
  const openItems = useTreeContext_unstable(ctx => ctx.openItems);
  const requestOpenChange = useTreeContext_unstable(ctx => ctx.requestOpenChange);
  const requestNavigation = useTreeContext_unstable(ctx => ctx.requestNavigation);

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
    requestNavigation,
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

  const [openItems, updateOpenItems] = useOpenItemsState(props);
  const [navigate, treeRef] = useNestedTreeNavigation();

  const requestOpenChange = useEventCallback((data: TreeOpenChangeData) => {
    props.onOpenChange?.(data.event, data);
    if (data.event.isDefaultPrevented()) {
      return;
    }
    return updateOpenItems(data);
  });

  const requestNavigation = useEventCallback((data: TreeNavigationData_unstable) => {
    props.onNavigation_unstable?.(data.event, data);
    if (data.event.isDefaultPrevented()) {
      return;
    }
    navigate(data);
    data.event.preventDefault();
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
    requestNavigation,
    root: getNativeElementProps('div', {
      ref: useMergedRefs(treeRef, ref),
      role: 'tree',
      ...props,
    }),
  };
}

function warnIfNoProperPropsRootTree(props: Pick<TreeProps, 'aria-label' | 'aria-labelledby'>) {
  if (process.env.NODE_ENV === 'development') {
    if (!props['aria-label'] && !props['aria-labelledby']) {
      // eslint-disable-next-line no-console
      console.warn('Tree must have either a `aria-label` or `aria-labelledby` property defined');
    }
  }
}
