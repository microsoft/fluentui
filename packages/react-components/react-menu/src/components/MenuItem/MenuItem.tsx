import * as React from 'react';
import { useMenuItem_unstable } from './useMenuItem';
import { renderMenuItem_unstable } from './renderMenuItem';
import { useMenuItemStyles_unstable } from './useMenuItemStyles.styles';
import type { MenuItemProps } from './MenuItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Define a styled MenuItem, using the `useMenuItem_unstable` and `useMenuItemStyles_unstable` hook.
 */
export const MenuItem: ForwardRefComponent<MenuItemProps> = React.forwardRef((props, ref) => {
  const state = useMenuItem_unstable(props, ref);

  useMenuItemStyles_unstable(state);

  useCustomStyleHook_unstable('useMenuItemStyles_unstable')(state);

  return renderMenuItem_unstable(state);
});

MenuItem.displayName = 'MenuItem';
