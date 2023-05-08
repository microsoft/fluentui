import * as React from 'react';
import { getNativeElementProps, isResolvedShorthand, resolveShorthand, useId } from '@fluentui/react-utilities';
import { ChevronRight12Regular } from '@fluentui/react-icons';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';
import { expandIconInlineStyles } from './useTreeItemStyles.styles';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Enter, Home } from '@fluentui/keyboard-keys';
import { useMergedRefs } from '@fluentui/react-utilities';
import { elementContains } from '@fluentui/react-portal';
import type { TreeItemProps, TreeItemState } from './TreeItem.types';
import { useTreeContext_unstable } from '../../contexts/index';
import { treeDataTypes } from '../../utils/tokens';

/**
 * Create the state required to render TreeItem.
 *
 * The returned state can be modified with hooks such as useTreeItemStyles_unstable,
 * before being passed to renderTreeItem_unstable.
 *
 * @param props - props from this instance of TreeItem
 * @param ref - reference to root HTMLElement of TreeItem
 */
export function useTreeItem_unstable<Value = string>(
  props: TreeItemProps<Value>,
  ref: React.Ref<HTMLDivElement>,
): TreeItemState {
  const [children, subtreeChildren] = React.Children.toArray(props.children);

  const contextLevel = useTreeContext_unstable(ctx => ctx.level);

  const id = useId('fui-TreeItem-', props.id);

  const {
    content,
    subtree,
    expandIcon,
    leaf: isLeaf = subtreeChildren === undefined,
    actions,
    as = 'div',
    onClick,
    onKeyDown,
    ['aria-level']: level = contextLevel,
    value = id,
    ...rest
  } = props;

  const requestOpenChange = useTreeContext_unstable(ctx => ctx.requestOpenChange);
  const requestNavigation = useTreeContext_unstable(ctx => ctx.requestNavigation);

  const isBranch = !isLeaf;

  const open = useTreeContext_unstable(ctx => isBranch && ctx.openItems.has(value));
  const { dir, targetDocument } = useFluent_unstable();
  const expandIconRotation = open ? 90 : dir !== 'rtl' ? 0 : 180;

  const actionsRef = React.useRef<HTMLElement>(null);
  const expandIconRef = React.useRef<HTMLElement>(null);
  const subtreeRef = React.useRef<HTMLElement>(null);

  const handleArrowRight = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open && isBranch) {
      return requestOpenChange({
        event,
        value,
        open: true,
        type: treeDataTypes.arrowRight,
        target: event.currentTarget,
      });
    }
    if (open && isBranch) {
      return requestNavigation({ event, value, type: treeDataTypes.arrowRight, target: event.currentTarget });
    }
  };
  const handleArrowLeft = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (open && isBranch) {
      return requestOpenChange({
        event,
        value,
        open: false,
        type: treeDataTypes.arrowLeft,
        target: event.currentTarget,
      });
    }
    if (!open && level > 1) {
      return requestNavigation({ event, value, target: event.currentTarget, type: treeDataTypes.arrowLeft });
    }
  };
  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    requestOpenChange({
      event,
      value,
      open: isLeaf ? open : !open,
      type: treeDataTypes.enter,
      target: event.currentTarget,
    });
  };

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);

    const isEventFromActions = actionsRef.current && elementContains(actionsRef.current, event.target as Node);
    if (isEventFromActions) {
      return;
    }
    const isEventFromSubtree = subtreeRef.current && elementContains(subtreeRef.current, event.target as Node);
    if (isEventFromSubtree) {
      return;
    }
    const isFromExpandIcon = expandIconRef.current && elementContains(expandIconRef.current, event.target as Node);
    requestOpenChange({
      event,
      value,
      open: isLeaf ? open : !open,
      type: isFromExpandIcon ? treeDataTypes.expandIconClick : treeDataTypes.click,
      target: event.currentTarget,
    });
    requestNavigation({ event, value, target: event.currentTarget, type: treeDataTypes.click });
  });

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.currentTarget !== event.target) {
      return;
    }
    if (event.isDefaultPrevented()) {
      return;
    }
    switch (event.key) {
      case Enter:
        return handleEnter(event);
      case ArrowRight:
        return handleArrowRight(event);
      case ArrowLeft:
        return handleArrowLeft(event);
      case End:
        return requestNavigation({ event, value, type: treeDataTypes.end, target: event.currentTarget });
      case Home:
        return requestNavigation({ event, value, type: treeDataTypes.home, target: event.currentTarget });
      case ArrowUp:
        return requestNavigation({ event, value, type: treeDataTypes.arrowUp, target: event.currentTarget });
      case ArrowDown:
        return requestNavigation({ event, value, type: treeDataTypes.arrowDown, target: event.currentTarget });
    }
    const isTypeAheadCharacter =
      event.key.length === 1 && event.key.match(/\w/) && !event.altKey && !event.ctrlKey && !event.metaKey;
    if (isTypeAheadCharacter) {
      return requestNavigation({ event, value, target: event.currentTarget, type: treeDataTypes.typeAhead });
    }
  });

  const [isActionsVisible, setActionsVisible] = React.useState(false);
  const showActions = useEventCallback((event: React.SyntheticEvent) => {
    const isEventFromSubtree = subtreeRef.current && elementContains(subtreeRef.current, event.target as Node);
    if (!isEventFromSubtree) {
      setActionsVisible(true);
    }
  });
  const hideActions = useEventCallback((event: React.SyntheticEvent) => {
    const isEventFromSubtree = subtreeRef.current && elementContains(subtreeRef.current, event.target as Node);
    if (!isEventFromSubtree) {
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
    isLeaf,
    open,
    level,
    buttonSize: 'small',
    isActionsVisible: actions ? isActionsVisible : false,
    components: {
      content: 'div',
      root: 'div',
      expandIcon: 'span',
      actions: 'span',
      subtree: 'span',
    },
    subtree: resolveShorthand(subtree, {
      required: Boolean(subtreeChildren),
      defaultProps: {
        children: subtreeChildren,
        ref: useMergedRefs(subtreeRef, isResolvedShorthand(subtree) ? subtree.ref : undefined),
      },
    }),
    content: resolveShorthand(content, {
      required: true,
      defaultProps: {
        children,
      },
    }),
    root: getNativeElementProps(as, {
      tabIndex: -1,
      ...rest,
      id,
      ref,
      children: null,
      'aria-level': level,
      'aria-expanded': isBranch ? open : undefined,
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
        ref: useMergedRefs(isResolvedShorthand(expandIcon) ? expandIcon.ref : undefined, expandIconRef),
      },
    }),
    actions: resolveShorthand(actions, {
      defaultProps: {
        ref: useMergedRefs(isResolvedShorthand(actions) ? actions.ref : undefined, actionsRef),
      },
    }),
  };
}
