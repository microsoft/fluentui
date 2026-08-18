'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ListItemProps } from './ListItem.types';
import { useListItem } from './useListItem';
import { renderListItem } from './renderListItem';

/**
 * Represents a single item within a `List`.
 *
 * Must be rendered inside a `List`, which provides the item role and the selection state. When the
 * parent list is selectable the item renders a native `input[type="checkbox"]` checkmark slot.
 */
export const ListItem: ForwardRefComponent<ListItemProps> = React.forwardRef((props, ref) => {
  const state = useListItem(props, ref);

  return renderListItem(state);
});

ListItem.displayName = 'ListItem';
