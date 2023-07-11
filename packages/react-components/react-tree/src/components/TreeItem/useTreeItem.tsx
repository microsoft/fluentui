import * as React from 'react';
import {
  getNativeElementProps,
  isResolvedShorthand,
  resolveShorthand,
  useControllableState,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useEventCallback } from '@fluentui/react-utilities';
import { elementContains } from '@fluentui/react-portal';
import type { TreeItemProps, TreeItemSlots, TreeItemState } from './TreeItem.types';
import { useTreeContext_unstable } from '../../contexts/index';
import { treeDataTypes } from '../../utils/tokens';
import { dataTreeItemValueAttrName } from '../../utils/getTreeItemValueFromElement';
import { TreeItemChevron } from '../TreeItemChevron';

/**
 * Create the state required to render TreeItem.
 *
 * The returned state can be modified with hooks such as useTreeItemStyles_unstable,
 * before being passed to renderTreeItem_unstable.
 *
 * @param props - props from this instance of TreeItem
 * @param ref - reference to root HTMLElement of TreeItem
 */
export function useTreeItem_unstable(props: TreeItemProps, ref: React.Ref<HTMLDivElement>): TreeItemState {
  const contextLevel = useTreeContext_unstable(ctx => ctx.level);

  const value = useId('fuiTreeItemValue-', props.value?.toString());

  const {
    onClick,
    onKeyDown,
    as = 'div',
    itemType = 'leaf',
    'aria-level': level = contextLevel,
    expandIcon,
    aside,
    ...rest
  } = props;

  const requestTreeResponse = useTreeContext_unstable(ctx => ctx.requestTreeResponse);

  const [isActionsVisibleExternal, actions]: [boolean | undefined, TreeItemSlots['actions']] = isResolvedShorthand(
    props.actions,
  )
    ? // .visible prop should not be propagated to the DOM
      [props.actions.visible, { ...props.actions, visible: undefined }]
    : [undefined, props.actions];

  const [isActionsVisible, setActionsVisible] = useControllableState({
    state: isActionsVisibleExternal,
    defaultState: false,
    initialState: false,
  });
  const [isAsideVisible, setAsideVisible] = React.useState(true);

  const handleActionsRef = (actionsElement: HTMLDivElement | null) => {
    setAsideVisible(actionsElement === null);
  };

  const open = useTreeContext_unstable(ctx => ctx.openItems.has(value));

  const actionsRef = React.useRef<HTMLDivElement>(null);
  const expandIconRef = React.useRef<HTMLDivElement>(null);
  const layoutRef = React.useRef<HTMLDivElement>(null);
  const subtreeRef = React.useRef<HTMLDivElement>(null);

  const actionsRefs = useMergedRefs(
    isResolvedShorthand(actions) ? actions.ref : undefined,
    handleActionsRef,
    actionsRef,
  );
  const expandIconRefs = useMergedRefs(isResolvedShorthand(expandIcon) ? expandIcon.ref : undefined, expandIconRef);

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
      value,
      itemType,
      target: event.currentTarget,
      type: isFromExpandIcon ? treeDataTypes.ExpandIconClick : treeDataTypes.Click,
    });
  });

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    // Ignore keyboard events that do not originate from the current tree item.
    if (event.isDefaultPrevented() || event.currentTarget !== event.target) {
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
        return requestTreeResponse({ event, target: event.currentTarget, value, itemType, type: event.key });
    }
    const isTypeAheadCharacter =
      event.key.length === 1 && event.key.match(/\w/) && !event.altKey && !event.ctrlKey && !event.metaKey;
    if (isTypeAheadCharacter) {
      requestTreeResponse({ event, target: event.currentTarget, value, itemType, type: treeDataTypes.TypeAhead });
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

  const isBranch = itemType === 'branch';

  const actionsSlot = React.useMemo(
    () => (isActionsVisible ? resolveShorthand(actions) : undefined),
    [actions, isActionsVisible],
  );
  if (actionsSlot) {
    actionsSlot.ref = actionsRefs;
  }
  const asideSlot = React.useMemo(
    () => (isAsideVisible ? resolveShorthand(aside) : undefined),
    [aside, isAsideVisible],
  );
  const expandIconSlot = React.useMemo(
    () =>
      resolveShorthand(expandIcon, {
        required: isBranch,
        defaultProps: {
          children: <TreeItemChevron />,
          'aria-hidden': true,
        },
      }),
    [expandIcon, isBranch],
  );
  if (expandIconSlot) {
    expandIconSlot.ref = expandIconRefs;
  }

  return {
    value,
    open,
    subtreeRef,
    layoutRef,
    itemType,
    level,
    components: {
      root: 'div',
    },
    root: getNativeElementProps(as, {
      tabIndex: -1,
      ...rest,
      ref,
      role: 'treeitem',
      'aria-level': level,
      [dataTreeItemValueAttrName]: value,
      'aria-expanded': isBranch ? open : undefined,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onMouseOver: handleActionsVisible,
      onFocus: handleActionsVisible,
      onMouseOut: handleActionsInvisible,
      onBlur: handleActionsInvisible,
    }),
    actions: actionsSlot,
    aside: asideSlot,
    expandIcon: expandIconSlot,
  };
}
