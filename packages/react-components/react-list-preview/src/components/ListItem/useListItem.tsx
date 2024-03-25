import * as React from 'react';
import {
  dispatchGroupperMoveFocusEvent,
  dispatchMoverMoveFocusEvent,
  TabsterDOMAttribute,
  TabsterTypes,
  useArrowNavigationGroup,
  useFocusableGroup,
  useMergedTabsterAttributes_unstable,
} from '@fluentui/react-tabster';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  slot,
  useEventCallback,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { ListItemProps, ListItemState } from './ListItem.types';
import { useListContext_unstable } from '../List/listContext';
import { Enter, Space, ArrowUp, ArrowDown, ArrowRight, ArrowLeft } from '@fluentui/keyboard-keys';
import { Checkbox, CheckboxOnChangeData } from '@fluentui/react-checkbox';

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
  const id = useId('listItem');
  const { value = id, onKeyDown, onClick, tabIndex, role } = props;

  const toggleItem = useListContext_unstable(ctx => ctx.selection?.toggleItem);
  const navigationMode = useListContext_unstable(ctx => ctx.navigationMode);
  const isSelectionEnabled = useListContext_unstable(ctx => !!ctx.selection);
  const isSelected = useListContext_unstable(ctx => ctx.selection?.isSelected(value));
  const listItemRole = useListContext_unstable(ctx => ctx.listItemRole);
  const validateListItem = useListContext_unstable(ctx => ctx.validateListItem);

  const finalListItemRole = role || listItemRole;

  const focusableItems = Boolean(isSelectionEnabled || navigationMode || tabIndex === 0);

  const rootRef = React.useRef<HTMLLIElement | HTMLDivElement>(null);

  React.useEffect(() => {
    if (rootRef.current) {
      validateListItem(rootRef.current);
    }
  }, [validateListItem]);

  const focusableGroupAttrs = useFocusableGroup({
    ignoreDefaultKeydown: { Enter: true },
    tabBehavior: 'limited-trap-focus',
  });

  const handleClick: React.MouseEventHandler<HTMLLIElement & HTMLDivElement> = useEventCallback(e => {
    onClick?.(e);

    if (!isSelectionEnabled || e.defaultPrevented) {
      return;
    }

    toggleItem?.(e, value);
  });

  const handleKeyDown: React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement> = useEventCallback(e => {
    onKeyDown?.(e);

    // Return early if prevented default
    if (e.defaultPrevented) {
      return;
    }

    // If the list items themselves are focusable and the event is fired from an element inside the list item
    if (focusableItems && e.target !== e.currentTarget) {
      // If it's one of the Arrows defined, jump out of the list item to focus on the ListItem itself
      // The ArrowLeft will only trigger if the target element is the leftmost, otherwise the
      // arrowNavigationAttributes handles it and prevents it from bubbling here.

      if (e.key === ArrowLeft) {
        dispatchGroupperMoveFocusEvent(e.target as HTMLElement, TabsterTypes.GroupperMoveFocusActions.Escape);
      }

      if (e.key === ArrowDown || e.key === ArrowUp) {
        e.preventDefault();
        // Press ESC on the original target to get focus to the parent group (List)
        dispatchGroupperMoveFocusEvent(e.target as HTMLElement, TabsterTypes.GroupperMoveFocusActions.Escape);

        // Now dispatch the original key to move up or down in the list
        dispatchMoverMoveFocusEvent(e.currentTarget as HTMLElement, TabsterTypes.MoverKeys[e.key]);
      }
    }

    // Now return early if the event is not fired from the list item itself
    // as the following code handles the events specifically coming from the list item
    if (e.target !== e.currentTarget) {
      return;
    }

    // Space always toggles selection (if enabled)
    if (e.key === Space) {
      e.preventDefault();
      if (isSelectionEnabled) {
        toggleItem?.(e, value);
      } else {
        e.currentTarget.click();
      }
    }

    // Handle clicking the list item when user presses the Enter key
    // This internally triggers selection in the onClick handler if it hasn't been prevented
    if (e.key === Enter) {
      e.preventDefault();
      e.currentTarget.click();
    }

    // Handle entering the list item when user presses the ArrowRight, when composite navigation is enabled
    if (e.key === ArrowRight && navigationMode === 'composite') {
      dispatchGroupperMoveFocusEvent(e.target as HTMLElement, TabsterTypes.GroupperMoveFocusActions.Enter);
    }
  });

  const onCheckboxChange = useEventCallback((e: React.ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => {
    if (!isSelectionEnabled || e.defaultPrevented) {
      return;
    }

    toggleItem?.(e, value);
  });

  // By default, we stop the propagation of the click event on the checkbox to prevent the list item from being clicked.
  // This behavior can be prevented by the consumer by passing a custom onClick handler to the checkmark slot,
  // as these callbacks are not merged.
  const onCheckboxClick = useEventCallback((e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  });

  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: 'horizontal',
  });

  const tabsterAttributes = useMergedTabsterAttributes_unstable(
    focusableItems ? arrowNavigationAttributes : ({} as TabsterDOMAttribute),
    focusableGroupAttrs,
  );

  const root = slot.always(
    getIntrinsicElementProps(DEFAULT_ROOT_EL_TYPE, {
      ref: useMergedRefs(rootRef, ref) as React.Ref<HTMLLIElement & HTMLDivElement>,
      tabIndex: focusableItems ? 0 : undefined,
      role: finalListItemRole,
      id: String(value),
      ...(isSelectionEnabled && {
        'aria-selected': isSelected,
      }),
      ...tabsterAttributes,
      ...props,
      onKeyDown: handleKeyDown,
      onClick: isSelectionEnabled || onClick ? handleClick : undefined,
    }),
    { elementType: DEFAULT_ROOT_EL_TYPE },
  );

  const checkmark = slot.optional(props.checkmark, {
    defaultProps: {
      checked: isSelected,
      onClick: onCheckboxClick,
      tabIndex: -1,
    },
    renderByDefault: isSelectionEnabled,
    elementType: Checkbox,
  });

  if (checkmark) {
    checkmark.onChange = mergeCallbacks(checkmark.onChange, onCheckboxChange);
  }

  const state: ListItemState = {
    components: {
      root: DEFAULT_ROOT_EL_TYPE,
      checkmark: Checkbox,
    },
    root,
    checkmark,
    selectable: isSelectionEnabled,
    navigable: focusableItems,
  };

  return state;
};
