import * as React from 'react';
import { TreeProps, TreeState } from '../Tree';
import { SubtreeContextValue, useTreeContext_unstable, useTreeItemContext_unstable } from '../contexts/index';
import { getNativeElementProps, useMergedRefs, slot } from '@fluentui/react-utilities';

/**
 * Create the state required to render a sub-level tree.
 *
 * @param props - props from this instance of tree
 * @param ref - reference to root HTMLElement of tree
 */
export function useSubtree(
  props: Pick<TreeProps, 'appearance' | 'size'>,
  ref: React.Ref<HTMLElement>,
): Omit<TreeState & SubtreeContextValue, 'treeType'> {
  const subtreeRef = useTreeItemContext_unstable(ctx => ctx.subtreeRef);

  const parentLevel = useTreeContext_unstable(ctx => ctx.level);

  const open = useTreeItemContext_unstable(ctx => ctx.open);

  return {
    contextType: 'subtree',
    open,
    components: {
      root: 'div',
    },
    level: parentLevel + 1,
    root: slot.always(
      getNativeElementProps('div', {
        ref: useMergedRefs(ref, subtreeRef),
        role: 'group',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
}
