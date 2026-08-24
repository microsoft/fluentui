import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { ToolbarState } from './Toolbar.types';

import styles from './Toolbar.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toolbarClassNames: { root: string } = {
  root: componentMarkers('toolbar'),
};

type ToolbarRootDataAttributes = {
  'data-size'?: ToolbarState['size'];
};

/**
 * Applies the visual contract, returning new state. The headless hook already stamps
 * data-vertical; data-size is style-only.
 *
 * The toolbar authors no typography or colour: every painting descendant sets its own, and
 * the provider supplies the inherited base.
 */
export const useToolbarStyles = (state: ToolbarState): ToolbarState => {
  const root: ToolbarState['root'] & ToolbarRootDataAttributes = {
    ...state.root,
    'data-size': state.size,
    className: clsx(toolbarClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
  };
};
