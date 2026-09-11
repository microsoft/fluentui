'use client';

import { componentMarkers } from '../../utils/groupMarker';
import { restackOver } from '../../utils/restackOver';
import { useBadgeStyles } from '../Badge/useBadgeStyles';
import type { CounterBadgeState } from './CounterBadge.types';

import styles from './CounterBadge.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const counterBadgeClassNames: { root: string } = {
  root: componentMarkers('counter-badge'),
};

/**
 * Applies the visual contract on top of Badge's, returning new state. The headless hook already
 * stamps data-count/-dot/-hidden/-overflowed; useBadgeStyles stamps data-appearance/-size/-empty.
 *
 * The root keeps Badge's marker pair alongside its own — see `restackOver`.
 */
export const useCounterBadgeStyles = (state: CounterBadgeState): CounterBadgeState => {
  const styled = useBadgeStyles(state);

  // useBadgeStyles types its return as BadgeState, which does not carry the CounterBadge-only
  // data-count/-dot/-hidden/-overflowed fields; they are present at runtime regardless, since
  // useBadgeStyles spreads the incoming root verbatim before adding its own attributes.
  const base = styled as unknown as Pick<CounterBadgeState, 'root' | 'icon'>;

  return restackOver(state, base, {
    marker: counterBadgeClassNames.root,
    root: styles.root,
  });
};
