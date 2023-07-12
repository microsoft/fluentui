import * as React from 'react';
import { getNativeElementProps, useMergedRefs } from '@fluentui/react-utilities';
import { TreeProps, TreeState } from './Tree.types';
import { useTreeContext_unstable, useTreeItemContext_unstable } from '../../contexts';

/**
 * Create the state required to render a sub-level Tree.
 *
 * @param props - props from this instance of Tree
 * @param ref - reference to root HTMLElement of Tree
 */
export function useSubtree(props: TreeProps, ref: React.Ref<HTMLElement>): TreeState {
  const contextAppearance = useTreeContext_unstable(ctx => ctx.appearance);
  const contextSize = useTreeContext_unstable(ctx => ctx.size);
  const subtreeRef = useTreeItemContext_unstable(ctx => ctx.subtreeRef);
  const value = useTreeItemContext_unstable(ctx => ctx.value);

  const { appearance = contextAppearance ?? 'subtle', size = contextSize ?? 'medium' } = props;

  const parentLevel = useTreeContext_unstable(ctx => ctx.level);
  const openItems = useTreeContext_unstable(ctx => ctx.openItems);
  const requestTreeResponse = useTreeContext_unstable(ctx => ctx.requestTreeResponse);

  const open = openItems.has(value);

  return {
    open,
    components: {
      root: 'div',
    },
    appearance,
    size,
    level: parentLevel + 1,
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, subtreeRef),
      role: 'group',
      ...props,
    }),
    openItems,
    requestTreeResponse,
  };
}
