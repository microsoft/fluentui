'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuButtonProps } from './MenuButton.types';
import { renderMenuButton } from './renderMenuButton';
import { useMenuButton } from './useMenuButton';
import { useMenuButtonStyles } from './useMenuButtonStyles.styles';

export const MenuButton: ForwardRefComponent<MenuButtonProps> = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  MenuButtonProps
>((props, ref) => {
  const state = useMenuButton(props, ref);
  useMenuButtonStyles(state);
  return renderMenuButton(state);
});

MenuButton.displayName = 'MenuButton';
