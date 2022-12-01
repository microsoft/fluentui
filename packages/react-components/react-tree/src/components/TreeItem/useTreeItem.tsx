import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import type { TreeItemElement, TreeItemProps, TreeItemState } from './TreeItem.types';
import { ChevronRightRegular } from '@fluentui/react-icons';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useBaseTreeItem_unstable } from '../BaseTreeItem/index';

/**
 * Create the state required to render TreeItem.
 *
 * The returned state can be modified with hooks such as useTreeItemStyles_unstable,
 * before being passed to renderTreeItem_unstable.
 *
 * @param props - props from this instance of TreeItem
 * @param ref - reference to root HTMLElement of TreeItem
 */
export const useTreeItem_unstable = (props: TreeItemProps, ref: React.Ref<TreeItemElement>): TreeItemState => {
  const treeItemState = useBaseTreeItem_unstable(props, ref);
  const { expandIcon, iconBefore, iconAfter, actionIcon } = props;
  const { dir } = useFluent_unstable();
  const expandIconRotation = treeItemState.open ? 90 : dir !== 'rtl' ? 0 : 180;
  return {
    ...treeItemState,
    components: {
      ...treeItemState.components,
      expandIcon: 'span',
      iconBefore: 'span',
      iconAfter: 'span',
      actionIcon: 'span',
    },
    iconBefore: resolveShorthand(iconBefore, {
      defaultProps: { 'aria-hidden': true },
    }),
    iconAfter: resolveShorthand(iconAfter, {
      defaultProps: { 'aria-hidden': true },
    }),
    expandIcon: resolveShorthand(expandIcon, {
      required: !treeItemState.isLeaf,
      defaultProps: {
        children: <ChevronRightRegular style={{ transform: `rotate(${expandIconRotation}deg)` }} />,
        'aria-hidden': true,
      },
    }),
    actionIcon: resolveShorthand(actionIcon, {
      defaultProps: { 'aria-hidden': true },
    }),
  };
};
