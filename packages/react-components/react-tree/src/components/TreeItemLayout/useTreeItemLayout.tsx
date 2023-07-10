import * as React from 'react';
import {
  ExtractSlotProps,
  getNativeElementProps,
  isResolvedShorthand,
  resolveShorthand,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { TreeItemLayoutProps, TreeItemLayoutSlots, TreeItemLayoutState } from './TreeItemLayout.types';
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
  const { content, iconAfter, iconBefore, expandIcon, as = 'span', aside, actions } = props;

  const layoutRef = useTreeItemContext_unstable(ctx => ctx.layoutRef);
  const expandIconRef = useTreeItemContext_unstable(ctx => ctx.expandIconRef);
  const isActionsVisibleContext = useTreeItemContext_unstable(ctx => ctx.isActionsVisible);
  const isAsideVisible = useTreeItemContext_unstable(ctx => ctx.isAsideVisible);
  const isActionsVisible = (isResolvedShorthand(actions) ? actions.visible : undefined) ?? isActionsVisibleContext;
  const isBranch = useTreeItemContext_unstable(ctx => ctx.itemType === 'branch');
  const actionsRef = useMergedRefs(
    isResolvedShorthand(actions) ? actions.ref : undefined,
    useTreeItemContext_unstable(ctx => ctx.actionsRef),
  );

  return {
    components: {
      root: 'div',
      expandIcon: 'div',
      iconBefore: 'div',
      content: 'div',
      iconAfter: 'div',
      actions: 'div',
      aside: 'div',
    },
    buttonContextValue: { size: 'small' },
    root: getNativeElementProps(as, { ...props, ref: useMergedRefs(ref, layoutRef) }),
    iconBefore: resolveShorthand(iconBefore, { defaultProps: { 'aria-hidden': true } }),
    content: resolveShorthand(content, { required: true }),
    iconAfter: resolveShorthand(iconAfter, { defaultProps: { 'aria-hidden': true } }),
    aside: isAsideVisible ? resolveShorthand(aside) : undefined,
    actions: isActionsVisible
      ? resolveShorthand<ExtractSlotProps<TreeItemLayoutSlots['actions']>>(
          // visible props should not be propagated to the DOM
          isResolvedShorthand(actions) ? { ...actions, visible: undefined } : actions,
          {
            defaultProps: { ref: actionsRef },
          },
        )
      : undefined,
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
