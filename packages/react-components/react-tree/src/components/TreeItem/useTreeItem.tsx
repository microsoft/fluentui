import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getNativeElementProps, useId, useMergedRefs, useEventCallback, slot } from '@fluentui/react-utilities';
import { elementContains } from '@fluentui/react-portal';
import type { TreeItemProps, TreeItemState } from './TreeItem.types';
import { Space } from '@fluentui/keyboard-keys';
import { treeDataTypes } from '../../utils/tokens';
import { useTreeContext_unstable } from '../../contexts/index';
import { dataTreeItemValueAttrName } from '../../utils/getTreeItemValueFromElement';

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
  const requestTreeResponse = useTreeContext_unstable(ctx => ctx.requestTreeResponse);
  const contextLevel = useTreeContext_unstable(ctx => ctx.level);

  // note, if the value is not externally provided,
  // then selection and expansion will not work properly
  const value = useId('fuiTreeItemValue-', props.value?.toString());

  const { onClick, onKeyDown, as = 'div', itemType = 'leaf', 'aria-level': level = contextLevel, ...rest } = props;

  const [isActionsVisible, setActionsVisible] = React.useState(false);
  const [isAsideVisible, setAsideVisible] = React.useState(true);

  const handleActionsRef = React.useCallback((actionsElement: HTMLDivElement | null) => {
    setAsideVisible(actionsElement === null);
  }, []);

  const actionsRef = React.useRef<HTMLDivElement>(null);
  const expandIconRef = React.useRef<HTMLDivElement>(null);
  const layoutRef = React.useRef<HTMLDivElement>(null);
  const subtreeRef = React.useRef<HTMLDivElement>(null);
  const selectionRef = React.useRef<HTMLInputElement>(null);

  const open = useTreeContext_unstable(ctx => props.open ?? ctx.openItems.has(value));
  const selectionMode = useTreeContext_unstable(ctx => ctx.selectionMode);
  const checked = useTreeContext_unstable(ctx => ctx.checkedItems.get(value) ?? false);

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
    const isEventFromSelection = selectionRef.current && elementContains(selectionRef.current, event.target as Node);
    if (isEventFromSelection) {
      return;
    }
    const isEventFromExpandIcon = expandIconRef.current && elementContains(expandIconRef.current, event.target as Node);

    ReactDOM.unstable_batchedUpdates(() => {
      const data = {
        event,
        value,
        open: !open,
        target: event.currentTarget,
        type: isEventFromExpandIcon ? treeDataTypes.ExpandIconClick : treeDataTypes.Click,
      } as const;
      props.onOpenChange?.(event, data);
      requestTreeResponse({
        ...data,
        itemType,
      });
    });
  });

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    // Ignore keyboard events that do not originate from the current tree item.
    if (event.isDefaultPrevented() || event.currentTarget !== event.target) {
      return;
    }
    switch (event.key) {
      case Space:
        if (selectionMode !== 'none') {
          selectionRef.current?.click();
          event.preventDefault();
        }
        return;
      case treeDataTypes.Enter: {
        const data = {
          value,
          event,
          open: !open,
          type: event.key,
          target: event.currentTarget,
        } as const;
        props.onOpenChange?.(event, data);
        return requestTreeResponse({
          ...data,
          itemType,
        });
      }
      case treeDataTypes.End:
      case treeDataTypes.Home:
      case treeDataTypes.ArrowUp:
      case treeDataTypes.ArrowDown:
        return requestTreeResponse({
          event,
          value,
          itemType,
          type: event.key,
          target: event.currentTarget,
        });
      case treeDataTypes.ArrowLeft: {
        // do not navigate to parent if the item is on the top level
        if (level === 1 && !open) {
          return;
        }
        const data = {
          value,
          event,
          open: !open,
          type: event.key,
          target: event.currentTarget,
        } as const;
        if (open) {
          props.onOpenChange?.(event, data);
        }
        return requestTreeResponse({
          ...data,
          itemType,
        });
      }
      case treeDataTypes.ArrowRight:
        // do not navigate or open if the item is a leaf
        if (itemType === 'leaf') {
          return;
        }
        const data = {
          value,
          event,
          open: !open,
          type: event.key,
          target: event.currentTarget,
        } as const;
        if (!open) {
          props.onOpenChange?.(event, data);
        }
        return requestTreeResponse({
          ...data,
          itemType,
        });
    }
    const isTypeAheadCharacter =
      event.key.length === 1 && event.key.match(/\w/) && !event.altKey && !event.ctrlKey && !event.metaKey;
    if (isTypeAheadCharacter) {
      requestTreeResponse({
        event,
        target: event.currentTarget,
        value,
        itemType,
        type: treeDataTypes.TypeAhead,
      });
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

  const handleChange = useEventCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.isDefaultPrevented()) {
      return;
    }
    const isEventFromSubtree = subtreeRef.current && elementContains(subtreeRef.current, event.target as Node);
    if (isEventFromSubtree) {
      return;
    }
    requestTreeResponse({
      event,
      value,
      itemType,
      type: 'Change',
      target: event.currentTarget,
      checked: checked === 'mixed' ? true : !checked,
    });
  });

  return {
    value,
    open,
    checked,
    subtreeRef,
    layoutRef,
    selectionRef,
    expandIconRef,
    actionsRef: useMergedRefs(handleActionsRef, actionsRef),
    itemType,
    level,
    components: {
      root: 'div',
    },
    isAsideVisible,
    isActionsVisible,
    root: slot.always(
      getNativeElementProps(as, {
        tabIndex: -1,
        [dataTreeItemValueAttrName]: value,
        ...rest,
        ref,
        role: 'treeitem',
        'aria-level': level,
        'aria-checked': selectionMode === 'multiselect' ? checked : undefined,
        // aria-selected is required according to WAI-ARIA spec
        // https://www.w3.org/TR/wai-aria-1.1/#treeitem
        // Casting: when selectionMode is 'single', checked is a boolean
        'aria-selected': selectionMode === 'single' ? (checked as boolean) : 'false',
        'aria-expanded': itemType === 'branch' ? open : undefined,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        onMouseOver: handleActionsVisible,
        onFocus: handleActionsVisible,
        onMouseOut: handleActionsInvisible,
        onBlur: handleActionsInvisible,
        onChange: handleChange,
      }),
      { elementType: 'div' },
    ),
  };
}
