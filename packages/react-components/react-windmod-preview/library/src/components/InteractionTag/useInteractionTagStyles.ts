import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { InteractionTagState } from './InteractionTag.types';

import styles from './InteractionTag.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const interactionTagClassNames: { root: string } = {
  root: componentMarkers('interaction-tag'),
};

type InteractionTagRootDataAttributes = {
  'data-size'?: InteractionTagState['size'];
};

/**
 * Applies the visual contract, returning new state. `rounded` is the base shape and carries no
 * class. The headless hook already stamps data-disabled and data-selected; only `data-size` is
 * missing, and the three height blocks read it.
 */
export const useInteractionTagStyles = (state: InteractionTagState): InteractionTagState => {
  const root: InteractionTagState['root'] & InteractionTagRootDataAttributes = {
    ...state.root,
    'data-size': state.size,
    className: clsx(
      interactionTagClassNames.root,
      styles.root,
      state.shape === 'circular' && styles.circular,
      state.root.className,
    ),
  };

  return { ...state, root };
};
