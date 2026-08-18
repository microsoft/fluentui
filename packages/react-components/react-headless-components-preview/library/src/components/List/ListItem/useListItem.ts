'use client';

import type * as React from 'react';
import { useListItemBase_unstable } from '@fluentui/react-list';

import type { ListItemProps, ListItemState } from './ListItem.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for a ListItem component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderListItem`.
 */
export const useListItem = (props: ListItemProps, ref: React.Ref<HTMLLIElement | HTMLDivElement>): ListItemState => {
  const state: ListItemState = useListItemBase_unstable(props, ref);

  // Set data attributes for selection and navigation states to simplify styling of these states.
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selectable'] = stringifyDataAttribute(state.selectable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-navigable'] = stringifyDataAttribute(state.navigable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selected'] = stringifyDataAttribute(state.root['aria-selected'] === true);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);

  return state;
};
