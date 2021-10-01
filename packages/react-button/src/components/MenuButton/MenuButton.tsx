import * as React from 'react';
import { renderMenuButton } from './renderMenuButton';
import { useMenuButton } from './useMenuButton';
import { useMenuButtonStyles } from './useMenuButtonStyles';
import type { MenuButtonProps } from './MenuButton.types';

/**
 * MenuButtons are buttons that handle opening and closing a menu when they are triggered.
 */
export const MenuButton: React.FunctionComponent<MenuButtonProps> = React.forwardRef<
  HTMLButtonElement,
  MenuButtonProps
>((props, ref) => {
  const state = useMenuButton(props, ref);

  useMenuButtonStyles(state);

  return renderMenuButton(state);
}) as React.FunctionComponent<MenuButtonProps>;

MenuButton.displayName = 'MenuButton';
