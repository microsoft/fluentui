import * as React from 'react';
import { useMenuItemLink_unstable } from './useMenuItemLink';
import { renderMenuItemLink_unstable } from './renderMenuItemLink';
import { useMenuItemLinkStyles_unstable } from './useMenuItemLinkStyles.styles';
import type { MenuItemLinkProps } from './MenuItemLink.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * MenuItemLink component
 */
export const MenuItemLink: ForwardRefComponent<MenuItemLinkProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemLink_unstable(props, ref);

  useMenuItemLinkStyles_unstable(state);
  return renderMenuItemLink_unstable(state);
});

MenuItemLink.displayName = 'MenuItemLink';
