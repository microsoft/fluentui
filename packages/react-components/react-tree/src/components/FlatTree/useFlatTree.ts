import * as React from 'react';
import { useRootTree } from '../../hooks/useRootTree';
import { FlatTreeProps, FlatTreeState } from './FlatTree.types';
import { useFlatTreeNavigation } from './useFlatTreeNavigation';
import { HTMLElementWalker, createHTMLElementWalker } from '../../utils/createHTMLElementWalker';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { treeItemFilter } from '../../utils/treeItemFilter';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { TreeNavigationData_unstable, TreeNavigationEvent_unstable } from '../Tree/Tree.types';
import { useSubtree } from '../../hooks/useSubtree';
import { ImmutableSet } from '../../utils/ImmutableSet';
import { ImmutableMap } from '../../utils/ImmutableMap';
import { SubtreeContext } from '../../contexts/subtreeContext';

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
  const { navigate, initialize } = useFlatTreeNavigation();
  const walkerRef = React.useRef<HTMLElementWalker>();
  const { targetDocument } = useFluent_unstable();

  const initializeWalker = React.useCallback(
    (root: HTMLElement | null) => {
      if (root && targetDocument) {
        walkerRef.current = createHTMLElementWalker(root, targetDocument, treeItemFilter);
        initialize(walkerRef.current);
      }
    },
    [initialize, targetDocument],
  );

  const handleNavigation = useEventCallback(
    (event: TreeNavigationEvent_unstable, data: TreeNavigationData_unstable) => {
      props.onNavigation?.(event, data);
      if (walkerRef.current && !event.isDefaultPrevented()) {
        navigate(data, walkerRef.current);
      }
    },
  );

  return {
    treeType: 'flat',
    ...useRootTree({ ...props, onNavigation: handleNavigation }, useMergedRefs(ref, initializeWalker)),
  };
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
    appearance: 'subtle',
    size: 'medium',
    // ------ defaultTreeContextValue
    open: false,
  };
}

function noop() {
  /* do nothing */
}
