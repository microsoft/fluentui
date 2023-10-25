import * as React from 'react';
import { TreeProps, TreeState } from '../Tree';
import { SubtreeContextValue, useSubtreeContext_unstable, useTreeItemContext_unstable } from '../contexts/index';
import { getIntrinsicElementProps, useMergedRefs, slot } from '@fluentui/react-utilities';

/**
 * Create the state required to render a sub-level tree.
 *
 * @param props - props from this instance of tree
 * @param ref - reference to root HTMLElement of tree
 */
export function useSubtree(
  props: TreeProps,
  ref: React.Ref<HTMLElement>,
): Omit<TreeState & SubtreeContextValue, 'treeType'> {
  const subtreeRef = useTreeItemContext_unstable(ctx => ctx.subtreeRef);

  const { level: parentLevel } = useSubtreeContext_unstable();

  const open = useTreeItemContext_unstable(ctx => ctx.open);

  return {
    contextType: 'subtree',
    open,
    components: {
      root: 'div',
    },
    level: parentLevel + 1,
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, subtreeRef) as React.Ref<HTMLDivElement>,
        role: 'group',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
}
