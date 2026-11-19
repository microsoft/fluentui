import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { MenuPopoverState } from './MenuPopover.types';

import styles from './MenuPopover.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const menuPopoverClassNames: { root: string } = {
  root: componentMarkers('menu-popover'),
};

/**
 * Applies the visual contract, returning new state. The headless hook already stamps the popover
 * attribute and the live data-placement, and the surface has no state of its own to select on.
 */
export const useMenuPopoverStyles = (state: MenuPopoverState): MenuPopoverState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(menuPopoverClassNames.root, styles.root, state.root.className),
  },
});
