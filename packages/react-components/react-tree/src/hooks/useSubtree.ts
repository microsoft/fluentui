import * as React from 'react';
import { TreeProps, TreeState } from '../Tree';
import { useTreeContext_unstable, useTreeItemContext_unstable } from '../contexts/index';
import { getNativeElementProps, useMergedRefs } from '@fluentui/react-utilities';

/**
 * Create the state required to render a sub-level tree.
 *
 * @param props - props from this instance of tree
 * @param ref - reference to root HTMLElement of tree
 */
export function useSubtree(props: Pick<TreeProps, 'appearance' | 'size'>, ref: React.Ref<HTMLElement>): TreeState {
  const contextAppearance = useTreeContext_unstable(ctx => ctx.appearance);
  const contextSize = useTreeContext_unstable(ctx => ctx.size);
  const subtreeRef = useTreeItemContext_unstable(ctx => ctx.subtreeRef);
  const value = useTreeItemContext_unstable(ctx => ctx.value);

  const { appearance = contextAppearance ?? 'subtle', size = contextSize ?? 'medium' } = props;

  const parentLevel = useTreeContext_unstable(ctx => ctx.level);
  const selectionMode = useTreeContext_unstable(ctx => ctx.selectionMode);
  const openItems = useTreeContext_unstable(ctx => ctx.openItems);
  const checkedItems = useTreeContext_unstable(ctx => ctx.checkedItems);
  const requestTreeResponse = useTreeContext_unstable(ctx => ctx.requestTreeResponse);

  const open = openItems.has(value);

  return {
    open,
    components: {
      root: 'div',
    },
    appearance,
    size,
    selectionMode,
    level: parentLevel + 1,
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, subtreeRef),
      role: 'group',
      ...props,
    }),
    openItems,
    checkedItems,
    requestTreeResponse,
  };
}
