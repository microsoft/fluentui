import * as React from 'react';
import { getNativeElementProps, isResolvedShorthand, resolveShorthand } from '@fluentui/react-utilities';
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
  const { 'aria-owns': ariaOwns, as = 'div', onClick, onKeyDown, ...rest } = props;
  const level = useTreeContext_unstable(ctx => ctx.level);
  const requestOpenChange = useTreeContext_unstable(ctx => ctx.requestOpenChange);
  const focusFirstSubtreeItem = useTreeContext_unstable(ctx => ctx.focusFirstSubtreeItem);
  const focusSubtreeOwnerItem = useTreeContext_unstable(ctx => ctx.focusSubtreeOwnerItem);

  const isBranch = typeof ariaOwns === 'string';
  const { expandIcon, actions, groupper } = props;
  const open = useTreeContext_unstable(ctx => isBranch && ctx.openSubtrees.includes(ariaOwns!));
  const { dir, targetDocument } = useFluent_unstable();
  const expandIconRotation = open ? 90 : dir !== 'rtl' ? 0 : 180;
  const groupperProps = useFocusableGroup();

  const actionsRef = React.useRef<HTMLElement>(null);

  const handleArrowRight = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (open && isBranch) {
      focusFirstSubtreeItem(event.currentTarget);
    }
    if (isBranch && !open) {
      requestOpenChange({ event, open: true, type: 'arrowRight', id: ariaOwns! });
    }
  };
  const handleArrowLeft = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isBranch || !open) {
      focusSubtreeOwnerItem(event.currentTarget);
    }
    if (isBranch && open) {
      requestOpenChange({ event, open: false, type: 'arrowLeft', id: ariaOwns! });
    }
  };
  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // if Enter keydown event comes from actions, ignore it
    if (actionsRef.current && elementContains(actionsRef.current, event.target as Node)) {
      return;
    }
    if (isBranch) {
      requestOpenChange({ event, open: !open, type: 'enter', id: ariaOwns! });
    }
  };

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    //  if click event originates from actions, ignore it
    if (actionsRef.current && elementContains(actionsRef.current, event.target as Node)) {
      return;
    }
    if (isBranch) {
      requestOpenChange({ event, open: !open, type: 'click', id: ariaOwns! });
    }
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
  const showActions = useEventCallback(() => {
    setActionsVisible(true);
  });
  const hideActions = useEventCallback(() => {
    setActionsVisible(false);
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
    isActionsVisible: actions ? isActionsVisible : false,
    components: {
      root: 'div',
      expandIcon: 'span',
      actions: 'span',
      groupper: 'span',
    },
    root: getNativeElementProps(as, {
      ...rest,
      ref,
      tabIndex: 0,
      'aria-owns': ariaOwns,
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
    groupper: resolveShorthand(groupper, {
      required: true,
      defaultProps: {
        role: 'presentation',
        ...groupperProps,
      },
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
