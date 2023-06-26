import * as React from 'react';
import { getNativeElementProps, isResolvedShorthand, resolveShorthand, useMergedRefs } from '@fluentui/react-utilities';
import type { TreeItemLayoutProps, TreeItemLayoutState } from './TreeItemLayout.types';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';
import { TreeItemChevron } from '../TreeItemChevron';

/**
 * Create the state required to render TreeItemLayout.
 *
 * The returned state can be modified with hooks such as useTreeItemLayoutStyles_unstable,
 * before being passed to renderTreeItemLayout_unstable.
 *
 * @param props - props from this instance of TreeItemLayout
 * @param ref - reference to root HTMLElement of TreeItemLayout
 */
export const useTreeItemLayout_unstable = (
  props: TreeItemLayoutProps,
  ref: React.Ref<HTMLElement>,
): TreeItemLayoutState => {
  const { iconAfter, iconBefore, as = 'span', expandIcon, aside, actions } = props;

  const layoutRef = useTreeItemContext_unstable(ctx => ctx.layoutRef);
  const expandIconRef = useTreeItemContext_unstable(ctx => ctx.expandIconRef);
  const isActionsVisible = useTreeItemContext_unstable(ctx => ctx.isActionsVisible);
  const isAsideVisible = useTreeItemContext_unstable(ctx => ctx.isAsideVisible);
  const isBranch = useTreeItemContext_unstable(ctx => ctx.itemType === 'branch');
  const actionsRef = useMergedRefs(
    isResolvedShorthand(actions) ? actions.ref : undefined,
    useTreeItemContext_unstable(ctx => ctx.actionsRef),
  );

  return {
    components: {
      root: 'div',
      iconBefore: 'div',
      iconAfter: 'div',
      expandIcon: 'div',
      actions: 'div',
      aside: 'div',
    },
    buttonContextValue: { size: 'small' },
    root: getNativeElementProps(as, { ...props, ref: useMergedRefs(ref, layoutRef) }),
    iconBefore: resolveShorthand(iconBefore, { defaultProps: { 'aria-hidden': true } }),
    iconAfter: resolveShorthand(iconAfter, { defaultProps: { 'aria-hidden': true } }),
    aside: isAsideVisible ? resolveShorthand(aside) : undefined,
    actions: isActionsVisible ? resolveShorthand(actions, { defaultProps: { ref: actionsRef } }) : undefined,
    expandIcon: resolveShorthand(expandIcon, {
      required: isBranch,
      defaultProps: {
        children: <TreeItemChevron />,
        'aria-hidden': true,
        ref: useMergedRefs(isResolvedShorthand(expandIcon) ? expandIcon.ref : undefined, expandIconRef),
      },
    }),
  };
};
