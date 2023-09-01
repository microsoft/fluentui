import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useListItem_unstable } from './useListItem';
import { renderListItem_unstable } from './renderListItem';
import { useListItemStyles_unstable } from './useListItemStyles.styles';
import type { ListItemProps } from './ListItem.types';

/**
 * ListItem component - TODO: add more docs
 */
export const ListItem: ForwardRefComponent<ListItemProps> = React.forwardRef((props, ref) => {
  const state = useListItem_unstable(props, ref);

  useListItemStyles_unstable(state);
  return renderListItem_unstable(state);
});

ListItem.displayName = 'ListItem';
