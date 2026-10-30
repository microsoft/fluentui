'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { MenuItemState } from '../MenuItem/MenuItem.types';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles';
import type { MenuItemLinkState } from './MenuItemLink.types';

import styles from './MenuItemLink.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const menuItemLinkClassNames: { root: string } = {
  root: componentMarkers('menu-item-link'),
};

/**
 * Applies the visual contract, returning new state. The look is MenuItem's in full plus the
 * anchor's text-decoration reset. Keeping MenuItem's marker pair is load-bearing rather than
 * cosmetic: every slot class reaches state through group-<variant>/fui-menu-item — see
 * useMenuItemCheckboxStyles.
 */
export const useMenuItemLinkStyles = (state: MenuItemLinkState): MenuItemLinkState => {
  const styled = useMenuItemStyles(state as unknown as MenuItemState) as unknown as MenuItemLinkState;

  return {
    ...styled,
    root: {
      ...styled.root,
      className: clsx(menuItemLinkClassNames.root, styles.root, styled.root.className),
    },
  };
};
