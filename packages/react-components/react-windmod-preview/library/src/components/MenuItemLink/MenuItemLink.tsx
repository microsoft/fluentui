'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMenuItemLink, useMenuItemLink } from '@fluentui/react-headless-components-preview/menu';

import type { MenuItemLinkProps } from './MenuItemLink.types';
import { useMenuItemLinkStyles } from './useMenuItemLinkStyles';

/**
 * A MenuItemLink is a menu item that navigates. Windmod MenuItemLink: the headless item decorated
 * with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * The checkmark slot deliberately receives NO default glyph. Griffel's MenuItemLink paints none
 * either — its checkmark styles only reserve a hidden 16px gutter, and MenuItemLinkProps has no
 * `checked` for the visible bucket to key off — so this is parity, not an omission.
 */
export const MenuItemLink: ForwardRefComponent<MenuItemLinkProps> = React.forwardRef(
  (props: MenuItemLinkProps, ref: React.Ref<HTMLAnchorElement>) =>
    renderMenuItemLink(useMenuItemLinkStyles(useMenuItemLink(props, ref))),
) as ForwardRefComponent<MenuItemLinkProps>;

MenuItemLink.displayName = 'MenuItemLink';
