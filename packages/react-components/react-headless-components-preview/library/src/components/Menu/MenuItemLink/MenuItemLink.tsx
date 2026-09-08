'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuItemLink } from './useMenuItemLink';
import { renderMenuItemLink } from './renderMenuItemLink';
import type { MenuItemLinkProps } from './MenuItemLink.types';

/**
 * Headless MenuItemLink component.
 *
 * Renders an anchor (`<a>`) with `role="menuitem"` for navigational menu
 * items. Click follows the supplied `href`.
 */
export const MenuItemLink: ForwardRefComponent<MenuItemLinkProps> = React.forwardRef<
  HTMLAnchorElement,
  MenuItemLinkProps
>((props, ref) => {
  const state = useMenuItemLink(props, ref);
  return renderMenuItemLink(state);
}) as ForwardRefComponent<MenuItemLinkProps>;

MenuItemLink.displayName = 'MenuItemLink';
