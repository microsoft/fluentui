'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMenuItemSwitch, useMenuItemSwitch } from '@fluentui/react-headless-components-preview/menu';
import { CircleFilled } from '@fluentui/react-icons/headless/svg/circle';

import { mergeContextProps } from '../../utils/mergeContextProps';
import { useMenuItemContext } from '../MenuItem/menuItemContext';
import type { MenuItemSwitchProps, MenuItemSwitchState } from './MenuItemSwitch.types';
import { useMenuItemSwitchStyles } from './useMenuItemSwitchStyles';

/**
 * Restores the Fluent default thumb in a new state object, never on the one the hook returned.
 * The slot always renders, so the track exists in both states; consumer children always win, and
 * switchIndicator={null} still removes the slot.
 */
const withThumb = (state: MenuItemSwitchState): MenuItemSwitchState =>
  state.switchIndicator
    ? {
        ...state,
        switchIndicator: {
          ...state.switchIndicator,
          children: state.switchIndicator.children ?? <CircleFilled />,
        },
      }
    : state;

/**
 * A MenuItemSwitch is a menu item that toggles a setting. Windmod MenuItemSwitch: the headless item
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * It reads MenuItem's context for the reason MenuItemCheckbox does — Griffel's split-group seam
 * reaches a selectable half through `.fui-MenuItem`. See MenuItem.
 */
export const MenuItemSwitch: ForwardRefComponent<MenuItemSwitchProps> = React.forwardRef((props, ref) =>
  renderMenuItemSwitch(
    useMenuItemSwitchStyles(withThumb(useMenuItemSwitch(mergeContextProps(useMenuItemContext(), props), ref))),
  ),
);

MenuItemSwitch.displayName = 'MenuItemSwitch';
