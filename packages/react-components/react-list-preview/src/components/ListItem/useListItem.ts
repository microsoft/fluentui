import * as React from 'react';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { ListItemProps, ListItemState } from './ListItem.types';
import { useListContext } from '../List/listContext';

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
  const { focusableItems } = useListContext();
  const focusableGroupAttrs = useFocusableGroup({ tabBehavior: 'unlimited' });

  const root = slot.always(
    getNativeElementProps('div', {
      ref,
      role: 'listitem',
      tabIndex: focusableItems ? 0 : undefined,
      ...focusableGroupAttrs,
      ...props,
    }),
    { elementType: 'div' },
  );

  const state: ListItemState = {
    components: {
      root: 'div',
    },
    root,
  };

  return state;
};
