'use client';

import * as React from 'react';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { TreeBaseProps, TreeBaseState, TreeProps, TreeState } from './Tree.types';
import { createNextOpenItems, useControllableOpenItems } from '../../hooks/useControllableOpenItems';
import { createNextNestedCheckedItems, useNestedCheckedItems } from './useNestedControllableCheckedItems';
import { SubtreeContext } from '../../contexts/subtreeContext';
import { useRootTree } from '../../hooks/useRootTree';
import { useSubtree } from '../../hooks/useSubtree';
import { useTreeNavigation } from '../../hooks/useTreeNavigation';
import { useTreeContext_unstable } from '../../contexts/treeContext';
import { ImmutableSet } from '../../utils/ImmutableSet';
import { ImmutableMap } from '../../utils/ImmutableMap';

/**
 * Create the base state required to render Tree, without design-only props.
 *
 * @param props - props from this instance of Tree (without appearance and size)
 * @param ref - reference to root HTMLElement of Tree
 */
export const useTreeBase_unstable = (props: TreeBaseProps, ref: React.Ref<HTMLElement>): TreeBaseState => {
  'use no memo';

  const isRoot = React.useContext(SubtreeContext) === undefined;
  // as level is static, this doesn't break rule of hooks
  // and if this becomes an issue later on, this can be easily converted
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return isRoot ? useNestedRootTreeBase(props, ref) : (useNestedSubtree(props as TreeProps, ref) as TreeBaseState);
};

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
  'use no memo';

  const { appearance = 'subtle', size = 'medium' } = props;
  const baseState = useTreeBase_unstable(props, ref);
  if (baseState.contextType === 'root') {
    return { ...baseState, appearance, size } as unknown as TreeState;
  }
  return baseState as unknown as TreeState;
};

function useNestedRootTreeBase(props: TreeBaseProps, ref: React.Ref<HTMLElement>): TreeBaseState {
  'use no memo';

  const [openItems, setOpenItems] = useControllableOpenItems(props);
  const checkedItems = useNestedCheckedItems(props);
  const navigation = useTreeNavigation(props.navigationMode);

  const fullState = useRootTree(
    {
      ...props,
      openItems,
      checkedItems,
      onOpenChange: useEventCallback((event, data) => {
        const nextOpenItems = createNextOpenItems(data, openItems);
        props.onOpenChange?.(event, {
          ...data,
          openItems: ImmutableSet.dangerouslyGetInternalSet(nextOpenItems),
        });
        setOpenItems(nextOpenItems);
      }),
      onNavigation: useEventCallback((event, data) => {
        props.onNavigation?.(event, data);
        if (!event.isDefaultPrevented()) {
          navigation.navigate(data, {
            preventScroll: data.isScrollPrevented(),
          });
        }
      }),
      onCheckedChange: useEventCallback((event, data) => {
        const nextCheckedItems = createNextNestedCheckedItems(data, checkedItems);
        props.onCheckedChange?.(event, {
          ...data,
          checkedItems: ImmutableMap.dangerouslyGetInternalMap(nextCheckedItems),
        });
      }),
    },
    useMergedRefs(ref, navigation.treeRef),
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { appearance: _appearance, size: _size, ...baseRootState } = fullState;
  return Object.assign(baseRootState, {
    treeType: 'nested',
    forceUpdateRovingTabIndex: navigation.forceUpdateRovingTabIndex,
  } as const) as unknown as TreeBaseState;
}

function useNestedSubtree(props: TreeProps, ref: React.Ref<HTMLElement>): TreeState {
  'use no memo';

  if (process.env.NODE_ENV === 'development') {
    // this doesn't break rule of hooks, as environment is a static value
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const treeType = useTreeContext_unstable(ctx => ctx.treeType);
    if (treeType === 'flat') {
      throw new Error(/* #__DE-INDENT__ */ `
        @fluentui/react-tree [useTree]:
        Subtrees are not allowed in a FlatTree!
        You cannot use a <Tree> component inside of a <FlatTree> component!
      `);
    }
  }
  return useSubtree(props, ref);
}
