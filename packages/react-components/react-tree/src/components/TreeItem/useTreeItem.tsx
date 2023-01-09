import * as React from 'react';
import { isResolvedShorthand, resolveShorthand } from '@fluentui/react-utilities';
import { ChevronRightRegular } from '@fluentui/react-icons';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { expandIconInlineStyles } from './useTreeItemStyles';
import { useBaseTreeItem_unstable } from '../BaseTreeItem/index';
import { Enter } from '@fluentui/keyboard-keys';
import { useMergedRefs } from '@fluentui/react-utilities';
import { elementContains } from '@fluentui/react-portal';
import type { TreeItemProps, TreeItemState } from './TreeItem.types';

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
  const { dir, targetDocument } = useFluent_unstable();
  const expandIconRotation = treeItemState.open ? 90 : dir !== 'rtl' ? 0 : 180;
  const groupperProps = useFocusableGroup();

  const actionsRef = React.useRef<HTMLElement>(null);

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    //  if click event originates from actions, ignore it
    if (actionsRef.current && elementContains(actionsRef.current, event.target as Node)) {
      return;
    }
    treeItemState.root.onClick?.(event);
  });

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === Enter) {
      // if Enter keydown event comes from actions, ignore it
      if (actionsRef.current && elementContains(actionsRef.current, event.target as Node)) {
        return;
      }
    }
    treeItemState.root.onKeyDown?.(event);
  });

  const [keepActionsOpen, setKeepActionsOpen] = React.useState(false);

  // Listens to focusout event on the document to ensure treeitem actions visibility on portal scenarios
  // TODO: find a better way to ensure this behavior
  React.useEffect(() => {
    if (actionsRef.current) {
      const handleFocusOut = (event: FocusEvent) => {
        setKeepActionsOpen(elementContains(actionsRef.current, event.relatedTarget as Node));
      };
      targetDocument?.addEventListener('focusout', handleFocusOut, { passive: true });
      return () => {
        targetDocument?.removeEventListener('focusout', handleFocusOut);
      };
    }
  }, [targetDocument]);

  return {
    ...treeItemState,
    keepActionsOpen,
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
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    },
    groupper: resolveShorthand(groupper, {
      required: true,
      defaultProps: {
        role: 'presentation',
        ...groupperProps,
      },
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
    actions: resolveShorthand(actions, {
      defaultProps: {
        ref: useMergedRefs(isResolvedShorthand(actions) ? actions.ref : undefined, actionsRef),
      },
    }),
  };
};
