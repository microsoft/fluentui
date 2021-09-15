import * as React from 'react';
import { renderMenuButton } from './renderMenuButton';
import { useMenuButton } from './useMenuButton';
import { useMenuButtonStyles } from './useMenuButtonStyles';
import type { MenuButtonProps } from './MenuButton.types';
import { ExtractRef } from '@fluentui/react-utilities';

/**
 * MenuButtons are buttons that handle opening and closing a menu when they are triggered.
 */
export const MenuButton = React.forwardRef<ExtractRef<MenuButtonProps>, MenuButtonProps>((props, ref) => {
  const state = useMenuButton(props, ref);

  useMenuButtonStyles(state);

  return renderMenuButton(state);
});

MenuButton.displayName = 'MenuButton';
