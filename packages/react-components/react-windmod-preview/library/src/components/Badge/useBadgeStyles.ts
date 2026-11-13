import * as React from 'react';
import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { BadgeState } from './Badge.types';

import styles from './Badge.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const badgeClassNames: { root: string } = {
  root: componentMarkers('badge'),
};

type BadgeRootDataAttributes = {
  'data-size'?: BadgeState['size'];
  'data-empty'?: true;
};

/** Applies the visual contract, returning new state. The headless hook already stamps
 * data-icon-position, and only when an icon slot is present. `data-empty` must count with
 * React.Children.toArray: `0` and `''` are rendered content that keeps the icon spacing,
 * while `[]` is not. `circular`, `filled` and `tint` are the base looks and carry no class. */
export const useBadgeStyles = (state: BadgeState): BadgeState => {
  const { appearance, color, shape, size } = state;

  const root: BadgeState['root'] & BadgeRootDataAttributes = {
    ...state.root,
    'data-size': size,
    'data-empty': React.Children.toArray(state.root.children).length === 0 || undefined,
    className: clsx(
      badgeClassNames.root,
      styles.root,
      styles[shape],
      styles[appearance],
      styles[`${appearance}-${color}`],
      state.root.className,
    ),
  };

  return {
    ...state,
    root,
    icon: slotClasses(state.icon, styles.icon),
  };
};
