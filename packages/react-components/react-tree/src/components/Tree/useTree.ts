import * as React from 'react';
import { TreeProps, TreeState } from './Tree.types';
import { useTreeContext_unstable } from '../../contexts';
import { useSubtree } from './useSubtree';
import { useRootTree } from './useRootTree';

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
  const isSubtree = useTreeContext_unstable(ctx => ctx.level > 0);
  // as isSubtree is static, this doesn't break rule of hooks
  // and if this becomes an issue later on, this can be easily converted
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return isSubtree ? useSubtree(props, ref) : useRootTree(props, ref);
};
