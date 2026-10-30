import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { MenuItemContextValue } from '../MenuItem/menuItemContext';
import type { MenuSplitGroupState } from './MenuSplitGroup.types';

import styles from './MenuSplitGroup.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const menuSplitGroupClassNames: { root: string } = {
  root: componentMarkers('menu-split-group'),
};

/**
 * The seam look the group publishes to the items it holds. The value is a module constant, so the
 * provider identity never changes and no descendant re-renders on the group's account.
 */
export const menuSplitGroupItemContext: MenuItemContextValue = { className: styles.item };

/**
 * Applies the visual contract, returning new state. The group owns only its own flex row; the seam
 * between its two halves is carried by the class above, which the halves receive as a prop.
 */
export const useMenuSplitGroupStyles = (state: MenuSplitGroupState): MenuSplitGroupState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(menuSplitGroupClassNames.root, styles.root, state.root.className),
  },
});
