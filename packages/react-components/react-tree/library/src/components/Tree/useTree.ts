import * as React from 'react';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { TreeProps, TreeState } from './Tree.types';
import { createNextOpenItems, useControllableOpenItems } from '../../hooks/useControllableOpenItems';
import { createNextNestedCheckedItems, useNestedCheckedItems } from './useNestedControllableCheckedItems';
import { SubtreeContext } from '../../contexts/subtreeContext';
import { useRootTree } from '../../hooks/useRootTree';
import { useSubtree } from '../../hooks/useSubtree';
import { useTreeNavigation } from '../../hooks/useTreeNavigation';
import { useTreeContext_unstable } from '../../contexts/treeContext';

export const useTree_unstable = (props: TreeProps, ref: React.Ref<HTMLElement>): TreeState => {
  'use no memo';

  const isRoot = React.useContext(SubtreeContext) === undefined;
  // as level is static, this doesn't break rule of hooks
  // and if this becomes an issue later on, this can be easily converted
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return isRoot ? useNestedRootTree(props, ref) : useNestedSubtree(props, ref);
};

function useNestedRootTree(props: TreeProps, ref: React.Ref<HTMLElement>): TreeState {
  'use no memo';

  const [openItems, setOpenItems] = useControllableOpenItems(props);
  const checkedItems = useNestedCheckedItems(props);
  const navigation = useTreeNavigation();

  return Object.assign(
    useRootTree(
      {
        ...props,
        openItems,
        checkedItems,
        onOpenChange: useEventCallback((event, data) => {
          const nextOpenItems = createNextOpenItems(data, openItems);
          props.onOpenChange?.(event, {
            ...data,
            openItems: nextOpenItems.dangerouslyGetInternalSet_unstable(),
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
            checkedItems: nextCheckedItems.dangerouslyGetInternalMap_unstable(),
          });
        }),
      },
      useMergedRefs(ref, navigation.treeRef),
    ),
    { treeType: 'nested' } as const,
  );
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
