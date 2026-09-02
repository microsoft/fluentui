'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMenuItemLink, useMenuItemLink } from '@fluentui/react-headless-components-preview/menu';

import { mergeContextProps } from '../../utils/mergeContextProps';
import { useMenuItemContext } from '../MenuItem/menuItemContext';
import type { MenuItemLinkProps } from './MenuItemLink.types';
import { useMenuItemLinkStyles } from './useMenuItemLinkStyles';

/**
 * A MenuItemLink is a menu item that navigates. Windmod MenuItemLink: the headless item decorated
 * with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * The checkmark slot deliberately receives NO default glyph. Griffel's MenuItemLink paints none
 * either — its checkmark styles only reserve a hidden 16px gutter, and MenuItemLinkProps has no
 * `checked` for the visible bucket to key off — so this is parity, not an omission.
 *
 * It reads MenuItem's context because it IS a menu item: a container publishing to the items it
 * holds reaches an anchor-rooted one on the same channel. See MenuItem.
 */
export const MenuItemLink: ForwardRefComponent<MenuItemLinkProps> = React.forwardRef((props, ref) =>
  renderMenuItemLink(useMenuItemLinkStyles(useMenuItemLink(mergeContextProps(useMenuItemContext(), props), ref))),
);

MenuItemLink.displayName = 'MenuItemLink';
