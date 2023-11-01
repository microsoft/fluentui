import * as React from 'react';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { getNativeElementProps, slot, useEventCallback, useId, useMergedRefs } from '@fluentui/react-utilities';
import { Checkbox } from '@fluentui/react-checkbox';
import type { ListItemProps, ListItemState } from './ListItem.types';
import { useListContext_unstable } from '../List/listContext';

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
  const selectable = useListContext_unstable(ctx => ctx.selectable);
  const selection = useListContext_unstable(ctx => ctx.selection);

  const focusableGroupAttrs = useFocusableGroup({ tabBehavior: 'limited-trap-focus' });

  const innerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    registerItem(value, innerRef);

    return () => {
      deregisterItem(value, innerRef);
    };
    // Always make sure the dependencies are stable across rerenders, otherwise we go
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
      selection.toggleItem(e, value);
    }
  });

  const handleClick: typeof onClick = useEventCallback(e => {
    onClick?.(e);

    if (e.defaultPrevented) {
      return;
    }

    if (selectable) {
      selection.toggleItem(e, value);
    }
  });

  const ariaLabel = selectable
    ? selection.isSelected(value)
      ? `${props['aria-label']}, selected`
      : `${props['aria-label']}, not selected`
    : props['aria-label'];

  const root = slot.always(
    getNativeElementProps('li', {
      ref: useMergedRefs(ref, innerRef),
      // role: selectable ? 'option' : 'listitem',
      role: 'option',
      tabIndex: focusableItems || selectable ? 0 : undefined,
      'aria-selected': selectable ? selection.isSelected(value) : undefined,
      id: value,
      ...focusableGroupAttrs,
      ...props,
      onKeyDown: handleKeyDown,
      onClick: handleClick,
      // 'aria-live': 'polite',
      'aria-label': ariaLabel,
    }),
    { elementType: 'li' },
  );

  const checkbox = slot.optional(props.checkbox, {
    renderByDefault: selectable,
    elementType: Checkbox,
    defaultProps: {
      tabIndex: -1,
      checked: selection.isSelected(value),
      onChange: e => selection.toggleItem(e, value),
    },
  });

  const state: ListItemState = {
    components: {
      root: 'div',
      checkbox: Checkbox,
    },
    root,
    checkbox,
    selectable,
  };

  return state;
};
