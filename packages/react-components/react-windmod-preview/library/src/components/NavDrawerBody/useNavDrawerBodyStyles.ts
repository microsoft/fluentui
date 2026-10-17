'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { useDrawerBodyStyles } from '../DrawerBody/useDrawerBodyStyles';
import type { NavDrawerBodyState } from './NavDrawerBody.types';

import styles from './NavDrawerBody.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const navDrawerBodyClassNames: { root: string } = {
  root: componentMarkers('nav-drawer-body'),
};

/** Applies the visual contract on top of DrawerBody's, returning new state. */
export const useNavDrawerBodyStyles = (state: NavDrawerBodyState): NavDrawerBodyState => {
  const base = useDrawerBodyStyles(state);
  const root: NavDrawerBodyState['root'] = {
    ...base.root,
    className: clsx(navDrawerBodyClassNames.root, styles.root, base.root.className),
  };

  return { ...state, root };
};
