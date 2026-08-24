import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import type { ToolbarGroupState } from './ToolbarGroup.types';

import styles from './ToolbarGroup.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toolbarGroupClassNames: { root: string } = {
  root: componentMarkers('toolbar-group'),
};

/** Applies the visual contract, returning new state. The headless hook stamps data-vertical
 *  from the toolbar context, so the group needs no stamp of its own. */
export const useToolbarGroupStyles = (state: ToolbarGroupState): ToolbarGroupState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(toolbarGroupClassNames.root, styles.root, state.root.className),
  },
});
