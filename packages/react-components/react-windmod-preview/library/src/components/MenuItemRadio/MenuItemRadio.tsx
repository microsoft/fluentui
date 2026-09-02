'use client';

import * as React from 'react';
import type { ARIAButtonElement } from '@fluentui/react-aria';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMenuItemRadio, useMenuItemRadio } from '@fluentui/react-headless-components-preview/menu';
import { Checkmark16Filled } from '@fluentui/react-icons/headless/svg/checkmark';

import { mergeContextProps } from '../../utils/mergeContextProps';
import { useMenuItemContext } from '../MenuItem/menuItemContext';
import type { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';
import { useMenuItemRadioStyles } from './useMenuItemRadioStyles';

/** See MenuItemCheckbox.tsx — same slot, same glyph, same rule. */
const withCheckmark = (state: MenuItemRadioState): MenuItemRadioState =>
  state.checkmark
    ? {
        ...state,
        checkmark: { ...state.checkmark, children: state.checkmark.children ?? <Checkmark16Filled /> },
      }
    : state;

/**
 * A MenuItemRadio is a menu item that selects one of a group. Windmod MenuItemRadio: the
 * headless item decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * It reads MenuItem's context for the reason MenuItemCheckbox does — Griffel's split-group seam
 * reaches a selectable half through `.fui-MenuItem`. See MenuItem.
 */
export const MenuItemRadio: ForwardRefComponent<MenuItemRadioProps> = React.forwardRef(
  (props: MenuItemRadioProps, ref: React.Ref<ARIAButtonElement<'div'>>) =>
    renderMenuItemRadio(
      useMenuItemRadioStyles(withCheckmark(useMenuItemRadio(mergeContextProps(useMenuItemContext(), props), ref))),
    ),
);

MenuItemRadio.displayName = 'MenuItemRadio';
