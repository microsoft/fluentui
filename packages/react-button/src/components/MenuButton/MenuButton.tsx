import * as React from 'react';
import { ChevronDownIcon } from './DefaultIcons';
import { renderMenuButton } from './renderMenuButton';
import { useMenuButton } from './useMenuButton';
import { useMenuButtonStyles } from './useMenuButtonStyles';
import type { MenuButtonProps } from './MenuButton.types';

/**
 * Define a styled MenuButton, using the `useMenuButton` hook.
 * {@docCategory Button}
 */
export const MenuButton: React.FunctionComponent<MenuButtonProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  MenuButtonProps
>((props, ref) => {
  const state = useMenuButton(props, ref, {
    menuIcon: { as: ChevronDownIcon },
  });

  useMenuButtonStyles(state);

  return renderMenuButton(state);
});

MenuButton.displayName = 'MenuButton';
