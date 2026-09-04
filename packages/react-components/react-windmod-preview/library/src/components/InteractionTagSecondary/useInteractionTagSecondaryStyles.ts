import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { InteractionTagSecondaryState } from './InteractionTagSecondary.types';

import styles from './InteractionTagSecondary.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const interactionTagSecondaryClassNames: { root: string } = {
  root: componentMarkers('interaction-tag-secondary'),
};

type InteractionTagSecondaryRootDataAttributes = {
  'data-size'?: InteractionTagSecondaryState['size'];
};

/**
 * Applies the visual contract, returning new state. `filled` and `rounded` are the base looks and
 * carry no class. The secondary borrows nothing from Tag, so its root carries only its own marker
 * pair. Hover and active are gated on `enabled`: Griffel applies the appearance bucket or the
 * disabled bucket, never both.
 */
export const useInteractionTagSecondaryStyles = (state: InteractionTagSecondaryState): InteractionTagSecondaryState => {
  const { appearance, disabled, selected, shape, size } = state;

  const root: InteractionTagSecondaryState['root'] & InteractionTagSecondaryRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(
      interactionTagSecondaryClassNames.root,
      styles.root,
      shape === 'circular' && styles.circular,
      appearance !== 'filled' && styles[appearance],
      selected && !disabled && styles.selected,
      state.root.className,
    ),
  };

  return { ...state, root };
};
