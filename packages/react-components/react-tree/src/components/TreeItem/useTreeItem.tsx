import * as React from 'react';
import { ExtractSlotProps, isResolvedShorthand, resolveShorthand, Slot } from '@fluentui/react-utilities';
import { ChevronRightRegular } from '@fluentui/react-icons';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { expandIconInlineStyles } from './useTreeItemStyles';
import type { TreeItemProps, TreeItemState } from './TreeItem.types';
import { useBaseTreeItem_unstable } from '../BaseTreeItem/index';
import { Enter } from '@fluentui/keyboard-keys';
import { useMergedRefs } from '@fluentui/react-utilities';

/**
 * Create the state required to render TreeItem.
 *
 * The returned state can be modified with hooks such as useTreeItemStyles_unstable,
 * before being passed to renderTreeItem_unstable.
 *
 * @param props - props from this instance of TreeItem
 * @param ref - reference to root HTMLElement of TreeItem
 */
export const useTreeItem_unstable = (props: TreeItemProps, ref: React.Ref<HTMLDivElement>): TreeItemState => {
  const treeItemState = useBaseTreeItem_unstable(props, ref);
  const { expandIcon, iconBefore, iconAfter, actions, badges, groupper } = props;
  const { dir } = useFluent_unstable();
  const expandIconRotation = treeItemState.open ? 90 : dir !== 'rtl' ? 0 : 180;
  const groupperProps = useFocusableGroup();

  const actionsRef = React.useRef<HTMLElement>(null);

  return {
    ...treeItemState,
    components: {
      ...treeItemState.components,
      expandIcon: 'span',
      iconBefore: 'span',
      iconAfter: 'span',
      actions: 'span',
      badges: 'span',
      groupper: 'span',
    },
    root: {
      ...treeItemState.root,
      onClick: useEventCallback(event => {
        //  if click event originates from actions, ignore it
        if (actionsRef.current && actionsRef.current?.contains(event.target as Node)) {
          return;
        }
        // if click event comes from a portal, e.g: MenuItem click, ignore it
        if (!event.currentTarget.contains(event.target as Node)) {
          return;
        }
        treeItemState.root.onClick?.(event);
      }),
      onKeyDown: useEventCallback(event => {
        if (event.key === Enter) {
          // if Enter keydown event comes from actions, ignore it
          if (actionsRef.current && actionsRef.current.contains(event.target as Node)) {
            return;
          }
        }
        treeItemState.root.onKeyDown?.(event);
      }),
    },
    groupper: resolveShorthand(groupper, {
      required: true,
      defaultProps: groupperProps as ExtractSlotProps<Slot<'span'>>,
    }),
    iconBefore: resolveShorthand(iconBefore, {
      defaultProps: { 'aria-hidden': true },
    }),
    iconAfter: resolveShorthand(iconAfter, {
      defaultProps: { 'aria-hidden': true },
    }),
    expandIcon: resolveShorthand(expandIcon, {
      required: !treeItemState.isLeaf,
      defaultProps: {
        children: <ChevronRightRegular style={expandIconInlineStyles[expandIconRotation]} />,
        'aria-hidden': true,
      },
    }),
    badges: resolveShorthand(badges, {
      defaultProps: {
        'aria-hidden': true,
      },
    }),
    // FIXME: Menu only works if it's inline since actions is not available to properly position anchor.
    actions: resolveShorthand(actions, {
      defaultProps: {
        ref: useMergedRefs(isResolvedShorthand(actions) ? actions.ref : undefined, actionsRef),
      },
    }),
  };
};
