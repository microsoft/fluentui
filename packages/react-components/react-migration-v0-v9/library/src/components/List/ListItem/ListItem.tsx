import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useListItem_unstable } from './useListItem';
import { renderListItem_unstable } from './renderListItem';
import { useListItemStyles_unstable } from './useListItemStyles.styles';
import type { ListItemProps } from './ListItem.types';

export const ListItem: ForwardRefComponent<ListItemProps> = React.forwardRef<HTMLLIElement | HTMLDivElement>(
  (props, ref) => {
    const state = useListItem_unstable(props, ref);

    useListItemStyles_unstable(state);
    useCustomStyleHook_unstable('useListItemStyles_unstable')(state);
    return renderListItem_unstable(state);
  },
);

ListItem.displayName = 'ListItem';
