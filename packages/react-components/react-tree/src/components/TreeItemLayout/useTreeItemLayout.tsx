import * as React from 'react';
import { getNativeElementProps, isResolvedShorthand, resolveShorthand, useMergedRefs } from '@fluentui/react-utilities';
import type { TreeItemLayoutProps, TreeItemLayoutState } from './TreeItemLayout.types';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';
import { TreeItemChevron } from '../TreeItemChevron';
import { ButtonContextValue } from '@fluentui/react-button';

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
  const { iconAfter, iconBefore, expandIcon, actions, aside, as = 'span' } = props;

  const layoutRef = useTreeItemContext_unstable(ctx => ctx.layoutRef);
  const expandIconRef = useTreeItemContext_unstable(ctx => ctx.expandIconRef);
  const actionsRef = useTreeItemContext_unstable(ctx => ctx.actionsRef);
  const isBranch = useTreeItemContext_unstable(ctx => ctx.itemType === 'branch');

  const isActionsVisible = useTreeItemContext_unstable(ctx => ctx.isActionsVisible);

  return {
    isActionsVisible,
    isAsideVisible: Boolean(!actions || !isActionsVisible),
    components: {
      root: 'div',
      expandIcon: 'div',
      iconBefore: 'div',
      iconAfter: 'div',
      aside: 'div',
      actions: 'div',
    },
    buttonContextValue,
    root: getNativeElementProps(as, { ...props, ref: useMergedRefs(ref, layoutRef) }),
    iconBefore: resolveShorthand(iconBefore, { defaultProps: { 'aria-hidden': true } }),
    iconAfter: resolveShorthand(iconAfter, { defaultProps: { 'aria-hidden': true } }),
    aside: resolveShorthand(aside, { defaultProps: { 'aria-hidden': true } }),
    actions: resolveShorthand(actions, {
      defaultProps: {
        'aria-hidden': true,
        ref: useMergedRefs(isResolvedShorthand(actions) ? actions.ref : undefined, actionsRef),
      },
    }),
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

const buttonContextValue: ButtonContextValue = { size: 'small' };
