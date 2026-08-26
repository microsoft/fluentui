'use client';

import * as React from 'react';
import type { ARIAButtonElement } from '@fluentui/react-aria';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMenuItemCheckbox, useMenuItemCheckbox } from '@fluentui/react-headless-components-preview/menu';
import { Checkmark16Filled } from '@fluentui/react-icons/headless/svg/checkmark';

import type { MenuItemCheckboxProps, MenuItemCheckboxState } from './MenuItemCheckbox.types';
import { useMenuItemCheckboxStyles } from './useMenuItemCheckboxStyles';

/**
 * Restores the Fluent default checkmark in a new state object, never on the one the hook
 * returned. The slot always renders, so an unchecked item keeps the 16px gutter that aligns
 * every row; consumer children always win, and checkmark={null} still removes the slot.
 */
const withCheckmark = (state: MenuItemCheckboxState): MenuItemCheckboxState =>
  state.checkmark
    ? {
        ...state,
        checkmark: { ...state.checkmark, children: state.checkmark.children ?? <Checkmark16Filled /> },
      }
    : state;

/**
 * A MenuItemCheckbox is a menu item that toggles. Windmod MenuItemCheckbox: the headless item
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const MenuItemCheckbox: ForwardRefComponent<MenuItemCheckboxProps> = React.forwardRef(
  (props: MenuItemCheckboxProps, ref: React.Ref<ARIAButtonElement<'div'>>) =>
    renderMenuItemCheckbox(useMenuItemCheckboxStyles(withCheckmark(useMenuItemCheckbox(props, ref)))),
  // Casting is required due to lack of distributive union to support union on @types/react
) as ForwardRefComponent<MenuItemCheckboxProps>;

MenuItemCheckbox.displayName = 'MenuItemCheckbox';
