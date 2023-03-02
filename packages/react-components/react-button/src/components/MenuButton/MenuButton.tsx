import * as React from 'react';
import { renderMenuButton_unstable } from './renderMenuButton';
import { useMenuButton_unstable } from './useMenuButton';
import { useMenuButtonStyles_unstable } from './useMenuButtonStyles';
import type { MenuButtonProps } from './MenuButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * MenuButtons are buttons that have a chevron icon after the button contents and are usually clicked to open/close
 * menus.
 */
export const MenuButton: ForwardRefComponent<MenuButtonProps> = React.forwardRef((props, ref) => {
  const state = useMenuButton_unstable(props, ref);

  useMenuButtonStyles_unstable(state);

  const { useMenuButtonStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderMenuButton_unstable(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<MenuButtonProps>;

MenuButton.displayName = 'MenuButton';
