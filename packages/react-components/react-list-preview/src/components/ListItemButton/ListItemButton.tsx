import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useListItemButton_unstable } from './useListItemButton';
import { renderListItemButton_unstable } from './renderListItemButton';
import { useListItemButtonStyles_unstable } from './useListItemButtonStyles.styles';
import type { ListItemButtonProps } from './ListItemButton.types';

/**
 * ListItemButton component - TODO: add more docs
 */
export const ListItemButton: ForwardRefComponent<ListItemButtonProps> = React.forwardRef((props, ref) => {
  const state = useListItemButton_unstable(props, ref);

  useListItemButtonStyles_unstable(state);
  useCustomStyleHook_unstable('useListItemButtonStyles_unstable')(state);
  return renderListItemButton_unstable(state);
});

ListItemButton.displayName = 'ListItemButton';
