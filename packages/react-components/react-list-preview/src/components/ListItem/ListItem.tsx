import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
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

  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('useListItemStyles_unstable')(state);
  return renderListItem_unstable(state);
});

ListItem.displayName = 'ListItem';
