'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { MenuItemState } from '../MenuItem/MenuItem.types';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles';
import type { MenuItemCheckboxState } from './MenuItemCheckbox.types';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const menuItemCheckboxClassNames: { root: string } = {
  root: componentMarkers('menu-item-checkbox'),
};

/**
 * Applies the visual contract, returning new state. The look is MenuItem's in full — there is no
 * stylesheet of its own — plus this component's marker pair. Keeping MenuItem's pair is
 * load-bearing rather than cosmetic: every slot class reaches state through
 * group-<variant>/fui-menu-item, so the checkmark would not paint without it.
 */
export const useMenuItemCheckboxStyles = (state: MenuItemCheckboxState): MenuItemCheckboxState => {
  const styled = useMenuItemStyles(state as unknown as MenuItemState) as unknown as MenuItemCheckboxState;

  return {
    ...styled,
    root: {
      ...styled.root,
      className: clsx(menuItemCheckboxClassNames.root, styled.root.className),
    },
  };
};
