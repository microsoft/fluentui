import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getIntrinsicElementProps, useId, useMergedRefs, useEventCallback, slot } from '@fluentui/react-utilities';
import { elementContains } from '@fluentui/react-portal';
import type { TreeItemProps, TreeItemState } from './TreeItem.types';
import { Space } from '@fluentui/keyboard-keys';
import { treeDataTypes } from '../../utils/tokens';
import { useTreeContext_unstable, useSubtreeContext_unstable, useTreeItemContext_unstable } from '../../contexts';
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
  const treeType = useTreeContext_unstable(ctx => ctx.treeType);
  if (treeType === 'flat') {
    warnIfNoProperPropsFlatTreeItem(props);
  }
  const requestTreeResponse = useTreeContext_unstable(ctx => ctx.requestTreeResponse);
  const { level: contextLevel } = useSubtreeContext_unstable();
  const parentValue = useTreeItemContext_unstable(ctx => props.parentValue ?? ctx.value);

  // note, if the value is not externally provided,
  // then selection and expansion will not work properly
  const value = useId('fuiTreeItemValue-', props.value?.toString());

  const {
    onClick,
    onKeyDown,
    onMouseOver,
    onFocus,
    onMouseOut,
    onBlur,
    onChange,
    as = 'div',
    itemType = 'leaf',
    'aria-level': level = contextLevel,
    ...rest
  } = props;

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
        requestType: 'open',
      });
      requestTreeResponse({
        ...data,
        itemType,
        parentValue,
        requestType: 'navigate',
        type: treeDataTypes.Click,
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
          // Prevents the page from scrolling down when the spacebar is pressed
          event.preventDefault();
        }
        return;
      case treeDataTypes.Enter: {
        return event.currentTarget.click();
      }
      case treeDataTypes.End:
      case treeDataTypes.Home:
      case treeDataTypes.ArrowUp:
      case treeDataTypes.ArrowDown:
        return requestTreeResponse({
          requestType: 'navigate',
          event,
          value,
          itemType,
          parentValue,
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
          parentValue,
          requestType: open ? 'open' : 'navigate',
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
          parentValue,
          requestType: open ? 'navigate' : 'open',
        });
    }
    const isTypeAheadCharacter =
      event.key.length === 1 && event.key.match(/\w/) && !event.altKey && !event.ctrlKey && !event.metaKey;
    if (isTypeAheadCharacter) {
      requestTreeResponse({
        requestType: 'navigate',
        event,
        target: event.currentTarget,
        value,
        itemType,
        type: treeDataTypes.TypeAhead,
        parentValue,
      });
    }
  });

  const setActionsVisibleIfNotFromSubtree = React.useCallback((event: React.SyntheticEvent<HTMLDivElement>) => {
    const isTargetFromSubtree = Boolean(
      subtreeRef.current && elementContains(subtreeRef.current, event.target as Node),
    );
    if (!isTargetFromSubtree) {
      setActionsVisible(true);
    }
  }, []);
  const setActionsInvisibleIfNotFromSubtree = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>) => {
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
    },
    [],
  );

  const handleMouseOver = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onMouseOver?.(event);
    setActionsVisibleIfNotFromSubtree(event);
  });

  const handleFocus = useEventCallback((event: React.FocusEvent<HTMLDivElement>) => {
    onFocus?.(event);
    setActionsVisibleIfNotFromSubtree(event);
  });

  const handleMouseOut = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onMouseOut?.(event);
    setActionsInvisibleIfNotFromSubtree(event);
  });
  const handleBlur = useEventCallback((event: React.FocusEvent<HTMLDivElement>) => {
    onBlur?.(event);
    setActionsInvisibleIfNotFromSubtree(event);
  });

  const handleChange = useEventCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    if (event.isDefaultPrevented()) {
      return;
    }
    const isEventFromSubtree = subtreeRef.current && elementContains(subtreeRef.current, event.target as Node);
    if (isEventFromSubtree) {
      return;
    }
    requestTreeResponse({
      requestType: 'selection',
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
      getIntrinsicElementProps(as, {
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
        onMouseOver: handleMouseOver,
        onFocus: handleFocus,
        onMouseOut: handleMouseOut,
        onBlur: handleBlur,
        onChange: handleChange,
      } as const),
      { elementType: 'div' },
    ),
  };
}

function warnIfNoProperPropsFlatTreeItem(
  props: Pick<TreeItemProps, 'aria-setsize' | 'aria-posinset' | 'aria-level' | 'parentValue'>,
) {
  if (process.env.NODE_ENV !== 'production') {
    if (
      props['aria-posinset'] === undefined ||
      props['aria-setsize'] === undefined ||
      props['aria-level'] === undefined ||
      (props.parentValue === undefined && props['aria-level'] !== 1)
    ) {
      // eslint-disable-next-line no-console
      console.error(/** #__DE-INDENT__ */ `
        @fluentui/react-tree [${useTreeItem_unstable.name}]:
        A flat treeitem must have "aria-posinset", "aria-setsize", "aria-level"
        and "parentValue" (if "aria-level" > 1) to ensure a11y and navigation.

        - "aria-posinset": the position of this treeitem in the current level of the tree.
        - "aria-setsize": the number of siblings in this level of the tree.
        - "aria-level": the current level of the treeitem.
        - "parentValue": the "value" property of the parent item of this item.
      `);
    }
  }
}
