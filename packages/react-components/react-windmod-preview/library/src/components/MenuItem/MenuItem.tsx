'use client';

import * as React from 'react';
import type { ARIAButtonElement } from '@fluentui/react-aria';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMenuItem, useMenuItem } from '@fluentui/react-headless-components-preview/menu';
import { useProviderContext } from '@fluentui/react-headless-components-preview/provider';
import { bundleIcon } from '@fluentui/react-icons/headless';
import { ChevronLeftFilled, ChevronLeftRegular } from '@fluentui/react-icons/headless/svg/chevron-left';
import { ChevronRightFilled, ChevronRightRegular } from '@fluentui/react-icons/headless/svg/chevron-right';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { MenuItemProps, MenuItemState } from './MenuItem.types';
import { useMenuItemContext } from './menuItemContext';
import { useMenuItemStyles } from './useMenuItemStyles';

const ChevronRightIcon = bundleIcon(ChevronRightFilled, ChevronRightRegular);
const ChevronLeftIcon = bundleIcon(ChevronLeftFilled, ChevronLeftRegular);

/**
 * Restores the Fluent default chevron in a new state object, never on the one the hook returned.
 * The slot renders by default whenever hasSubmenu is set, so no pre-hook materialisation is
 * needed; consumer children always win, and submenuIndicator={null} still removes the slot.
 *
 * The glyph is SWAPPED per direction rather than mirrored in CSS. Griffel's own default does
 * exactly this (`useMenuItem.tsx`), and BreadcrumbDivider is the same pattern in this library. A
 * mirrored raster and a natively drawn outline do not antialias identically, so a CSS flip is a
 * real pixel divergence no layer promotion can close; and a flip in the stylesheet would mirror a
 * CONSUMER-supplied indicator too, which Griffel never does — its swap only fills the default.
 */
const withSubmenuIndicator = (state: MenuItemState, dir: 'ltr' | 'rtl'): MenuItemState =>
  state.submenuIndicator
    ? {
        ...state,
        submenuIndicator: {
          ...state.submenuIndicator,
          children: state.submenuIndicator.children ?? (dir === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />),
        },
      }
    : state;

/**
 * A MenuItem is a single action in a menu. Windmod MenuItem: the headless item decorated with
 * the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * The context is merged before the headless hook, so a container that publishes a value supplies
 * the default while an explicit prop still wins; MenuSplitGroup is what publishes into it today.
 */
export const MenuItem: ForwardRefComponent<MenuItemProps> = React.forwardRef(
  (props: MenuItemProps, ref: React.Ref<ARIAButtonElement<'div'>>) => {
    const { dir } = useProviderContext();

    return renderMenuItem(
      useMenuItemStyles(withSubmenuIndicator(useMenuItem(mergeContextProps(useMenuItemContext(), props), ref), dir)),
    );
  },
  // Casting is required due to lack of distributive union to support union on @types/react
) as ForwardRefComponent<MenuItemProps>;

MenuItem.displayName = 'MenuItem';
