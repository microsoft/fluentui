'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import { useDividerStyles } from '../../Divider/useDividerStyles';
import type { NavDividerState } from './NavDivider.types';

import styles from './NavDivider.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const navDividerClassNames: { root: string } = {
  root: componentMarkers('nav-divider'),
};

/**
 * Applies the visual contract on top of Divider's, returning new state. The wrapper slot passes
 * through undecorated: neither library gives it declarations.
 */
export const useNavDividerStyles = (state: NavDividerState): NavDividerState => {
  const { root: dividerRoot } = useDividerStyles(state);

  return {
    ...state,
    root: {
      ...dividerRoot,
      className: clsx(navDividerClassNames.root, styles.root, dividerRoot.className),
    },
  };
};
