'use client';

import * as React from 'react';
import { useRootTree } from '../../hooks/useRootTree';
import type { FlatTreeProps, FlatTreeState } from './FlatTree.types';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { useFlatTreeNavigation } from '../../hooks/useFlatTreeNavigation';
import { useSubtree } from '../../hooks/useSubtree';
import { ImmutableSet } from '../../utils/ImmutableSet';
import { ImmutableMap } from '../../utils/ImmutableMap';
import { SubtreeContext } from '../../contexts/subtreeContext';
import { Collapse } from '@fluentui/react-motion-components-preview';
import { presenceMotionSlot } from '@fluentui/react-motion';

export const useFlatTree_unstable: (props: FlatTreeProps, ref: React.Ref<HTMLElement>) => FlatTreeState = (
  props,
  ref,
) => {
  const isRoot = React.useContext(SubtreeContext) === undefined;
  // as level is static, this doesn't break rule of hooks
  // and if this becomes an issue later on, this can be easily converted
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return isRoot ? useRootFlatTree(props, ref) : useSubFlatTree(props, ref);
};

function useRootFlatTree(props: FlatTreeProps, ref: React.Ref<HTMLElement>): FlatTreeState {
  const { appearance = 'subtle', size = 'medium' } = props;
  const navigation = useFlatTreeNavigation(props.navigationMode);
  const state = useRootTree(
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

  return Object.assign(state, {
    appearance,
    size,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    components: { ...state.components, collapseMotion: Collapse },
    collapseMotion: undefined,
    treeType: 'flat',
    forceUpdateRovingTabIndex: navigation.forceUpdateRovingTabIndex,
  } as const);
}

function useSubFlatTree(props: FlatTreeProps, ref: React.Ref<HTMLElement>): FlatTreeState {
  if (process.env.NODE_ENV === 'development') {
    throw new Error(/* #__DE-INDENT__ */ `
      @fluentui/react-tree [useFlatTree]:
      Subtrees are not allowed in a FlatTree!
      You cannot use a <FlatTree> component inside of another <FlatTree> nor a <Tree> component!
    `);
  }
  const state = useSubtree(props, ref);
  return {
    ...state,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    components: { ...state.components, collapseMotion: Collapse },
    collapseMotion: presenceMotionSlot(props.collapseMotion, {
      elementType: Collapse,
      defaultProps: {
        visible: state.open,
        unmountOnExit: true,
      },
    }),
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
