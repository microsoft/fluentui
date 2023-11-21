import * as React from 'react';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, slot, useEventCallback, useId, useMergedRefs } from '@fluentui/react-utilities';
import type { ListItemProps, ListItemState } from './ListItem.types';
import { useListContext_unstable } from '../List/listContext';
import { Checkmark16Filled } from '@fluentui/react-icons';

const EMPTY_OBJECT = {};

const listPropsForSelected = {
  tabIndex: 0,
  role: 'option',
  'aria-selected': true,
  checkmark: {
    children: <Checkmark16Filled />,
  },
};

const listPropsForNotSelected = {
  tabIndex: 0,
  role: 'option',
  'aria-selected': false,
  checkmark: {
    children: null,
  },
};

/**
 * Create the state required to render ListItem.
 *
 * The returned state can be modified with hooks such as useListItemStyles_unstable,
 * before being passed to renderListItem_unstable.
 *
 * @param props - props from this instance of ListItem
 * @param ref - reference to root HTMLElement of ListItem
 */
export const useListItem_unstable = (props: ListItemProps, ref: React.Ref<HTMLElement>): ListItemState => {
  const id = useId('listItem');
  const { value = id, onKeyDown, onClick } = props;

  const focusableItems = useListContext_unstable(ctx => ctx.focusableItems);
  const registerItem = useListContext_unstable(ctx => ctx.registerItem);
  const deregisterItem = useListContext_unstable(ctx => ctx.deregisterItem);
  const toggleItem = useListContext_unstable(ctx => ctx.selection?.toggleItem);
  const isSelectionEnabled = useListContext_unstable(ctx => !!ctx.selection);
  const isSelected = useListContext_unstable(ctx => ctx.selection?.isSelected(value));

  const listItemProps = isSelected ? listPropsForSelected : listPropsForNotSelected;

  const focusableGroupAttrs = useFocusableGroup({ tabBehavior: 'limited-trap-focus' });

  const innerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    registerItem?.(value, innerRef);

    return () => {
      deregisterItem?.(value, innerRef);
    };
    // Always make sure the dependencies are stable across re-renders, otherwise we go
    // in a loop of registering and deregistering.
  }, [innerRef, value, registerItem, deregisterItem]);

  const handleKeyDown: typeof onKeyDown = useEventCallback(e => {
    onKeyDown?.(e);

    // Compare targets to make sure this only triggers when the event is fired on the list item
    // and not on a button inside
    if (e.defaultPrevented || e.target !== e.currentTarget) {
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      toggleItem?.(e, value);
    }
  });

  const handleClick: typeof onClick = useEventCallback(e => {
    onClick?.(e);

    if (e.defaultPrevented) {
      return;
    }

    toggleItem?.(e, value);
  });

  const root = slot.always(
    getIntrinsicElementProps('li', {
      ref: useMergedRefs(ref, innerRef),
      tabIndex: focusableItems ? 0 : undefined,
      role: 'listitem',
      id: String(value),
      ...(isSelectionEnabled ? listItemProps : EMPTY_OBJECT),
      ...focusableGroupAttrs,
      ...props,
      onKeyDown: isSelectionEnabled ? handleKeyDown : onKeyDown,
      onClick: isSelectionEnabled ? handleClick : onClick,
    }),
    { elementType: 'li' },
  );

  const checkmark = slot.optional(props.checkmark, {
    defaultProps: { children: isSelected ? <Checkmark16Filled /> : null },
    renderByDefault: isSelectionEnabled,
    elementType: 'div',
  });

  const state: ListItemState = {
    components: {
      root: 'li',
      checkmark: 'div',
    },
    root,
    checkmark,
  };

  return state;
};
