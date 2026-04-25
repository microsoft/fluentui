'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ListItemProps } from './ListItem.types';
import { useListItem } from './useListItem';
import { renderListItem } from './renderListItem';

export const ListItem: ForwardRefComponent<ListItemProps> = React.forwardRef((props, ref) => {
  const state = useListItem(props, ref);
  return renderListItem(state);
});

ListItem.displayName = 'ListItem';
