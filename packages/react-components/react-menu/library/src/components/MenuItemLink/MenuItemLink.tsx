import * as React from 'react';
import { useMenuItemLink_unstable } from './useMenuItemLink';
import { renderMenuItemLink_unstable } from './renderMenuItemLink';
import { useMenuItemLinkStyles_unstable } from './useMenuItemLinkStyles.styles';
import type { MenuItemLinkProps } from './MenuItemLink.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * MenuItemLink component
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const MenuItemLink: ForwardRefComponent<MenuItemLinkProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemLink_unstable(props, ref);

  useMenuItemLinkStyles_unstable(state);

  useCustomStyleHook_unstable('useMenuItemLinkStyles_unstable')(state);

  return renderMenuItemLink_unstable(state);
});

MenuItemLink.displayName = 'MenuItemLink';
