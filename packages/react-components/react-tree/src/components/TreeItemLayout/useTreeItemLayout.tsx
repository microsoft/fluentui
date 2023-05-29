import * as React from 'react';
import { getNativeElementProps, isResolvedShorthand, slot, useMergedRefs } from '@fluentui/react-utilities';
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
  const { iconAfter, iconBefore, expandIcon, as = 'span' } = props;

  const layoutRef = useTreeItemContext_unstable(ctx => ctx.layoutRef);
  const expandIconRef = useTreeItemContext_unstable(ctx => ctx.expandIconRef);
  const isBranch = useTreeItemContext_unstable(ctx => ctx.itemType === 'branch');

  return {
    components: {
      root: 'div',
      expandIcon: 'div',
      iconBefore: 'div',
      iconAfter: 'div',
    },
    root: slot(getNativeElementProps(as, { ...props, ref: useMergedRefs(ref, layoutRef) }), {
      required: true,
      elementType: 'div',
    }),
    iconBefore: slot(iconBefore, { defaultProps: { 'aria-hidden': true }, elementType: 'div' }),
    iconAfter: slot(iconAfter, { defaultProps: { 'aria-hidden': true }, elementType: 'div' }),
    expandIcon: slot(expandIcon, {
      required: isBranch,
      defaultProps: {
        children: <TreeItemChevron />,
        'aria-hidden': true,
        ref: useMergedRefs(isResolvedShorthand(expandIcon) ? expandIcon.ref : undefined, expandIconRef),
      },
      elementType: 'div',
    }),
  };
};
