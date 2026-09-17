'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { useDrawerFooterStyles } from '../DrawerFooter/useDrawerFooterStyles';
import type { NavDrawerFooterState } from './NavDrawerFooter.types';

import styles from './NavDrawerFooter.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const navDrawerFooterClassNames: { root: string } = {
  root: componentMarkers('nav-drawer-footer'),
};

/** Applies the visual contract on top of DrawerFooter's, returning new state. */
export const useNavDrawerFooterStyles = (state: NavDrawerFooterState): NavDrawerFooterState => {
  const base = useDrawerFooterStyles(state);
  const root: NavDrawerFooterState['root'] = {
    ...base.root,
    className: clsx(navDrawerFooterClassNames.root, styles.root, base.root.className),
  };

  return { ...state, root };
};
