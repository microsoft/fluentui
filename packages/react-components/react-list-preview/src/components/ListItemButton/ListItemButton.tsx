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

  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('useListItemButtonStyles_unstable')(state);
  return renderListItemButton_unstable(state);
});

ListItemButton.displayName = 'ListItemButton';
