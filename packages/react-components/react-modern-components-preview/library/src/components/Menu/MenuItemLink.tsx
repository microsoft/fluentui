'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuItemLinkProps } from './Menu.types';
import { renderMenuItemLink } from './renderMenu';
import { useMenuItemLink } from './useMenu';
import { useMenuItemLinkStyles } from './useMenuStyles.styles';

export const MenuItemLink: ForwardRefComponent<MenuItemLinkProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemLink(props, ref);
  useMenuItemLinkStyles(state);
  return renderMenuItemLink(state);
}) as ForwardRefComponent<MenuItemLinkProps>;

MenuItemLink.displayName = 'MenuItemLink';
