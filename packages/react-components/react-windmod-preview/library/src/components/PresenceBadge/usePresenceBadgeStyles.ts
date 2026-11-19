import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { PresenceBadgeState } from './PresenceBadge.types';

import styles from './PresenceBadge.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const presenceBadgeClassNames: { root: string } = {
  root: componentMarkers('presence-badge'),
};

type PresenceBadgeRootDataAttributes = {
  'data-size'?: PresenceBadgeState['size'];
};

/**
 * Applies the visual contract, returning new state. The headless hook already stamps
 * data-status and data-out-of-office. PresenceBadge does not compose Badge's styles — Griffel's
 * own PresenceBadge is a standalone visual, not a Badge-appearance skin.
 */
export const usePresenceBadgeStyles = (state: PresenceBadgeState): PresenceBadgeState => {
  const { size } = state;

  const root: PresenceBadgeState['root'] & PresenceBadgeRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(presenceBadgeClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    icon: slotClasses(state.icon, styles.icon),
  };
};
