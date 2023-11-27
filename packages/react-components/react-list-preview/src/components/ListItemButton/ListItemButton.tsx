import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useListItemButtonStyles_unstable } from './useListItemButtonStyles.styles';
import { ButtonProps, renderButton_unstable, useButton_unstable } from '@fluentui/react-button';

export const ListItemButton: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const state = useButton_unstable({ appearance: 'transparent', ...props }, ref);

  useListItemButtonStyles_unstable(state);
  useCustomStyleHook_unstable('useListItemButtonStyles_unstable')(state);
  return renderButton_unstable(state);
});

ListItemButton.displayName = 'ListItemButton';
