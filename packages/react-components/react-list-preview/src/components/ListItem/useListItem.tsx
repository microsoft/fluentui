import * as React from 'react';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { getNativeElementProps, slot, useEventCallback, useId, useMergedRefs } from '@fluentui/react-utilities';
import type { ListItemProps, ListItemState } from './ListItem.types';
import { useListContext_unstable } from '../List/listContext';
import { Checkmark16Filled } from '@fluentui/react-icons';

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
  const selection = useListContext_unstable(ctx => ctx.selection);
  const registerItem = useListContext_unstable(ctx => ctx.registerItem);
  const deregisterItem = useListContext_unstable(ctx => ctx.deregisterItem);

  const focusableGroupAttrs = useFocusableGroup({ tabBehavior: 'limited-trap-focus' });

  const innerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    registerItem?.(value, innerRef);

    return () => {
      deregisterItem?.(value, innerRef);
    };
    // Always make sure the dependencies are stable across rerenders, otherwise we go
    // in a loop of registering and deregistering.
  }, [innerRef, value, registerItem, deregisterItem]);

  const handleKeyDown: typeof onKeyDown = useEventCallback(e => {
    onKeyDown?.(e);

    // Return early if selection state is not provided = not selectable or controlled
    if (!selection) {
      return;
    }

    // Compare targets to make sure this only triggers when the event is fired on the list item
    // and not on a button inside
    if (e.defaultPrevented || e.target !== e.currentTarget) {
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      selection.toggleItem(e, value);
    }
  });

  const handleClick: typeof onClick = useEventCallback(e => {
    onClick?.(e);

    // Return early if selection state is not provided =  or controlled
    if (!selection) {
      return;
    }

    if (e.defaultPrevented) {
      return;
    }

    selection.toggleItem(e, value);
  });

  const root = slot.always(
    getNativeElementProps('li', {
      ref: useMergedRefs(ref, innerRef),
      tabIndex: focusableItems ? 0 : undefined,
      role: 'listitem',
      id: value,
      ...(selection ? selection.getListItemProps(value) : {}),
      ...focusableGroupAttrs,
      ...props,
      onKeyDown: selection ? handleKeyDown : onKeyDown,
      onClick: selection ? handleClick : onClick,
    }),
    { elementType: 'li' },
  );

  const checkmark = slot.optional(props.checkmark, {
    defaultProps: { children: selection?.isSelected(value) ? <Checkmark16Filled /> : null },
    renderByDefault: !!selection,
    elementType: 'span',
  });

  const state: ListItemState = {
    components: {
      root: 'li',
      checkmark: 'span',
    },
    root,
    checkmark,
  };

  return state;
};
