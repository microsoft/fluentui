'use client';

import type * as React from 'react';
import type { TreeBaseProps, TreeBaseState } from '../components/Tree/Tree.types';
import type { SubtreeContextValue } from '../contexts/index';
import { useSubtreeContext_unstable, useTreeItemContext_unstable } from '../contexts/index';
import { useMergedRefs, slot } from '@fluentui/react-utilities';

/**
 * Create the state required to render a sub-level tree.
 *
 * @param props - props from this instance of tree
 * @param ref - reference to root HTMLElement of tree
 */
export function useSubtree(
  props: TreeBaseProps,
  ref: React.Ref<HTMLElement>,
): Omit<TreeBaseState & SubtreeContextValue, 'treeType'> {
  const subtreeRef = useTreeItemContext_unstable(ctx => ctx.subtreeRef);

  const { level: parentLevel } = useSubtreeContext_unstable();

  const open = useTreeItemContext_unstable(ctx => ctx.open);

  // Tree level props are owned by the root tree, they must not reach the subtree root
  const {
    navigationMode: _navigationMode,
    selectionMode: _selectionMode,
    openItems: _openItems,
    defaultOpenItems: _defaultOpenItems,
    onOpenChange: _onOpenChange,
    onNavigation: _onNavigation,
    checkedItems: _checkedItems,
    onCheckedChange: _onCheckedChange,
    ...rest
  } = props;

  return {
    contextType: 'subtree',
    open,
    components: {
      root: 'div',
    },
    level: parentLevel + 1,
    root: slot.always(
      {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, subtreeRef) as React.Ref<HTMLDivElement>,
        role: 'group',
        ...rest,
      },
      { elementType: 'div' },
    ),
  };
}
