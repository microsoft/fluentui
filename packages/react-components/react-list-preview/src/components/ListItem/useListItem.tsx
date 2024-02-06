import * as React from 'react';
import {
  TabsterDOMAttribute,
  useArrowNavigationGroup,
  useFocusableGroup,
  useFocusFinders,
  useMergedTabsterAttributes_unstable,
} from '@fluentui/react-tabster';
import { getIntrinsicElementProps, slot, useEventCallback, useId, useMergedRefs } from '@fluentui/react-utilities';
import type { ListItemProps, ListItemState } from './ListItem.types';
import { useListContext_unstable } from '../List/listContext';
import { makeResetStyles } from '@griffel/react';
import { Enter, Escape, keyCodes, Space } from '@fluentui/keyboard-keys';
import { Checkbox, CheckboxOnChangeData } from '@fluentui/react-checkbox';

const DEFAULT_ROOT_EL_TYPE = 'li';

function validateProperElementTypes(parentRenderedAs?: 'div' | 'ul' | 'ol', renderedAs?: 'div' | 'li') {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  if (renderedAs === 'div' && parentRenderedAs !== 'div') {
    throw new Error('ListItem cannot be rendered as a div when its parent is not a div.');
  }
  if (renderedAs === 'li' && parentRenderedAs === 'div') {
    throw new Error('ListItem cannot be rendered as a li when its parent is a div.');
  }
}

function validateNavigableWhenOnClickPresent(navigable: boolean, onClick?: React.MouseEventHandler) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  if (onClick && !navigable) {
    throw new Error('ListItem must be navigable when onClick is present. Set navigable={true} on the List.');
  }
}

const useIndicatorStyle = makeResetStyles({
  margin: 0,
});

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
  const { value = id, onKeyDown, onClick } = props;

  const focusableItems = useListContext_unstable(ctx => ctx.focusableItems);
  const toggleItem = useListContext_unstable(ctx => ctx.selection?.toggleItem);
  const isSelectionEnabled = useListContext_unstable(ctx => !!ctx.selection);
  const isSelected = useListContext_unstable(ctx => ctx.selection?.isSelected(value));

  const parentRenderedAs = useListContext_unstable(ctx => ctx.as);
  const renderedAs = props.as || DEFAULT_ROOT_EL_TYPE;

  const rootRef = React.useRef<HTMLLIElement | HTMLDivElement>(null);

  validateProperElementTypes(parentRenderedAs, renderedAs);

  validateNavigableWhenOnClickPresent(focusableItems, onClick);

  const { findFirstFocusable, findPrevFocusable } = useFocusFinders();

  const baseIndicatorStyles = useIndicatorStyle();

  const focusableGroupAttrs = useFocusableGroup({ ignoreDefaultKeydown: { Enter: true } });

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
      if (['ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        // Prevents scrolling for ArrowUp/ArowDown
        e.preventDefault();
        e.target.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: Escape,
            keyCode: keyCodes.Escape,
          }),
        );
      }
    }

    // Now return early if the event is not fired from the list item itself
    // as the following code handles the events specifically coming from the list item
    if (e.target !== e.currentTarget) {
      return;
    }

    // Handle selection for enter and space
    if ((isSelectionEnabled || typeof props.onClick === 'function') && [Space, Enter].includes(e.key)) {
      e.preventDefault();
      e.currentTarget.click();
    }

    // Handle entering the list item when user presses the ArrowRight
    if (e.key === 'ArrowRight') {
      const el = findFirstFocusable(e.currentTarget);
      if (el) {
        el.focus();
      }
    }
  });

  const onCheckboxChange = useEventCallback((ev: React.ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => {
    props.checkmark?.onChange?.(ev, data);

    if (!isSelectionEnabled || ev.defaultPrevented) {
      return;
    }

    toggleItem?.(ev, value);
  });
  const onCheckboxClick = useEventCallback((ev: React.MouseEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    // toggleItem?.(ev, value);
  });

  // const handleKeyUp: React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement> = useEventCallback(e => {
  //   onKeyUp?.(e);

  //   if (!isSelectionEnabled || e.defaultPrevented || e.target !== e.currentTarget) {
  //     // In this case prevent default prevents the useARIAButtonProps from toggling onClick
  //     e.preventDefault();
  //     return;
  //   }
  // });
  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: 'horizontal',
    // tabbable: false,
    // memorizeCurrent: true,
  });

  const tabsterAttributes = useMergedTabsterAttributes_unstable(
    focusableItems ? arrowNavigationAttributes : ({} as TabsterDOMAttribute),
    focusableGroupAttrs,
  );

  const root = slot.always(
    getIntrinsicElementProps(DEFAULT_ROOT_EL_TYPE, {
      ref: useMergedRefs(rootRef, ref) as React.Ref<HTMLLIElement & HTMLDivElement>,
      tabIndex: focusableItems || isSelectionEnabled ? 0 : undefined,
      role: 'listitem',
      id: String(value),
      ...(isSelectionEnabled && {
        role: 'option',
        'aria-selected': isSelected,
      }),
      ...tabsterAttributes,
      ...props,
      onKeyDown: handleKeyDown,
      onClick: handleClick,
    }),
    { elementType: DEFAULT_ROOT_EL_TYPE },
  );

  const checkmark = slot.optional(props.checkmark, {
    defaultProps: {
      // 'aria-hidden': true,
      checked: isSelected,
      onChange: onCheckboxChange,
      onClick: onCheckboxClick,
      // tabIndex: -1,
      indicator: { className: baseIndicatorStyles },
    },
    renderByDefault: isSelectionEnabled,
    elementType: Checkbox,
  });

  const state: ListItemState = {
    components: {
      root: DEFAULT_ROOT_EL_TYPE,
      checkmark: Checkbox,
    },
    root,
    checkmark,
    selectable: isSelectionEnabled,
  };

  return state;
};
