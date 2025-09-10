import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  getIntrinsicElementProps,
  useId,
  useEventCallback,
  slot,
  elementContains,
  useMergedRefs,
  isHTMLElement,
} from '@fluentui/react-utilities';
import type { TreeItemProps, TreeItemState, TreeItemValue } from './TreeItem.types';
import { Space } from '@fluentui/keyboard-keys';
import { treeDataTypes } from '../../utils/tokens';
import {
  useTreeContext_unstable,
  useSubtreeContext_unstable,
  useTreeItemContext_unstable,
  TreeContext,
} from '../../contexts';
import { dataTreeItemValueAttrName } from '../../utils/getTreeItemValueFromElement';
import { useHasParentContext } from '@fluentui/react-context-selector';
import { treeClassNames } from '../../Tree';

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
  'use no memo';

  const treeType = useTreeContext_unstable(ctx => ctx.treeType);
  if (treeType === 'flat') {
    warnIfNoProperPropsFlatTreeItem(props);
  }
  const requestTreeResponse = useTreeContext_unstable(ctx => ctx.requestTreeResponse);
  const navigationMode = useTreeContext_unstable(ctx => ctx.navigationMode ?? 'tree');
  const forceUpdateRovingTabIndex = useTreeContext_unstable(ctx => ctx.forceUpdateRovingTabIndex);
  const { level: contextLevel } = useSubtreeContext_unstable();
  const parentValue = useTreeItemContext_unstable(ctx => props.parentValue ?? ctx.value);

  // note, if the value is not externally provided,
  // then selection and expansion will not work properly
  const internalValue = useId('fuiTreeItemValue-');
  const value: TreeItemValue = props.value ?? internalValue;

  const {
    onClick,
    onKeyDown,
    onChange,
    as = 'div',
    itemType = 'leaf',
    'aria-level': level = contextLevel,
    'aria-selected': ariaSelected,
    'aria-expanded': ariaExpanded,
    ...rest
  } = props;

  const actionsRef = React.useRef<HTMLDivElement>(null);
  const expandIconRef = React.useRef<HTMLDivElement>(null);
  const layoutRef = React.useRef<HTMLDivElement>(null);
  const subtreeRef = React.useRef<HTMLDivElement>(null);
  const selectionRef = React.useRef<HTMLInputElement>(null);
  const treeItemRef = React.useRef<HTMLDivElement>(null);

  if (process.env.NODE_ENV !== 'production') {
    // This is acceptable since the NODE_ENV will not change during runtime

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const hasTreeContext = useHasParentContext(TreeContext);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (hasTreeContext) {
        return;
      }

      if (treeItemRef.current?.querySelector(`.${treeClassNames.root}`)) {
        // eslint-disable-next-line no-console
        console.error(/** #__DE-INDENT__ */ `
          @fluentui/react-tree [useTreeItem]:
          <TreeItem> should be declared inside a <Tree> component.
        `);
      }
    }, [hasTreeContext]);
  }

  React.useEffect(() => {
    // When the tree item is mounted, we might need to update the roving tab index
    // in edge cases where the tree is empty and then populated
    forceUpdateRovingTabIndex?.();
    const treeItem = treeItemRef.current;
    return () => {
      // When the tree item is unmounted, we need to update the roving tab index
      // if the tree item is the current tab indexed item
      if (treeItem && treeItem.tabIndex === 0) {
        forceUpdateRovingTabIndex?.();
      }
    };
  }, [forceUpdateRovingTabIndex]);

  const open = useTreeContext_unstable(ctx => props.open ?? ctx.openItems.has(value));
  const getNextOpen = () => (itemType === 'branch' ? !open : open);
  const selectionMode = useTreeContext_unstable(ctx => ctx.selectionMode);
  const checked = useTreeContext_unstable(ctx => ctx.checkedItems.get(value) ?? false);

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const isEventFromActions = () => actionsRef.current && elementContains(actionsRef.current, event.target as Node);

    const isEventFromSubtree = () => subtreeRef.current && elementContains(subtreeRef.current, event.target as Node);

    const isEventFromSelection = () => selectionRef.current?.contains(event.target as Node);

    const isEventFromExpandIcon = expandIconRef.current?.contains(event.target as Node);

    if (isEventFromActions() || isEventFromSubtree() || isEventFromSelection()) {
      return;
    } else if (!isEventFromExpandIcon) {
      onClick?.(event);
    }
    if (event.isDefaultPrevented()) {
      return;
    }

    ReactDOM.unstable_batchedUpdates(() => {
      const data = {
        event,
        value,
        open: getNextOpen(),
        target: event.currentTarget,
        type: isEventFromExpandIcon ? treeDataTypes.ExpandIconClick : treeDataTypes.Click,
      } as const;
      if (itemType !== 'leaf') {
        props.onOpenChange?.(event, data);
        requestTreeResponse({
          ...data,
          itemType,
          requestType: 'open',
        });
      }
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
    if (event.isDefaultPrevented() || !treeItemRef.current) {
      return;
    }
    const isEventFromTreeItem = event.currentTarget === event.target;
    const isEventFromActions = actionsRef.current && actionsRef.current.contains(event.target as Node);

    switch (event.key) {
      case Space: {
        if (!isEventFromTreeItem) {
          return;
        }
        if (selectionMode !== 'none') {
          selectionRef.current?.click();
          // Prevents the page from scrolling down when the spacebar is pressed
          event.preventDefault();
        }
        return;
      }
      case treeDataTypes.Enter: {
        if (!isEventFromTreeItem) {
          return;
        }
        return event.currentTarget.click();
      }
      case treeDataTypes.End:
      case treeDataTypes.Home:
      case treeDataTypes.ArrowUp: {
        if (!isEventFromTreeItem && !isEventFromActions) {
          return;
        }
        return requestTreeResponse({
          requestType: 'navigate',
          event,
          value,
          itemType,
          parentValue,
          type: event.key,
          target: event.currentTarget,
        });
      }
      case treeDataTypes.ArrowDown: {
        if (!isEventFromTreeItem && !isEventFromActions) {
          return;
        }
        if (isEventFromActions && (!isHTMLElement(event.target) || event.target.hasAttribute('aria-haspopup'))) {
          return;
        }
        return requestTreeResponse({
          requestType: 'navigate',
          event,
          value,
          itemType,
          parentValue,
          type: event.key,
          target: event.currentTarget,
        });
      }
      case treeDataTypes.ArrowLeft: {
        // arrow left with alt key is reserved for history navigation
        if (event.altKey) {
          return;
        }
        const data = {
          value,
          event,
          open: getNextOpen(),
          type: event.key,
          itemType,
          parentValue,
          target: event.currentTarget,
        } as const;

        if (isEventFromActions && navigationMode === 'treegrid') {
          requestTreeResponse({ ...data, requestType: 'navigate' });
          return;
        }
        if (!isEventFromTreeItem) {
          return;
        }
        // do not navigate to parent if the item is on the top level
        if (level === 1 && !open) {
          return;
        }
        if (open) {
          props.onOpenChange?.(event, data);
        }
        requestTreeResponse({ ...data, requestType: open ? 'open' : 'navigate' });
        return;
      }
      case treeDataTypes.ArrowRight: {
        // Ignore keyboard events that do not originate from the current tree item.
        if (!isEventFromTreeItem) {
          return;
        }
        // arrow right with alt key is reserved for history navigation
        if (event.altKey) {
          return;
        }
        const data = {
          value,
          event,
          open: getNextOpen(),
          type: event.key,
          target: event.currentTarget,
        } as const;

        if (itemType === 'branch' && !open) {
          props.onOpenChange?.(event, data);
          requestTreeResponse({ ...data, itemType, requestType: 'open' });
        } else {
          requestTreeResponse({ ...data, itemType, parentValue, requestType: 'navigate' });
        }
        return;
      }
    }
    // Ignore keyboard events that do not originate from the current tree item.
    if (!isEventFromTreeItem) {
      return;
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
    treeItemRef,
    actionsRef,
    itemType,
    level,
    components: {
      root: 'div',
    },
    // FIXME: this property is not necessary anymore, but as removing it would be a breaking change, we need to keep it as false
    isAsideVisible: false,
    // FIXME: this property is not necessary anymore, but as removing it would be a breaking change, we need to keep it as false
    isActionsVisible: false,
    root: slot.always(
      getIntrinsicElementProps(as, {
        tabIndex: -1,
        [dataTreeItemValueAttrName]: value,
        role: 'treeitem',
        ...rest,
        ref: useMergedRefs(ref, treeItemRef),
        'aria-level': level,
        'aria-checked': selectionMode === 'multiselect' ? checked : undefined,
        'aria-selected': ariaSelected !== undefined ? ariaSelected : selectionMode === 'single' ? !!checked : undefined,
        'aria-expanded': ariaExpanded !== undefined ? ariaExpanded : itemType === 'branch' ? open : undefined,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
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
