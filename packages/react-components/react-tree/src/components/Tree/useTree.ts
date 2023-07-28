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
import { useTreeNavigation } from './useTreeNavigation';
import { useControllableCheckedItems } from './useControllableCheckedItems';
import { useTreeContext_unstable } from '../../contexts/treeContext';
import { useRootTree } from '../../hooks/useRootTree';
import { useSubtree } from '../../hooks/useSubtree';
import { HTMLElementWalker, createHTMLElementWalker } from '../../utils/createHTMLElementWalker';
import { treeItemFilter } from '../../utils/treeItemFilter';

export const useTree_unstable = (props: TreeProps, ref: React.Ref<HTMLElement>): TreeState => {
  const [openItems, setOpenItems] = useControllableOpenItems(props);
  const [checkedItems] = useControllableCheckedItems(props);
  const { navigate, initialize } = useTreeNavigation();
  const walkerRef = React.useRef<HTMLElementWalker>();
  const initializeWalker = React.useCallback(
    (root: HTMLElement | null) => {
      if (root) {
        walkerRef.current = createHTMLElementWalker(root, treeItemFilter);
        initialize(walkerRef.current);
      }
    },
    [initialize],
  );

  const handleOpenChange = useEventCallback((event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    props.onOpenChange?.(event, data);
    setOpenItems(createNextOpenItems(data, openItems));
  });
  const handleCheckedChange = useEventCallback((event: TreeCheckedChangeEvent, data: TreeCheckedChangeData) => {
    props.onCheckedChange?.(event, data);
    // TODO: implement next checked items for  tree
  });
  const handleNavigation = useEventCallback(
    (event: TreeNavigationEvent_unstable, data: TreeNavigationData_unstable) => {
      props.onNavigation_unstable?.(event, data);
      if (walkerRef.current) {
        navigate(data, walkerRef.current);
      }
    },
  );

  const baseProps = {
    ...props,
    openItems,
    checkedItems,
    onOpenChange: handleOpenChange,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    onNavigation_unstable: handleNavigation,
    onCheckedChange: handleCheckedChange,
  };

  const baseRef = useMergedRefs(ref, initializeWalker);

  const isSubtree = useTreeContext_unstable(ctx => ctx.level > 0);
  // as isSubTree is static, this doesn't break rule of hooks
  // and if this becomes an issue later on, this can be easily converted
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return isSubtree ? useSubtree(baseProps, baseRef) : useRootTree(baseProps, baseRef);
};
