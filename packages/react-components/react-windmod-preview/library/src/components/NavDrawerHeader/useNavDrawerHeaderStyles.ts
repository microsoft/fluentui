'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { useDrawerHeaderStyles } from '../DrawerHeader/useDrawerHeaderStyles';
import type { NavDrawerHeaderState } from './NavDrawerHeader.types';

import styles from './NavDrawerHeader.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const navDrawerHeaderClassNames: { root: string } = {
  root: componentMarkers('nav-drawer-header'),
};

/** Applies the visual contract on top of DrawerHeader's, returning new state. */
export const useNavDrawerHeaderStyles = (state: NavDrawerHeaderState): NavDrawerHeaderState => {
  const base = useDrawerHeaderStyles(state);
  const root: NavDrawerHeaderState['root'] = {
    ...base.root,
    className: clsx(navDrawerHeaderClassNames.root, styles.root, base.root.className),
  };

  return { ...state, root };
};
