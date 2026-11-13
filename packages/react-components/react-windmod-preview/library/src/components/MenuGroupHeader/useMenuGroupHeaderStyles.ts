import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { MenuGroupHeaderState } from './MenuGroupHeader.types';

import styles from './MenuGroupHeader.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const menuGroupHeaderClassNames: { root: string } = {
  root: componentMarkers('menu-group-header'),
};

/**
 * Applies the visual contract, returning new state. The id that wires the group's
 * aria-labelledby arrives from MenuGroupContext and passes through untouched.
 */
export const useMenuGroupHeaderStyles = (state: MenuGroupHeaderState): MenuGroupHeaderState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(menuGroupHeaderClassNames.root, styles.root, state.root.className),
  },
});
