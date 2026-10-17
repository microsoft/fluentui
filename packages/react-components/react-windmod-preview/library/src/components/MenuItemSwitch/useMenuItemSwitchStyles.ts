'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { MenuItemState } from '../MenuItem/MenuItem.types';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles';
import type { MenuItemSwitchState } from './MenuItemSwitch.types';

import styles from './MenuItemSwitch.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const menuItemSwitchClassNames: { root: string } = {
  root: componentMarkers('menu-item-switch'),
};

/**
 * Applies the visual contract, returning new state. The row is MenuItem's in full — plus this
 * component's marker pair, which is load-bearing rather than cosmetic (see
 * useMenuItemCheckboxStyles) — and the switch indicator is the one slot MenuItem does not own.
 *
 * checkmark and submenuIndicator are dropped before the composition: renderMenuItemSwitch emits
 * neither, so a class minted onto them would land on nothing.
 */
export const useMenuItemSwitchStyles = (state: MenuItemSwitchState): MenuItemSwitchState => {
  const styled = useMenuItemStyles({
    ...state,
    checkmark: undefined,
    submenuIndicator: undefined,
  } as unknown as MenuItemState) as unknown as MenuItemSwitchState;

  return {
    ...styled,
    root: {
      ...styled.root,
      className: clsx(menuItemSwitchClassNames.root, styled.root.className),
    },
    switchIndicator: styled.switchIndicator
      ? {
          ...styled.switchIndicator,
          className: clsx(styles.switchIndicator, styled.switchIndicator.className),
        }
      : styled.switchIndicator,
  };
};
