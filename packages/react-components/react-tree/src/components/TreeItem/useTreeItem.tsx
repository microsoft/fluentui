import * as React from 'react';
import { getNativeElementProps, isResolvedShorthand, resolveShorthand, useId } from '@fluentui/react-utilities';
import { ChevronRight12Regular } from '@fluentui/react-icons';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { expandIconInlineStyles } from './useTreeItemStyles';
import { ArrowLeft, ArrowRight, Enter } from '@fluentui/keyboard-keys';
import { useMergedRefs } from '@fluentui/react-utilities';
import { elementContains } from '@fluentui/react-portal';
import type { TreeItemProps, TreeItemState } from './TreeItem.types';
import { useTreeContext_unstable } from '../../contexts/index';

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
  const { content, subtree, expandIcon, actions, as = 'div', onClick, onKeyDown, ...rest } = props;
  const level = useTreeContext_unstable(ctx => ctx.level);
  const requestOpenChange = useTreeContext_unstable(ctx => ctx.requestOpenChange);
  const focusFirstSubtreeItem = useTreeContext_unstable(ctx => ctx.focusFirstSubtreeItem);
  const focusSubtreeOwnerItem = useTreeContext_unstable(ctx => ctx.focusSubtreeOwnerItem);

  const [children, subtreeChildren] = React.Children.toArray(props.children);

  const isBranch = subtreeChildren !== undefined;
  const id = useId('fui-TreeItem-', props.id);

  const open = useTreeContext_unstable(ctx => isBranch && ctx.openItems.includes(id));
  const { dir, targetDocument } = useFluent_unstable();
  const expandIconRotation = open ? 90 : dir !== 'rtl' ? 0 : 180;
  const groupperProps = useFocusableGroup();

  const actionsRef = React.useRef<HTMLElement>(null);
  const subtreeRef = React.useRef<HTMLElement>(null);

  const handleArrowRight = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (open && isBranch) {
      focusFirstSubtreeItem(event.currentTarget);
    }
    if (isBranch && !open) {
      requestOpenChange({ event, open: true, type: 'arrowRight' });
    }
  };
  const handleArrowLeft = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isBranch || !open) {
      focusSubtreeOwnerItem(event.currentTarget);
    }
    if (isBranch && open) {
      requestOpenChange({ event, open: false, type: 'arrowLeft' });
    }
  };
  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // if Enter keydown event comes from actions, ignore it
    if (actionsRef.current && elementContains(actionsRef.current, event.target as Node)) {
      return;
    }
    if (isBranch) {
      requestOpenChange({ event, open: !open, type: 'enter' });
    }
  };

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    //  if click event originates from actions, ignore it
    if (actionsRef.current && elementContains(actionsRef.current, event.target as Node)) {
      return;
    }
    if (isBranch) {
      requestOpenChange({ event, open: !open, type: 'click' });
    }
    event.stopPropagation();
  });

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.isDefaultPrevented()) {
      return;
    }
    switch (event.key) {
      case Enter: {
        return handleEnter(event);
      }
      case ArrowRight: {
        return handleArrowRight(event);
      }
      case ArrowLeft: {
        return handleArrowLeft(event);
      }
    }
  });

  const [isActionsVisible, setActionsVisible] = React.useState(false);
  const showActions = useEventCallback((event: React.SyntheticEvent) => {
    const isInternalEvent = subtreeRef.current?.contains(event.target as Node) ?? false;
    if (!isInternalEvent) {
      setActionsVisible(true);
    }
  });
  const hideActions = useEventCallback((event: React.SyntheticEvent) => {
    const isInternalEvent = subtreeRef.current?.contains(event.target as Node) ?? false;
    if (!isInternalEvent) {
      setActionsVisible(false);
    }
  });

  // Listens to focusout event on the document to ensure treeitem actions visibility on portal scenarios
  // TODO: find a better way to ensure this behavior
  React.useEffect(() => {
    if (actionsRef.current) {
      const handleFocusOut = (event: FocusEvent) => {
        setActionsVisible(elementContains(actionsRef.current, event.relatedTarget as Node));
      };
      targetDocument?.addEventListener('focusout', handleFocusOut, { passive: true });
      return () => {
        targetDocument?.removeEventListener('focusout', handleFocusOut);
      };
    }
  }, [targetDocument]);

  return {
    isLeaf: !isBranch,
    open,
    buttonSize: 'small',
    isActionsVisible: actions ? isActionsVisible : false,
    components: {
      content: 'span',
      root: 'div',
      expandIcon: 'span',
      actions: 'span',
      subtree: 'span',
    },
    subtree: resolveShorthand(subtree, {
      required: Boolean(subtreeChildren && open),
      defaultProps: {
        children: subtreeChildren,
        ref: useMergedRefs(subtreeRef, isResolvedShorthand(subtree) ? subtree.ref : undefined),
      },
    }),
    content: resolveShorthand(content, {
      required: true,
      defaultProps: {
        children,
        ...groupperProps,
      },
    }),
    root: getNativeElementProps(as, {
      ...rest,
      id,
      ref,
      tabIndex: 0,
      children: null,
      'aria-level': level,
      // FIXME: tabster fails to navigate when aria-expanded is true
      // 'aria-expanded': isBranch ? isOpen : undefined,
      role: 'treeitem',
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onMouseOver: actions ? showActions : undefined,
      onFocus: actions ? showActions : undefined,
      onMouseOut: actions ? hideActions : undefined,
      onBlur: actions ? hideActions : undefined,
    }),
    expandIcon: resolveShorthand(expandIcon, {
      required: isBranch,
      defaultProps: {
        children: <ChevronRight12Regular style={expandIconInlineStyles[expandIconRotation]} />,
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
