import * as React from 'react';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { getNativeElementProps, slot, useId, useMergedRefs } from '@fluentui/react-utilities';
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
  const { value = id } = props;

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

  const root = slot.always(
    getNativeElementProps('div', {
      ref: useMergedRefs(ref, innerRef),
      role: 'listitem',
      tabIndex: focusableItems ? 0 : undefined,
      ...focusableGroupAttrs,
      ...props,
    }),
    { elementType: 'div' },
  );

  const checkbox = slot.optional(props.checkbox, {
    renderByDefault: selectable,
    elementType: Checkbox,
    defaultProps: {
      tabIndex: 0,
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
