import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { MenuGroupState } from './MenuGroup.types';

/** The only public classes — see componentMarkers; the group has no look of its own. */
export const menuGroupClassNames: { root: string } = {
  root: componentMarkers('menu-group'),
};

/**
 * Applies the visual contract, returning new state. Griffel gives the group no declaration at
 * all, so the marker pair is the whole contract — it is a role="group" wrapper that a consumer
 * can still compose against.
 */
export const useMenuGroupStyles = (state: MenuGroupState): MenuGroupState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(menuGroupClassNames.root, state.root.className),
  },
});
