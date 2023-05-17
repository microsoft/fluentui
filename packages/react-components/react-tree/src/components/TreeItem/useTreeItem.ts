import * as React from 'react';
import { getNativeElementProps, useId, useMergedRefs } from '@fluentui/react-utilities';
import { useEventCallback } from '@fluentui/react-utilities';
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
  const contextLevel = useTreeContext_unstable(ctx => ctx.level);

  const id = useId('fui-TreeItem-', props.id);

  const {
    onClick,
    onKeyDown,
    as = 'div',
    value = id,
    itemType = 'leaf',
    'aria-level': level = contextLevel,
    ...rest
  } = props;

  const requestTreeResponse = useTreeContext_unstable(ctx => ctx.requestTreeResponse);

  const [isActionsVisible, setActionsVisible] = React.useState(false);
  const [isAsideVisible, setAsideVisible] = React.useState(true);

  const handleActionsRef = (actions: HTMLDivElement | null) => {
    setAsideVisible(actions === null);
  };

  const open = useTreeContext_unstable(ctx => ctx.openItems.has(value));

  const actionsRef = React.useRef<HTMLDivElement>(null);
  const expandIconRef = React.useRef<HTMLDivElement>(null);
  const layoutRef = React.useRef<HTMLDivElement>(null);
  const subtreeRef = React.useRef<HTMLDivElement>(null);

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (event.isDefaultPrevented()) {
      return;
    }
    const isEventFromActions = actionsRef.current && elementContains(actionsRef.current, event.target as Node);
    if (isEventFromActions) {
      return;
    }
    const isEventFromSubtree = subtreeRef.current && elementContains(subtreeRef.current, event.target as Node);
    if (isEventFromSubtree) {
      return;
    }
    const isFromExpandIcon = expandIconRef.current && elementContains(expandIconRef.current, event.target as Node);
    requestTreeResponse({
      event,
      itemType,
      value,
      type: isFromExpandIcon ? treeDataTypes.ExpandIconClick : treeDataTypes.Click,
    });
  });

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.isDefaultPrevented()) {
      return;
    }
    if (event.currentTarget !== event.target) {
      return;
    }
    switch (event.key) {
      case treeDataTypes.End:
      case treeDataTypes.Home:
      case treeDataTypes.Enter:
      case treeDataTypes.ArrowUp:
      case treeDataTypes.ArrowDown:
      case treeDataTypes.ArrowLeft:
      case treeDataTypes.ArrowRight:
        return requestTreeResponse({ event, itemType, value, type: event.key });
    }
    const isTypeAheadCharacter =
      event.key.length === 1 && event.key.match(/\w/) && !event.altKey && !event.ctrlKey && !event.metaKey;
    if (isTypeAheadCharacter) {
      requestTreeResponse({ event, itemType, value, type: treeDataTypes.TypeAhead });
    }
  });

  const handleActionsVisible = useEventCallback((event: React.FocusEvent | React.MouseEvent) => {
    const isTargetFromSubtree = Boolean(
      subtreeRef.current && elementContains(subtreeRef.current, event.target as Node),
    );
    if (!isTargetFromSubtree) {
      setActionsVisible(true);
    }
  });

  const handleActionsInvisible = useEventCallback((event: React.FocusEvent | React.MouseEvent) => {
    const isTargetFromSubtree = Boolean(
      subtreeRef.current && elementContains(subtreeRef.current, event.target as Node),
    );
    const isRelatedTargetFromActions = Boolean(
      actionsRef.current && elementContains(actionsRef.current, event.relatedTarget as Node),
    );
    if (isRelatedTargetFromActions) {
      return setActionsVisible(true);
    }
    if (!isTargetFromSubtree) {
      return setActionsVisible(false);
    }
  });

  return {
    value,
    open,
    subtreeRef,
    actionsRef: useMergedRefs(actionsRef, handleActionsRef),
    expandIconRef,
    layoutRef,
    itemType,
    isActionsVisible,
    isAsideVisible,
    level,
    components: {
      root: 'div',
    },
    root: getNativeElementProps(as, {
      tabIndex: -1,
      ...rest,
      id,
      ref,
      'aria-level': level,
      'aria-expanded': itemType === 'branch' ? open : undefined,
      role: 'treeitem',
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onMouseOver: handleActionsVisible,
      onFocus: handleActionsVisible,
      onMouseOut: handleActionsInvisible,
      onBlur: handleActionsInvisible,
    }),
  };
}
