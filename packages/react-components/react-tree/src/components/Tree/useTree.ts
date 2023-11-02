import * as React from 'react';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type {
  TreeCheckedChangeData,
  TreeCheckedChangeEvent,
  TreeNavigationData_unstable,
  TreeNavigationEvent_unstable,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  TreeProps,
  TreeState,
} from './Tree.types';
import { createNextOpenItems, useControllableOpenItems } from '../../hooks/useControllableOpenItems';
import { createNextNestedCheckedItems, useNestedCheckedItems } from './useNestedControllableCheckedItems';
import { SubtreeContext } from '../../contexts/subtreeContext';
import { useRootTree } from '../../hooks/useRootTree';
import { useSubtree } from '../../hooks/useSubtree';
import { HTMLElementWalker, createHTMLElementWalker } from '../../utils/createHTMLElementWalker';
import { treeItemFilter } from '../../utils/treeItemFilter';
import { useTreeNavigation } from './useTreeNavigation';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useTreeContext_unstable } from '../../contexts/treeContext';

export const useTree_unstable = (props: TreeProps, ref: React.Ref<HTMLElement>): TreeState => {
  const isRoot = React.useContext(SubtreeContext) === undefined;
  // as level is static, this doesn't break rule of hooks
  // and if this becomes an issue later on, this can be easily converted
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return isRoot ? useNestedRootTree(props, ref) : useNestedSubtree(props, ref);
};

function useNestedRootTree(props: TreeProps, ref: React.Ref<HTMLElement>): TreeState {
  const [openItems, setOpenItems] = useControllableOpenItems(props);
  const checkedItems = useNestedCheckedItems(props);
  const { navigate, initialize } = useTreeNavigation();
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

  const handleOpenChange = useEventCallback((event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    const nextOpenItems = createNextOpenItems(data, openItems);
    props.onOpenChange?.(event, {
      ...data,
      openItems: nextOpenItems.dangerouslyGetInternalSet_unstable(),
    });
    setOpenItems(nextOpenItems);
  });

  const handleCheckedChange = useEventCallback((event: TreeCheckedChangeEvent, data: TreeCheckedChangeData) => {
    if (walkerRef.current) {
      const nextCheckedItems = createNextNestedCheckedItems(data, checkedItems);
      props.onCheckedChange?.(event, {
        ...data,
        checkedItems: nextCheckedItems.dangerouslyGetInternalMap_unstable(),
      });
    }
  });
  const handleNavigation = useEventCallback(
    (event: TreeNavigationEvent_unstable, data: TreeNavigationData_unstable) => {
      props.onNavigation?.(event, data);
      if (walkerRef.current && !event.isDefaultPrevented()) {
        navigate(data, walkerRef.current);
      }
    },
  );

  return {
    treeType: 'nested',
    ...useRootTree(
      {
        ...props,
        openItems,
        checkedItems,
        onOpenChange: handleOpenChange,
        onNavigation: handleNavigation,
        onCheckedChange: handleCheckedChange,
      },
      useMergedRefs(ref, initializeWalker),
    ),
  };
}

function useNestedSubtree(props: TreeProps, ref: React.Ref<HTMLElement>): TreeState {
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
