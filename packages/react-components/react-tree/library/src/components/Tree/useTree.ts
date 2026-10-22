'use client';

import * as React from 'react';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { useFocusFinders, useFocusedElementChange } from '@fluentui/react-tabster';
import { presenceMotionSlot } from '@fluentui/react-motion';
import { Collapse } from '@fluentui/react-motion-components-preview';
import type { TreeBaseProps, TreeBaseState, TreeProps, TreeState } from './Tree.types';
import { createNextOpenItems, useControllableOpenItems } from '../../hooks/useControllableOpenItems';
import { createNextNestedCheckedItems, useNestedCheckedItems } from './useNestedControllableCheckedItems';
import { SubtreeContext } from '../../contexts/subtreeContext';
import { useRootTree } from '../../hooks/useRootTree';
import { useSubtree } from '../../hooks/useSubtree';
import { findFirstFocusableDOM, useTreeNavigationBase } from '../../hooks/useTreeNavigationBase';
import type { TreeNavigationOptions } from '../../hooks/useTreeNavigationBase';
import { useDOMFocusedElementChange } from '../../hooks/useRovingTabIndexBase';
import { useTreeContext_unstable } from '../../contexts/treeContext';
import { ImmutableSet } from '../../utils/ImmutableSet';
import { ImmutableMap } from '../../utils/ImmutableMap';

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
  const { appearance = 'subtle', size = 'medium', collapseMotion, ...baseProps } = props;
  // Tabster aware focus management, superseding the plain DOM one used by the base hook.
  const state = useTreeInternal(baseProps, ref, useTabsterNavigationOptions);

  if (state.contextType === 'subtree') {
    return {
      ...state,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      components: { ...state.components, collapseMotion: Collapse },
      collapseMotion: presenceMotionSlot(collapseMotion, {
        elementType: Collapse,
        defaultProps: {
          visible: state.open,
          unmountOnExit: true,
        },
      }),
    };
  }

  return {
    ...state,
    appearance,
    size,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    components: { ...state.components, collapseMotion: Collapse },
    collapseMotion: undefined,
  };
};

/**
 * Base state hook for Tree, free of any design props, motion or focus management runtime.
 *
 * Arrow key navigation and the roving tab index are driven by plain DOM focus handling, and closed
 * subtrees are not rendered as there is no collapse motion to unmount them.
 *
 * @param props - props from this instance of Tree
 * @param ref - reference to root HTMLElement of Tree
 */
export const useTreeBase_unstable = (props: TreeBaseProps, ref: React.Ref<HTMLElement>): TreeBaseState => {
  return useTreeInternal(props, ref, useDOMNavigationOptions);
};

const domNavigationOptions: TreeNavigationOptions = {
  findFirstFocusable: findFirstFocusableDOM,
  useFocusedElementChange: useDOMFocusedElementChange,
};

const useDOMNavigationOptions = (): TreeNavigationOptions => domNavigationOptions;

const useTabsterNavigationOptions = (): TreeNavigationOptions => {
  const { findFirstFocusable } = useFocusFinders();
  return { findFirstFocusable, useFocusedElementChange };
};

function useTreeInternal(
  props: TreeBaseProps,
  ref: React.Ref<HTMLElement>,
  // Only the root tree drives navigation, so subtrees never pay for the focus management runtime.
  useNavigationOptions: () => TreeNavigationOptions,
): TreeBaseState {
  const isRoot = React.useContext(SubtreeContext) === undefined;
  // as level is static, this doesn't break rule of hooks
  // and if this becomes an issue later on, this can be easily converted
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return isRoot ? useNestedRootTree(props, ref, useNavigationOptions) : useNestedSubtree(props, ref);
}

function useNestedRootTree(
  props: TreeBaseProps,
  ref: React.Ref<HTMLElement>,
  useNavigationOptions: () => TreeNavigationOptions,
): TreeBaseState {
  'use no memo'; // justified: compiler would optimize useNestedRootTree — manual opt-out to preserve runtime behavior

  const [openItems, setOpenItems] = useControllableOpenItems(props);
  const checkedItems = useNestedCheckedItems(props);
  const navigation = useTreeNavigationBase(props.navigationMode, useNavigationOptions());

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
    ),
    {
      treeType: 'nested',
      forceUpdateRovingTabIndex: navigation.forceUpdateRovingTabIndex,
    } as const,
  );
}

function useNestedSubtree(props: TreeBaseProps, ref: React.Ref<HTMLElement>): TreeBaseState {
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
