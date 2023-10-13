import * as React from 'react';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import { Button } from '@fluentui/react-button';
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
  const focusableGroupAttrs = useFocusableGroup({ tabBehavior: 'limited-trap-focus' });

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

  const button = slot.optional(props.button, { elementType: Button, defaultProps: { appearance: 'transparent' } });

  const state: ListItemState = {
    components: {
      root: 'div',
      button: Button,
    },
    root,
    button,
  };

  if (button && (root['aria-labelledby'] || root['aria-label']) && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(
      `A list item with a button should not have an aria-label or aria-labelledby. This can cause issues with screen readers. Please remove the aria-label or aria-labelledby from the list item and add it to the button slot.`,
    );
  }

  return state;
};
