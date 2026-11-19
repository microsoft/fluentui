'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { MenuItemState } from '../MenuItem/MenuItem.types';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles';
import type { MenuItemRadioState } from './MenuItemRadio.types';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const menuItemRadioClassNames: { root: string } = {
  root: componentMarkers('menu-item-radio'),
};

/**
 * Applies the visual contract, returning new state. A radio item is visually identical to a
 * checkbox item — same checkmark, same glyph, no circle — so the look is MenuItem's in full plus
 * this component's marker pair. See useMenuItemCheckboxStyles for why MenuItem's pair stays.
 */
export const useMenuItemRadioStyles = (state: MenuItemRadioState): MenuItemRadioState => {
  const styled = useMenuItemStyles(state as unknown as MenuItemState) as unknown as MenuItemRadioState;

  return {
    ...styled,
    root: {
      ...styled.root,
      className: clsx(menuItemRadioClassNames.root, styled.root.className),
    },
  };
};
