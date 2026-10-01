'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuItemLinkProps } from './MenuItemLink.types';
import { renderMenuItemLink } from './renderMenuItemLink';
import { useMenuItemLink } from './useMenuItemLink';
import { useMenuItemLinkStyles } from './useMenuItemLinkStyles.styles';

export const MenuItemLink: ForwardRefComponent<MenuItemLinkProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemLink(props, ref);
  useMenuItemLinkStyles(state);
  return renderMenuItemLink(state);
}) as ForwardRefComponent<MenuItemLinkProps>;

MenuItemLink.displayName = 'MenuItemLink';
