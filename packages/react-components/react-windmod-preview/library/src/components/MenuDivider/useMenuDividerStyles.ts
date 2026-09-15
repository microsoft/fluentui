import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { MenuDividerState } from './MenuDivider.types';

import styles from './MenuDivider.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const menuDividerClassNames: { root: string } = {
  root: componentMarkers('menu-divider'),
};

/** Applies the visual contract, returning new state. */
export const useMenuDividerStyles = (state: MenuDividerState): MenuDividerState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(menuDividerClassNames.root, styles.root, state.root.className),
  },
});
