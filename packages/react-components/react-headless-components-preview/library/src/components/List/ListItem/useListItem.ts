'use client';

import type * as React from 'react';
import { useListItemBase_unstable } from '@fluentui/react-list';

import type { ListItemProps, ListItemState } from './ListItem.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a ListItem component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderListItem`.
 */
export const useListItem = (props: ListItemProps, ref: React.Ref<HTMLLIElement | HTMLDivElement>): ListItemState => {
  const baseState = useListItemBase_unstable(props, ref);

  return {
    ...baseState,
    root: {
      ...baseState.root,
      'data-selectable': toDataAttributeValue(baseState.selectable),
      'data-navigable': toDataAttributeValue(baseState.navigable),
      'data-selected': toDataAttributeValue(baseState.root['aria-selected']),
      'data-disabled': toDataAttributeValue(baseState.disabled),
    },
  };
};
