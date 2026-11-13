'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderListItem, useListItem } from '@fluentui/react-headless-components-preview/list';

import type { ListItemProps } from './ListItem.types';
import { useListItemStyles } from './useListItemStyles';

/** An item in a List, with an optional native selection input. */
export const ListItem: ForwardRefComponent<ListItemProps> = React.forwardRef((props, ref) => {
  const state = useListItem(props, ref);
  const styled = useListItemStyles(state);

  return renderListItem(styled);
});

ListItem.displayName = 'ListItem';
