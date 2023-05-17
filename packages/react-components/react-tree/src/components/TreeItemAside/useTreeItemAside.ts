import * as React from 'react';
import { getNativeElementProps, useMergedRefs } from '@fluentui/react-utilities';
import type { TreeItemAsideProps, TreeItemAsideState } from './TreeItemAside.types';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';

/**
 * Create the state required to render TreeItemAside.
 *
 * The returned state can be modified with hooks such as useTreeItemAsideStyles_unstable,
 * before being passed to renderTreeItemAside_unstable.
 *
 * @param props - props from this instance of TreeItemAside
 * @param ref - reference to root HTMLElement of TreeItemAside
 */
export const useTreeItemAside_unstable = (
  props: TreeItemAsideProps,
  ref: React.Ref<HTMLElement>,
): TreeItemAsideState => {
  const actionsRef = useTreeItemContext_unstable(ctx => ctx.actionsRef);
  const contextVisible = useTreeItemContext_unstable(ctx =>
    props.actions ? ctx.isActionsVisible : ctx.isAsideVisible,
  );
  const { actions = false, visible = contextVisible } = props;

  return {
    actions,
    visible,
    buttonContextValue: { size: 'small' },
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, actions ? actionsRef : undefined),
      ...props,
    }),
  };
};
