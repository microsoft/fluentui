'use client';

import * as React from 'react';
import type { ARIAButtonElement } from '@fluentui/react-aria';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMenuItem, useMenuItem } from '@fluentui/react-headless-components-preview/menu';
import { bundleIcon } from '@fluentui/react-icons/headless';
import { ChevronRightFilled, ChevronRightRegular } from '@fluentui/react-icons/headless/svg/chevron-right';

import type { MenuItemProps, MenuItemState } from './MenuItem.types';
import { useMenuItemStyles } from './useMenuItemStyles';

const ChevronRightIcon = bundleIcon(ChevronRightFilled, ChevronRightRegular);

/**
 * Restores the Fluent default chevron in a new state object, never on the one the hook returned.
 * The slot renders by default whenever hasSubmenu is set, so no pre-hook materialisation is
 * needed; consumer children always win, and submenuIndicator={null} still removes the slot.
 * One glyph serves both directions — MenuItem.module.css mirrors it under rtl.
 */
const withSubmenuIndicator = (state: MenuItemState): MenuItemState =>
  state.submenuIndicator
    ? {
        ...state,
        submenuIndicator: {
          ...state.submenuIndicator,
          children: state.submenuIndicator.children ?? <ChevronRightIcon />,
        },
      }
    : state;

/**
 * A MenuItem is a single action in a menu. Windmod MenuItem: the headless item decorated with
 * the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const MenuItem: ForwardRefComponent<MenuItemProps> = React.forwardRef(
  (props: MenuItemProps, ref: React.Ref<ARIAButtonElement<'div'>>) =>
    renderMenuItem(useMenuItemStyles(withSubmenuIndicator(useMenuItem(props, ref)))),
  // Casting is required due to lack of distributive union to support union on @types/react
) as ForwardRefComponent<MenuItemProps>;

MenuItem.displayName = 'MenuItem';
