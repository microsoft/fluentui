import * as React from 'react';
import { isResolvedShorthand, resolveShorthand } from '@fluentui/react-utilities';
import type { TreeItemElement, TreeItemProps, TreeItemState } from './TreeItem.types';
import { ChevronRightRegular } from '@fluentui/react-icons';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useBaseTreeItem_unstable } from '../BaseTreeItem/index';
import { useEventCallback } from '@fluentui/react-utilities';

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
  const { expandIcon, iconBefore, iconAfter, actions, badges } = props;
  const { dir } = useFluent_unstable();
  const expandIconRotation = treeItemState.open ? 90 : dir !== 'rtl' ? 0 : 180;

  // prevent default of a click from actions to ensure it doesn't open the treeitem
  const handleActionsClick = useEventCallback((event: React.MouseEvent<HTMLElement>) => {
    if (isResolvedShorthand(actions)) {
      actions.onClick?.(event);
    }
    event.preventDefault();
  });

  return {
    ...treeItemState,
    components: {
      ...treeItemState.components,
      expandIcon: 'span',
      iconBefore: 'span',
      iconAfter: 'span',
      actions: 'span',
      badges: 'span',
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
    badges: resolveShorthand(badges, {
      defaultProps: {
        'aria-hidden': true,
      },
    }),
    actions: resolveShorthand(actions, {
      defaultProps: {
        // FIXME: this should not be aria-hidden as this should be reachable through tab
        //  without aria-hidden tabster navigation is breaking.
        'aria-hidden': true,
        onClick: handleActionsClick,
      },
    }),
  };
};
