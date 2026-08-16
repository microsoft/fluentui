'use client';

import * as React from 'react';
import {
  GroupperMoveFocusEvent,
  MoverMoveFocusEvent,
  GroupperMoveFocusActions,
  MoverKeys,
  useArrowNavigationGroup,
  useFocusableGroup,
  useMergedTabsterAttributes_unstable,
  type TabsterDOMAttribute,
} from '@fluentui/react-tabster';
import {
  elementContains,
  getIntrinsicElementProps,
  mergeCallbacks,
  slot,
  useEventCallback,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { ListItemBaseProps, ListItemBaseState, ListItemProps, ListItemState } from './ListItem.types';
import { useListSynchronousContext, useListContext_unstable } from '../List/listContext';
import { Enter, Space, ArrowUp, ArrowDown, ArrowRight, ArrowLeft } from '@fluentui/keyboard-keys';
import type { CheckboxOnChangeData } from '@fluentui/react-checkbox';
import { Checkbox } from '@fluentui/react-checkbox';
import type { ListItemActionEvent } from '../../events/ListItemActionEvent';
import { createListItemActionEvent, ListItemActionEventName } from '../../events/ListItemActionEvent';

const DEFAULT_ROOT_EL_TYPE = 'li';

/**
 * Create the state required to render ListItem.
 *
 * The returned state can be modified with hooks such as useListItemStyles_unstable,
 * before being passed to renderListItem_unstable.
 *
 * @param props - props from this instance of ListItem
 * @param ref - reference to root HTMLLIElement | HTMLDivElementof ListItem
 */
export const useListItem_unstable = (
  props: ListItemProps,
  ref: React.Ref<HTMLLIElement | HTMLDivElement>,
): ListItemState => {
  const { checkmark: checkmarkProp, ...baseProps } = props;
  const state = useListItemBase_unstable(baseProps, ref);

  const { navigationMode } = useListSynchronousContext();

  const as = props.as || navigationMode === 'composite' ? 'div' : DEFAULT_ROOT_EL_TYPE;

  const focusableGroupAttrs = useFocusableGroup({
    ignoreDefaultKeydown: { Enter: true },
    tabBehavior: 'limited-trap-focus',
  });

  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: 'horizontal',
  });

  const tabsterAttributes = useMergedTabsterAttributes_unstable(
    state.navigable ? arrowNavigationAttributes : {},
    focusableGroupAttrs,
    props as Partial<TabsterDOMAttribute>,
  );

  const baseKeyDown = state.root.onKeyDown;

  const handleKeyDown: React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement> = useEventCallback(e => {
    // Invokes the consumer handler and the base Space/Enter behavior before the Tabster additions.
    baseKeyDown?.(e);

    // If the event is fired from an element inside the list item
    if (e.target !== e.currentTarget) {
      if (e.defaultPrevented || !state.navigable) {
        return;
      }

      // If the items are focusable, we need to handle the arrow keys to move focus to them
      switch (e.key) {
        // If it's one of the Arrows defined, jump out of the list item to focus on the ListItem itself
        // The ArrowLeft will only trigger if the target element is the leftmost, otherwise the
        // arrowNavigationAttributes handles it and prevents it from bubbling here.
        case ArrowLeft:
          e.target.dispatchEvent(new GroupperMoveFocusEvent({ action: GroupperMoveFocusActions.Escape }));
          break;

        case ArrowDown:
        case ArrowUp:
          e.preventDefault();
          // Press ESC on the original target to get focus to the parent group (List)
          e.target.dispatchEvent(new GroupperMoveFocusEvent({ action: GroupperMoveFocusActions.Escape }));
          // Now dispatch the original key to move up or down in the list
          e.currentTarget.dispatchEvent(new MoverMoveFocusEvent({ key: MoverKeys[e.key] }));
      }
      return;
    }

    if (e.defaultPrevented) {
      return;
    }

    if (e.key === ArrowRight && navigationMode === 'composite') {
      e.target.dispatchEvent(new GroupperMoveFocusEvent({ action: GroupperMoveFocusActions.Enter }));
    }
  });

  const checkmark = slot.optional(checkmarkProp, {
    defaultProps: {
      checked: state.checkmark?.checked,
      tabIndex: -1,
      disabled: props.disabledSelection,
    },
    renderByDefault: state.selectable,
    elementType: Checkbox,
  });

  const mergedCheckmarkRef = useMergedRefs(checkmark?.ref, state.checkmark?.ref);
  if (checkmark) {
    checkmark.onChange = mergeCallbacks(
      checkmark.onChange,
      state.checkmark?.onChange as unknown as (
        e: React.ChangeEvent<HTMLInputElement>,
        data: CheckboxOnChangeData,
      ) => void,
    );
    checkmark.ref = mergedCheckmarkRef;
  }

  return {
    ...state,
    components: {
      root: as,
      checkmark: Checkbox,
    },
    root: { ...state.root, ...tabsterAttributes, onKeyDown: handleKeyDown },
    checkmark,
  };
};

/**
 * Base state hook for ListItem, free of any focus or keyboard navigation runtime and of the
 * Fluent `Checkbox` used for the selection indicator.
 *
 * The checkmark slot is rendered as a native `input[type="checkbox"]`, and the Tabster driven
 * arrow key handling is layered on by the wrapping `useListItem_unstable` hook.
 *
 * @param props - props from this instance of ListItem
 * @param ref - reference to root HTMLLIElement | HTMLDivElementof ListItem
 */
export const useListItemBase_unstable = (
  props: ListItemBaseProps,
  ref: React.Ref<HTMLLIElement | HTMLDivElement>,
): ListItemBaseState => {
  const id = useId('listItem');
  const { value = id, onKeyDown, onClick, tabIndex, role, onAction, disabledSelection } = props;

  const toggleItem = useListContext_unstable(ctx => ctx.selection?.toggleItem);

  const { navigationMode, listItemRole } = useListSynchronousContext();

  const isSelectionModeEnabled = useListContext_unstable(ctx => !!ctx.selection);
  const isSelected = useListContext_unstable(ctx => ctx.selection?.isSelected(value)) ?? false;
  const validateListItem = useListContext_unstable(ctx => ctx.validateListItem);

  const as = props.as || navigationMode === 'composite' ? 'div' : DEFAULT_ROOT_EL_TYPE;

  const finalListItemRole = role || listItemRole;

  const focusableItems = Boolean(isSelectionModeEnabled || navigationMode || tabIndex === 0);

  const rootRef = React.useRef<HTMLLIElement | HTMLDivElement>(null);
  const checkmarkRef = React.useRef<HTMLInputElement | null>(null);

  const handleAction: (event: ListItemActionEvent) => void = useEventCallback(event => {
    onAction?.(event, { event, value, type: ListItemActionEventName });

    if (event.defaultPrevented) {
      return;
    }

    if (isSelectionModeEnabled && !disabledSelection) {
      toggleItem?.(event.detail.originalEvent, value);
    }
  });

  React.useEffect(() => {
    if (rootRef.current) {
      validateListItem(rootRef.current);
    }
  }, [validateListItem]);

  const triggerAction = (e: React.MouseEvent | React.KeyboardEvent) => {
    const actionEvent = createListItemActionEvent(e);
    handleAction(actionEvent);
    e.target.dispatchEvent(actionEvent);
  };

  const handleClick: React.MouseEventHandler<HTMLLIElement & HTMLDivElement> = useEventCallback(e => {
    onClick?.(e);

    if (e.defaultPrevented) {
      return;
    }

    const isFromCheckbox = elementContains(checkmarkRef.current, e.target as Node);
    if (isFromCheckbox) {
      return;
    }

    triggerAction(e);
  });

  const handleKeyDown: React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement> = useEventCallback(e => {
    onKeyDown?.(e);

    if (e.defaultPrevented) {
      return;
    }

    // Events fired from an element inside the list item are left to the caller's focus management.
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (e.key) {
      case Space:
        // we have to prevent default here otherwise the space key will scroll the page
        e.preventDefault();

        // Space always toggles selection (if enabled)
        if (isSelectionModeEnabled) {
          if (!disabledSelection) {
            toggleItem?.(e, value);
          }
        } else {
          triggerAction(e);
        }

        break;

      case Enter:
        triggerAction(e);
        break;
    }
  });

  const onCheckboxChange = useEventCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSelectionModeEnabled || e.defaultPrevented) {
      return;
    }

    toggleItem?.(e, value);
  });

  const root = slot.always(
    getIntrinsicElementProps(as, {
      ref: useMergedRefs(rootRef, ref) as React.Ref<HTMLLIElement & HTMLDivElement>,
      tabIndex: focusableItems ? 0 : undefined,
      role: finalListItemRole,
      id: String(value),
      ...(isSelectionModeEnabled && {
        'aria-selected': isSelected,
        'aria-disabled': (disabledSelection && !onAction) || undefined,
      }),
      ...props,
      onKeyDown: handleKeyDown,
      onClick: isSelectionModeEnabled || onClick || onAction ? handleClick : undefined,
    }),
    { elementType: as },
  );

  const checkmark = slot.optional(props.checkmark, {
    defaultProps: {
      type: 'checkbox',
      checked: isSelected,
      tabIndex: -1,
      disabled: disabledSelection,
    },
    renderByDefault: isSelectionModeEnabled,
    elementType: 'input',
  });

  const mergedCheckmarkRef = useMergedRefs(checkmark?.ref, checkmarkRef);
  if (checkmark) {
    checkmark.onChange = mergeCallbacks(checkmark.onChange, onCheckboxChange);
    checkmark.ref = mergedCheckmarkRef;
  }

  const state: ListItemBaseState = {
    components: {
      root: as,
      checkmark: 'input',
    },
    root,
    checkmark,
    disabled: disabledSelection && !onAction,
    selectable: isSelectionModeEnabled,
    navigable: focusableItems,
  };

  return state;
};
