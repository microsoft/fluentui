'use client';

import * as React from 'react';
import { useRootTree } from '../../hooks/useRootTree';
import { FlatTreeBaseProps, FlatTreeBaseState, FlatTreeProps, FlatTreeState } from './FlatTree.types';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { useFlatTreeNavigation } from '../../hooks/useFlatTreeNavigation';
import { useSubtree } from '../../hooks/useSubtree';
import { ImmutableSet } from '../../utils/ImmutableSet';
import { ImmutableMap } from '../../utils/ImmutableMap';
import { SubtreeContext } from '../../contexts/subtreeContext';

/**
 * Create the base state required to render FlatTree, without design-only props.
 *
 * @param props - props from this instance of FlatTree (without appearance and size)
 * @param ref - reference to root HTMLElement of FlatTree
 */
export const useFlatTreeBase_unstable: (props: FlatTreeBaseProps, ref: React.Ref<HTMLElement>) => FlatTreeBaseState = (
  props,
  ref,
) => {
  'use no memo';

  const isRoot = React.useContext(SubtreeContext) === undefined;
  // as level is static, this doesn't break rule of hooks
  // and if this becomes an issue later on, this can be easily converted
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return isRoot ? useRootFlatTreeBase(props, ref) : (useSubFlatTree(props as FlatTreeProps, ref) as FlatTreeBaseState);
};

/**
 * Create the state required to render FlatTree.
 *
 * The returned state can be modified with hooks such as useFlatTreeStyles_unstable,
 * before being passed to renderFlatTree_unstable.
 *
 * @param props - props from this instance of FlatTree
 * @param ref - reference to root HTMLElement of FlatTree
 */
export const useFlatTree_unstable: (props: FlatTreeProps, ref: React.Ref<HTMLElement>) => FlatTreeState = (
  props,
  ref,
) => {
  'use no memo';

  const { appearance = 'subtle', size = 'medium' } = props;
  const baseState = useFlatTreeBase_unstable(props, ref);
  return { ...baseState, appearance, size } as unknown as FlatTreeState;
};

function useRootFlatTreeBase(props: FlatTreeBaseProps, ref: React.Ref<HTMLElement>): FlatTreeBaseState {
  const navigation = useFlatTreeNavigation(props.navigationMode);

  const fullState = useRootTree(
    {
      ...props,
      onNavigation: useEventCallback((event, data) => {
        props.onNavigation?.(event, data);
        if (!event.isDefaultPrevented()) {
          navigation.navigate(data);
        }
      }),
    },
    useMergedRefs(ref, navigation.rootRef),
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { appearance: _appearance, size: _size, ...baseState } = fullState;
  return Object.assign(baseState, {
    treeType: 'flat',
    forceUpdateRovingTabIndex: navigation.forceUpdateRovingTabIndex,
  } as const) as unknown as FlatTreeBaseState;
}

function useSubFlatTree(props: FlatTreeProps, ref: React.Ref<HTMLElement>): FlatTreeState {
  if (process.env.NODE_ENV === 'development') {
    throw new Error(/* #__DE-INDENT__ */ `
      @fluentui/react-tree [useFlatTree]:
      Subtrees are not allowed in a FlatTree!
      You cannot use a <FlatTree> component inside of another <FlatTree> nor a <Tree> component!
    `);
  }
  return {
    ...useSubtree(props, ref),
    // ------ defaultTreeContextValue
    level: 0,
    contextType: 'root',
    treeType: 'nested',
    selectionMode: 'none',
    openItems: ImmutableSet.empty,
    checkedItems: ImmutableMap.empty,
    requestTreeResponse: noop,
    forceUpdateRovingTabIndex: noop,
    appearance: 'subtle',
    size: 'medium',
    // ------ defaultTreeContextValue
    open: false,
  };
}

function noop() {
  /* do nothing */
}
