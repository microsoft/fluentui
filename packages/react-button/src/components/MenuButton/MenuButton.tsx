import * as React from 'react';
import { ChevronDownIcon } from './DefaultIcons';
import { MenuButtonProps, MenuButtonStyleSelectors } from './MenuButton.types';
import { renderMenuButton } from './renderMenuButton';
import { useMenuButton } from './useMenuButton';
import { useMenuButtonStyles } from './useMenuButtonStyles';

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

  const styleSelectors: MenuButtonStyleSelectors = {
    disabled: state.disabled,
    // expanded: state.expanded,
    iconOnly: state.iconOnly,
    primary: state.primary,
    size: state.size,
    subtle: state.subtle,
    transparent: state.transparent,
  };

  useMenuButtonStyles(state, styleSelectors);

  return renderMenuButton(state);
});

MenuButton.displayName = 'MenuButton';
